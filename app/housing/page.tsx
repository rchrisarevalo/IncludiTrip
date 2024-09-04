"use client";
import React, { useState, useEffect } from "react";

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
  const [form, setForm] = useState<HousingForm>({
    start_date: "",
    end_date: "",
    budget_range: "",
    state: "",
    city: "",
    country: "",
    disability: "Blindness",
  });

  // Function that handles the form submission.
  const handleSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const user_prompt = `
        Generate suggested destinations within the provided city based on the following information:
        Travel start date: ${form.start_date},
        Travel end date: ${form.end_date},
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
        console.log(data);
      } else {
        throw new Error("Failed to generate suggestions.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function that updates form values.
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // // Separate function that updates form from selection option.
  // const handleSelectionChange = (e: React.ChangeEventHandler<HTMLSelectElement>) => {
  //   setForm({ ...form, [e.target.]})
  // }

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

  return (
    <div className="space-y-10">
      <span className="space-y-10">
        <h3 className="text-3xl text-center max-sm:ml-10 max-sm:mr-10">
          See your travel possibilities!
        </h3>
        <form
          onSubmit={handleSubmission}
          className="bg-white max-sm:h-[650px] max-sm:overflow-y-scroll p-10 max-sm:m-5 text-black rounded-lg flex flex-col items-left text-left gap-5"
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
            onChange={(e) => setForm({ ...form, budget_range: e.target.value })}
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
      </span>
    </div>
  );
};

export default Housing;
