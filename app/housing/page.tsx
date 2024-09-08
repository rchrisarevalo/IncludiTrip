"use client";
import { auth } from "@/firebase";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Markdown from "react-markdown";
import { FaStar } from "react-icons/fa6";

type HousingForm = {
  start_date: string;
  end_date: string;
  budget_range: string;
  state: string;
  city: string;
  country: string;
  disability: string;
};

const Housing = () => {
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
    disability: "Blindness",
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
  const [user] = useAuthState(auth)

  console.log(user)

  useEffect(() => {
    // const fetchUserData = async () => {
    //   try {
    //     const res = await fetch('/api/retrieve_user_info', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: {

    //       }
    //     })
    //   } catch (error) {

    //   }
    // }
  }, [user])

  // Function that handles the form submission.
  const handleSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const user_prompt = `
        Generate suggested destinations within the provided city based on the following information:
        Travel start date: ${form.start_date} (in MM/DD/YYYY format),
        Travel end date: ${form.end_date} (in MM/DD/YYYY format),
        Travel budget: ${form.budget_range},
        Destination: ${form.city}, ${form.state}, ${form.country},

        Provide specific accessibility services for ${form.disability} only.
      `;
      console.log(user_prompt);
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
        const data = await res.json();
        setSuggestions(data.content);
      } else {
        throw new Error("Failed to generate suggestions.");
      }
    } catch (error) {
      console.log(error);
    }
    const fetchPlaces = async () => {
      const options = {
        method: 'GET',
        url: 'https://booking-com.p.rapidapi.com/v1/hotels/locations',
        params: {
          name: form.city,
          locale: 'en-us'
        },
        headers: {
          'x-rapidapi-key': process.env.NEXT_PUBLIC_BOOKING_API_KEY,
          'x-rapidapi-host': 'booking-com.p.rapidapi.com'
        }
      };
      try {
        const response = await axios.request(options);
        console.log(response.data[0]);
        setPlaces(response.data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPlaces();
  };

  //get hotels
  useEffect(() => {
    if (places && places['dest_id']) {
      const fetchHotels = async () => {
        const options = {
          method: 'GET',
          url: 'https://booking-com.p.rapidapi.com/v1/hotels/search',
          params: {
            checkout_date: form.end_date,
            order_by: 'popularity',
            filter_by_currency: 'USD',
            include_adjacency: 'true',
            room_number: '1',
            dest_id: places['dest_id'],
            dest_type: 'city',
            adults_number: '2',
            page_number: '0',
            checkin_date: form.start_date,
            locale: 'en-us',
            units: 'metric'
          },
          headers: {
            'x-rapidapi-key': process.env.NEXT_PUBLIC_BOOKING_API_KEY,
            'x-rapidapi-host': 'booking-com.p.rapidapi.com'
          }
        };
        try {
          const response = await axios.request(options);
          console.log("Hotels")
          console.log(response.data);
          setHotels(response.data['result'])
        } catch (error) {
          console.error(error);
        }
      };
      fetchHotels();
    }
  }, [places]);

  // Function that updates form values.
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // useEffect hook that automatically changes the end date
  // if the user selects a start date greater than the current
  // end date.
  useEffect(() => {
    if (
      form.start_date != "" &&
      form.end_date != "" &&
      form.start_date > form.end_date
    ) {
      setForm({ ...form, end_date: form.start_date });
    }
    console.log(form);
  }, [form]);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  function calculateNights(checkinDate: string, checkoutDate: string): number {
    const checkin = new Date(checkinDate);
    const checkout = new Date(checkoutDate);
    if (isNaN(checkin.getTime()) || isNaN(checkout.getTime())) {
      throw new Error('Invalid date format');
    }
    const differenceInMillis = checkout.getTime() - checkin.getTime();
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const nights = Math.ceil(differenceInMillis / millisecondsPerDay);
    return nights;
  }

  return (
    <div className="space-y-10">
      <span className="space-y-10">
        <h3 className="text-3xl text-center max-sm:ml-10 max-sm:mr-10 text-white">
          See your travel possibilities!
        </h3>
        <span
          className={
            suggestions.destination_suggestions.length != 0
              ? hotels.length == 0 ? `grid grid-cols-2 max-sm:grid-cols-1 gap-10` : `grid grid-cols-3 max-sm:grid-cols-1 gap-10`
              : `grid grid-cols-1 max-sm:grid-cols-1 gap-10`
          }
        >
          <form
            onSubmit={handleSubmission}
            className="bg-white max-sm:h-[650px] h-[750px] w-[500px] max-sm:w-[350px] max-sm:overflow-y-scroll p-10 max-sm:m-5 text-black rounded-lg flex flex-col items-left text-left gap-5"
          >
            <label className="font-bold">Start Date</label>
            <input
              className="border border-solid border-black p-2 rounded-md"
              type="date"
              name="start_date"
              value={form.start_date}
              onChange={handleFormChange}
              required
            />
            <label className="font-bold">End Date</label>
            <input
              className="border border-solid border-black p-2 rounded-md"
              type="date"
              name="end_date"
              min={form.start_date}
              value={form.end_date}
              onChange={handleFormChange}
              required
            />
            <label className="font-bold">
              What budget range will you be working with?
            </label>
            <select
              className="border border-solid border-black p-2 rounded-md"
              name="budget_range"
              onChange={(e) =>
                setForm({ ...form, budget_range: e.target.value })
              }
              required
            >
              <option value="$0-$500">$0-$500</option>
              <option value="$500-$5000">$500-$5000</option>
              <option value="$5000+">$5000+</option>
            </select>
            <span className="grid grid-cols-2 items-left">
              <span className="flex flex-col gap-5 items-left w-[95%]">
                <label className="font-bold">City</label>
                <input
                  className="border border-solid border-black p-2 rounded-md"
                  name="city"
                  onChange={handleFormChange}
                  required
                />
              </span>
              <span className="flex flex-col gap-5 items-left">
                <label className="font-bold">State</label>
                <input
                  className="border border-solid border-black p-2 rounded-md"
                  name="state"
                  onChange={handleFormChange}
                  required
                />
              </span>
            </span>
            <label className="font-bold">Country</label>
            <input
              className="border border-solid border-black p-2 rounded-md"
              name="country"
              onChange={handleFormChange}
              required
            />

            <button className="p-5 mt-5 bg-black rounded-md text-white">
              Submit
            </button>
          </form>
          {suggestions.destination_suggestions.length != 0 && (
            <>
              <span className="bg-white max-sm:h-[400px] h-[750px] w-[500px] max-sm:w-[350px] max-sm:overflow-y-scroll p-10 max-sm:m-5 text-black rounded-lg flex flex-col items-left text-left gap-5">
                <span className="m-2 overflow-y-scroll font-['Poppins'] space-y-5">
                  <h1 className="text-3xl font-bold">Travel Suggestions</h1>
                  <p className="font-bold">
                    <i>
                      * Please note that the AI used for these suggestions may
                      display incorrect/inaccurate information. It is highly
                      recommended to verify the suggestions and accessibility
                      resources below through additional research.
                    </i>
                  </p>
                  <p>
                    These are your suggested destinations based on your trip to{" "}
                    <b>
                      {`${suggestions.city}`}, {`${suggestions.state}`},{" "}
                      {`${suggestions.country}`}
                    </b>
                    , with a travel start date of{" "}
                    <b>{`${suggestions.start_date}`}</b> and a travel end date of{" "}
                    <b>{`${suggestions.end_date}`}</b>, with a budget range of{" "}
                    <b>{`${suggestions.budget}`}</b>:
                  </p>
                  <span className="m-2 overflow-y-scroll">
                    <span className="flex flex-col space-y-10">
                      {suggestions.destination_suggestions.map(
                        (suggestion, i) => (
                          <figure
                            className="p-10 space-y-5 bg-slate-300 rounded-lg"
                            key={`destination-${i}`}
                          >
                            <h3 className="text-2xl font-bold">
                              {suggestion.name}
                            </h3>
                            <p className="text-lg">
                              <i>{suggestion.destination_description}</i>
                            </p>
                            <p className="text-lg">{suggestion.accessibility}</p>
                          </figure>
                        )
                      )}
                    </span>
                  </span>
                </span>
              </span>
              {/* booking */}
              <span className="bg-white max-sm:h-[400px] h-[750px] w-[500px] max-sm:w-[350px] max-sm:overflow-y-scroll p-10 max-sm:m-5 text-black rounded-lg flex flex-col items-left text-left gap-5">
                <span className="m-2 overflow-y-scroll font-['Poppins'] space-y-5">
                  <h1 className="text-3xl font-bold">Hotel Suggestions</h1>
                  {/* <img src={"https://hospitable.com/wp-content/uploads/2023/11/booking-grid-logo.svg"}
                    alt={"img"}
                    className='h-[75px]' /> */}
                  <span className="m-2 overflow-y-scroll">
                    <span className="flex flex-col space-y-10">
                      {hotels.map((hotel, index) => (
                        <div key={index} className='border-black border-2 p-3 rounded-md shadow-xl text-xl bg-white text-black mr-2 my-6 mx-auto flex flex-col'>
                          <h4 className=' mb-2 text-center decoration-1 hover:decoration-2 underline-offset-2 font-bold text-2xl underline'><a href={hotel['url']}>{hotel['hotel_name']}</a></h4>
                          <img
                            src={hotel['max_photo_url']}
                            alt={"img"}
                            className='shadow-xl mb-2 border-black border-2 w-full h-full rounded-2xl'
                          />
                          <p>{hotel['address']}</p>
                          <div className='flex flex-row items-center gap-x-2'>
                            <label>{hotel['review_score'] == null ? "New" : hotel['review_score'] + "/10"}</label>
                            <FaStar />
                            <label>{hotel['review_nr']}</label>
                          </div>
                          <p>Min Price for {calculateNights(form.start_date, form.end_date)} Nights: <b>{formatter.format(hotel['min_total_price'])}</b></p>
                          {/* <p className='flex flex-row items-center gap-x-2'>{hotel['accommodation_type_name']}<FaBed /></p> */}
                        </div>
                      ))}
                    </span>
                  </span>
                </span>
              </span>
            </>
          )}
        </span>
      </span>
    </div>
  );
};

export default Housing;
