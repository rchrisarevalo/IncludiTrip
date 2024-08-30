"use client";
import Link from "next/link";
import { useState } from "react";
import mainLogo from "../images/mainLogo.png";

type LoginForm = {
    username: string,
    password: string
}

const Login = () => {
  // SET UP REST OF STATE VARIABLES AND FIREBASE HOOKS HERE.
  // .....
  // .....

  const [form, setForm] = useState<LoginForm>({
    username: "",
    password: ""
  })

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  return (
    <>
      <span className="min-h-screen flex text-center justify-center items-center bg-[#23465d]">
        <img
          src={mainLogo.src}
          alt="IncludiTrip, Take it Easy logo"
          className="w-1/2 h-auto"
          />
      </span>
      <span className="min-h-screen flex text-center justify-center items-center bg-white text-black">
        <form className="p-10 flex flex-col items-left text-left rounded-lg space-y-4">
          <label className="p-1 font-bold">Email</label>
          <input
            type="text"
            name="username"
            required
            onChange={handleFormChange}
            className="p-3 w-[300px] border border-solid outline-none border-black rounded-lg"
          />
          <label className="p-1 font-bold">Password</label>
          <input
            type="password"
            name="password"
            required
            onChange={handleFormChange}
            className="p-3 w-[300px] border border-solid outline-none border-black rounded-lg"
          />
          <span className="flex flex-col gap-3 items-center">
            <button
              className="w-full p-3 rounded-lg mt-5 bg-[#23465d] text-white font-bold"
              type="submit"
            >
              Sign In
            </button>
            <button className="text-sm mt-5 font-bold" type="button">
              <Link href="/signup">Create an account</Link>
            </button>
            <button className="text-sm mt-1 font-bold" type="button">
              Forgot password? Click here!
            </button>
          </span>
        </form>
      </span>
    </>
  );
};

export default Login;
