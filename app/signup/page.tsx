"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { calculateAge } from "../functions/CalculateAge";
import mainLogo from "../images/mainLogo.png";
import { auth, db } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

type SignUpForm = {
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  password: string;
  dob: string;
  disability_status: string;
  disabilities_list: string[];
  age: number;
};

const Signup = () => {
  const [form, setForm] = useState<SignUpForm>({
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    password: "",
    dob: "",
    disability_status: "",
    disabilities_list: [],
    age: 0,
  });

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Function that handles the submission of the form for a new user sign up.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Perform database operations to store relevant information
    // in DB in API route (except the age itself, which will be
    // calculated with the same function that was used in this page when
    // displaying it in a user's account).
    //
    // Set up API route HERE...

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      const user = userCredential.user;
      console.log("User created: ", user);

      await addDoc(collection(db, "users"), {
        uid: user.uid,
        first_name: form.first_name,
        middle_name: form.middle_name,
        last_name: form.last_name,
        email: form.email,
        dob: form.dob,
        disability_status: form.disability_status,
        disabilities_list: form.disabilities_list,
        age: form.age,
      });
    } catch (e) {
      console.error("Error creating user: ", e);
    }
  };

  // Function that allows for disabilities to be displayed
  // in a more organized manner when user enters them.
  const handleDisabilityList = (input: string) => {
    // Split the disability names by comma to display a more
    // organized list.
    setForm({
      ...form,
      disabilities_list: input != "" ? input.split(",") : [],
    });
  };

  const handleCalculateAge = (birthday: string) => {
    const age = calculateAge(birthday);
    setForm({ ...form, dob: birthday, age: age });
  };

  return (
    <>
      <span className="flex items-center justify-center min-h-screen max-sm:min-h-10 bg-[#23465d]">
        <Image
          src={mainLogo}
          alt="IncludiTrip, Take it Easy logo"
          className="w-1/2 h-auto"
        />
      </span>
      <span className="flex items-center justify-center min-h-screen bg-white text-black">
        <form
          onSubmit={handleSubmit}
          className="p-10 mt-10 mb-10 overflow-y-auto w-screen max-h-[85vh]"
        >
          <span className="max-sm:p-4 flex flex-col items-left text-left rounded-lg space-y-4">
            <label className="font-bold text-3xl">Join The Waitlist!</label>
            <span className="grid grid-cols-2 max-sm:grid-cols-1 items-center gap-5">
              <span className="flex flex-col items-left text-left space-y-5">
                <label className="font-bold">First name</label>
                <input
                  name="first_name"
                  className="p-2 border border-solid border-black rounded-md"
                  onChange={handleFormChange}
                  required
                />
              </span>
              <span className="flex flex-col items-left text-left space-y-5">
                <label className="font-bold">Middle name (if applicable)</label>
                <input
                  name="middle_name"
                  className="p-2 border border-solid border-black rounded-md"
                  onChange={handleFormChange}
                />
              </span>
            </span>
            <label className="font-bold">Last name</label>
            <input
              name="last_name"
              className="p-2 border border-solid border-black rounded-md"
              onChange={handleFormChange}
              required
            />
            <label className="font-bold">Email</label>
            <input
              name="email"
              className="p-2 border border-solid border-black rounded-md"
              type="email"
              onChange={handleFormChange}
              required
            />
            <label className="font-bold">Password</label>
            <input
              name="password"
              className="p-2 border border-solid border-black rounded-md"
              type="password"
              onChange={handleFormChange}
              required
            />
            <label className="font-bold">Date of birth</label>
            <input
              name="dob"
              className="p-2 border border-solid border-black rounded-md"
              type="date"
              onChange={(e) => handleCalculateAge(e.target.value)}
              required
            />
            <label className="font-bold">
              Are you a disabled person, a relative/friend of a disabled person,
              or are looking to explore?
            </label>
            <select
              name="disability_status"
              className="p-2 border border-solid border-black rounded-md"
              onChange={handleFormChange}
              value={form.disability_status}
            >
              {form.disability_status == "" ? (
                <>
                  <option>Select an option</option>
                  <option value="Disabled">I am a disabled person</option>
                  <option value="Relative/friend">
                    I am a relative/friend of a disabled person
                  </option>
                  <option value="Exploring">I am exploring</option>
                </>
              ) : (
                <>
                  <option value="Disabled">I am a disabled person</option>
                  <option value="Relative/friend">
                    I am a relative/friend of a disabled person
                  </option>
                  <option value="Exploring">I am exploring</option>
                </>
              )}
            </select>
            {(form.disability_status == "Disabled" ||
              form.disability_status == "Relative/friend") && (
              <>
                <label className="font-bold">
                  What disability(ies) do you or your loved one have?
                </label>
                <label className="font-light text-md">
                  <i>
                    We will not use this information to discriminate against
                    people regardless of their status.
                  </i>
                </label>
                <input
                  className="p-2 border border-solid border-black rounded-md"
                  name="disabilities"
                  onChange={(e) => handleDisabilityList(e.target.value)}
                  required
                />
                <span className="grid grid-cols-3 gap-5 items-center">
                  {form.disabilities_list.length != 0 &&
                    form.disabilities_list.map((disability, i) => (
                      <span
                        key={`disability-${i}`}
                        className="p-5 flex items-center justify-center bg-blue-600 text-white rounded-md border border-solid border-blue-800"
                      >
                        {disability}
                      </span>
                    ))}
                </span>
              </>
            )}
            <br></br>
            <button
              className="p-3 bg-black text-white rounded-md mt-10"
              type="submit"
              disabled={form.dob != "" && form.age < 18}
            >
              Sign Up
            </button>
            <label className="font-light mt-5">
              <i>
                By joining the waitlist, you agree that you are 18 years old or
                older to use our Service, and that all information above is true
                to the best of your knowledge.
                <br></br>
                <br></br>
                The falsification of information under any circumstance may
                result in your account being{" "}
                <b className="font-bold">immediately terminated</b>.
              </i>
            </label>
            {form.dob != "" && form.age < 18 && (
              <label className="font-bold mt-5 text-red-500">
                You are under 18 years old.
              </label>
            )}
          </span>
        </form>
      </span>
    </>
  );
};

export default Signup;
