"use client";
import { auth } from "@/firebase";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaStar, FaWheelchair } from "react-icons/fa6";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

type HousingForm = {
  start_date: string;
  end_date: string;
  budget_range: string;
  state: string;
  city: string;
  country: string;
  disability: string;
};

type SuggestionsLoadedStatus = {
  submitted: boolean;
  loading: boolean;
  error: boolean;
};

const Dashboard = () => {
  // State variable that stores form information.
  const [places, setPlaces] = useState<any>([]);
  const [hotels, setHotels] = useState([]);
  const [form, setForm] = useState<HousingForm>({
    start_date: "",
    end_date: "",
    budget_range: "$0-$500",
    state: "",
    city: "",
    country: "",
    disability: "",
  });
  const [suggestions, setSuggestions] = useState<TravelInfo>({
    start_date: "",
    end_date: "",
    budget: "",
    city: "",
    state: "",
    country: "",
    destination_suggestions: [],
  });
  const [loadStatus, setLoadStatus] = useState<SuggestionsLoadedStatus>({
    submitted: false,
    loading: true,
    error: false,
  });
  const [user] = useAuthState(auth);

  const today_date = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("/api/retrieve_user_info", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid: user?.uid,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const disabilities_list: string[] = data.disabilities_list;
          let cur = "";

          if (disabilities_list.length != 0) {
            disabilities_list.map((disability, i) => {
              cur += `${disability}`;
              if (i < data.disabilities_list.length - 1) {
                cur += ", ";
              }
            });
          } else {
            cur = "exploring";
          }

          setForm({ ...form, disability: cur });
        } else {
          throw new Error("There was an error retrieving the data.");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, []);

  const handleSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoadStatus({ ...loadStatus, submitted: true });
      const user_prompt = `
      Generate 5 suggested destinations and 5 suggested hotels within 50 miles of the provided city based on the following information:
      Travel start date: ${form.start_date} (in MM/DD/YYYY format),
      Travel end date: ${form.end_date} (in MM/DD/YYYY format),
      Travel budget: ${form.budget_range},
      Destination: ${form.city}, ${form.state}, ${form.country}

      Provide specific accessibility services for ${form.disability} only.
    `;
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          {
            role: "user",
            content: user_prompt,
          },
        ]),
      });

      if (res.ok) {
        setLoadStatus({ ...loadStatus, submitted: true, loading: false });
        const data = await res.json();
        setSuggestions(data.content);
      } else {
        setLoadStatus({
          ...loadStatus,
          submitted: true,
          loading: false,
          error: true,
        });
        throw new Error("Failed to generate suggestions.");
      }
    } catch (error) {
      console.log(error);
    }
    const fetchPlaces = async () => {
      const options = {
        method: "GET",
        url: "https://booking-com.p.rapidapi.com/v1/hotels/locations",
        params: {
          name: form.city,
          locale: "en-us",
        },
        headers: {
          "x-rapidapi-key": process.env.NEXT_PUBLIC_BOOKING_API_KEY,
          "x-rapidapi-host": "booking-com.p.rapidapi.com",
        },
      };
      try {
        const response = await axios.request(options);
        setPlaces(response.data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPlaces();
  };

  const clearSuggestions = () => {
    setLoadStatus({ submitted: false, loading: true, error: false });
    setSuggestions({ ...suggestions, destination_suggestions: [] });
    setPlaces([]);
    setHotels([]);
  };

  useEffect(() => {
    if (places && places["dest_id"]) {
      const fetchHotels = async () => {
        const options = {
          method: "GET",
          url: "https://booking-com.p.rapidapi.com/v1/hotels/search",
          params: {
            checkout_date: form.end_date,
            order_by: "popularity",
            filter_by_currency: "USD",
            include_adjacency: "true",
            room_number: "1",
            dest_id: places["dest_id"],
            dest_type: "city",
            adults_number: "2",
            page_number: "0",
            checkin_date: form.start_date,
            locale: "en-us",
            units: "metric",
          },
          headers: {
            "x-rapidapi-key": process.env.NEXT_PUBLIC_BOOKING_API_KEY,
            "x-rapidapi-host": "booking-com.p.rapidapi.com",
          },
        };
        try {
          const response = await axios.request(options);
          setHotels(response.data["result"]);
        } catch (error) {
          console.error(error);
        }
      };
      fetchHotels();
    }
  }, [places]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (
      form.start_date != "" &&
      form.end_date != "" &&
      form.start_date > form.end_date
    ) {
      setForm({ ...form, end_date: form.start_date });
    }
  }, [form]);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  function calculateNights(checkinDate: string, checkoutDate: string): number {
    const checkin = new Date(checkinDate);
    const checkout = new Date(checkoutDate);
    if (isNaN(checkin.getTime()) || isNaN(checkout.getTime())) {
      throw new Error("Invalid date format");
    }
    const differenceInMillis = checkout.getTime() - checkin.getTime();
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    return Math.ceil(differenceInMillis / millisecondsPerDay);
  }

  const inputClasses =
    "border border-slate-300 focus:border-[#1476bc] focus:ring-2 focus:ring-[#1476bc]/20 outline-none transition-colors p-3 rounded-lg";
  const labelClasses = "font-semibold text-sm text-slate-700 tracking-wide";

  return (
    <div className={`${poppins.className} space-y-10 mt-[15vh] mb-[10vh] max-sm:mt-[15vh] px-4`}>
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          {!loadStatus.submitted ? (
            <>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-medium px-4 py-1.5 rounded-full">
                <FaWheelchair className="text-[#7fd4ff]" />
                Built for accessible travel planning
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Where are you headed?
              </h1>
              <p className="text-white/70 max-w-md mx-auto text-sm">
                Tell us your dates, budget, and destination — we will surface
                stays and accessibility resources that actually fit.
              </p>
            </>
          ) : !loadStatus.loading ? (
            !loadStatus.error ? (
              <>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  Your Travel & Hotel Suggestions
                </h1>
                <p className="text-white/70 text-sm">
                  Personalized for {suggestions.city}, {suggestions.state}
                </p>
              </>
            ) : (
              <div className="max-w-md mx-auto bg-white/10 border border-red-300/40 rounded-xl p-6 space-y-2">
                <h1 className="text-xl font-bold text-white">
                  We could not load your suggestions
                </h1>
                <p className="text-white/70 text-sm">
                  Something went wrong on our end. Try submitting your trip
                  details again.
                </p>
              </div>
            )
          ) : null}
        </div>

        {/* Content */}
        {!loadStatus.submitted ? (
          <form
            onSubmit={handleSubmission}
            className="bg-white max-w-xl mx-auto p-8 sm:p-10 text-black rounded-2xl shadow-2xl flex flex-col gap-5"
          >
            <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4">
              <div className="flex flex-col gap-2">
                <label className={labelClasses}>Start Date</label>
                <input
                  className={inputClasses}
                  type="date"
                  name="start_date"
                  min={today_date}
                  value={form.start_date}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className={labelClasses}>End Date</label>
                <input
                  className={inputClasses}
                  type="date"
                  name="end_date"
                  min={form.start_date}
                  value={form.end_date}
                  onChange={handleFormChange}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className={labelClasses}>Budget range</label>
              <select
                className={inputClasses}
                name="budget_range"
                onChange={(e) =>
                  setForm({ ...form, budget_range: e.target.value })
                }
                required
              >
                <option value="$0-$500">$0 – $500</option>
                <option value="$500-$5000">$500 – $5,000</option>
                <option value="$5000+">$5,000+</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className={labelClasses}>City</label>
                <input
                  className={inputClasses}
                  name="city"
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className={labelClasses}>State</label>
                <input
                  className={inputClasses}
                  name="state"
                  onChange={handleFormChange}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className={labelClasses}>Country</label>
              <input
                className={inputClasses}
                name="country"
                onChange={handleFormChange}
                required
              />
            </div>

            <button className="mt-2 p-4 bg-[#1476bc] hover:bg-[#0a3f5d] transition-colors rounded-lg text-white font-semibold">
              Find my trip
            </button>
          </form>
        ) : !loadStatus.loading && !loadStatus.error ? (
          suggestions.destination_suggestions.length != 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {/* Destinations */}
              <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[750px] overflow-y-auto space-y-5">
                <h2 className="text-2xl font-bold text-slate-900">
                  Destinations
                </h2>
                <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 text-amber-900 text-xs rounded-lg p-3">
                  <span>
                    AI-generated suggestions may contain inaccuracies. Verify
                    accessibility details independently before booking.
                  </span>
                </div>
                <p className="text-sm text-slate-600">
                  Based on a trip to{" "}
                  <span className="font-semibold text-slate-900">
                    {suggestions.city}, {suggestions.state},{" "}
                    {suggestions.country}
                  </span>{" "}
                  from{" "}
                  <span className="font-semibold text-slate-900">
                    {suggestions.start_date}
                  </span>{" "}
                  to{" "}
                  <span className="font-semibold text-slate-900">
                    {suggestions.end_date}
                  </span>{" "}
                  ({suggestions.budget})
                </p>

                <div className="space-y-4">
                  {suggestions.destination_suggestions.map((suggestion, i) => (
                    <figure
                      key={`destination-${i}`}
                      className="p-5 rounded-xl border border-slate-200 hover:border-[#1476bc]/40 hover:shadow-md transition-all space-y-2"
                    >
                      <h3 className="text-lg font-bold text-slate-900">
                        {suggestion.name}
                      </h3>
                      <p className="text-sm text-slate-600 italic">
                        {suggestion.destination_description}
                      </p>
                      <div className="flex items-start gap-2 text-sm text-slate-800 bg-[#1476bc]/5 rounded-lg p-3">
                        <FaWheelchair className="text-[#1476bc] mt-0.5 flex-shrink-0" />
                        <span>{suggestion.accessibility}</span>
                      </div>
                    </figure>
                  ))}
                </div>
              </div>

              {/* Hotels */}
              <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[750px] overflow-y-auto space-y-5">
                <h2 className="text-2xl font-bold text-slate-900">Stays</h2>
                <div className="space-y-4">
                  {hotels.map((hotel, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-slate-200 hover:shadow-md transition-shadow overflow-hidden"
                    >
                      <img
                        src={hotel["max_photo_url"]}
                        alt={hotel["hotel_name"]}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4 space-y-1">
                        <a
                          href={hotel["url"]}
                          className="font-bold text-slate-900 hover:text-[#1476bc] transition-colors"
                        >
                          {hotel["hotel_name"]}
                        </a>
                        <p className="text-sm text-slate-500">
                          {hotel["address"]}
                        </p>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium text-slate-800">
                            {hotel["review_score"] == null
                              ? "New"
                              : `${hotel["review_score"]}/10`}
                          </span>
                          <FaStar className="text-amber-400" />
                          <span className="text-slate-500">
                            {hotel["review_nr"]} reviews
                          </span>
                        </div>
                        <p className="text-sm text-slate-700 pt-1">
                          {calculateNights(form.start_date, form.end_date)}{" "}
                          nights from{" "}
                          <span className="font-bold text-slate-900">
                            {formatter.format(hotel["min_total_price"])}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        ) : loadStatus.loading ? (
          <div className="flex justify-center">
            <div className="bg-white/10 text-white text-sm rounded-full px-5 py-2.5">
              Finding suggestions for you…
            </div>
          </div>
        ) : null}

        {loadStatus.submitted && !loadStatus.loading && !loadStatus.error && (
          <div className="flex justify-center">
            <button
              className="px-8 py-3.5 bg-white text-[#1476bc] font-semibold rounded-full shadow-lg hover:shadow-xl transition-shadow"
              onClick={clearSuggestions}
            >
              Plan another trip
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;