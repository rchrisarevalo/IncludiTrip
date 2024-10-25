"use client";
import { auth } from "@/firebase";
import Link from "next/link";
import { useState } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import logo from "../images/smallLogo.png";

const PasswordReset = () => {
  const [email, setEmail] = useState<string>("");
  const [resetPassword] = useSendPasswordResetEmail(auth);
  const [passwordReqSent, setPasswordReqSent] = useState<boolean>(false);

  const handleSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const password_reset_link = await resetPassword(email);

      if (password_reset_link) {
        setPasswordReqSent(true);
      } else {
        throw new Error("Password reset link failed to be sent.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <nav className="fixed top-0 w-full text-[#23465d] bg-white py-4 px-8">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto">
          <Link href="/" >
          <img
            src={logo.src}
            alt="IncludiTrip logo"
            className="object-cover rounded-lg"
            height={100}
            width={100}
          />
          </Link>
          <ul className="flex space-x-6 font-bold text-l">
            <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
            <li><Link href="#features" className="hover:text-gray-500">Features</Link></li>
            <li><Link href="/login" className="hover:text-gray-300">Login</Link></li>
          </ul>
        </div>
      </nav>
      {!passwordReqSent ? (
        <form
          onSubmit={handleSubmission}
          className="bg-white p-10 rounded-lg pl-12 pr-12 flex flex-col items-left justify-left gap-5 text-black"
        >
          <label className="font-bold text-2xl">Reset Password</label>
          <label className="font-bold">Enter your email:</label>
          <input
            className="border border-solid border-black rounded-lg p-2"
            value={email}
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="bg-[#23465d] rounded-lg p-5 w-full text-white font-bold"
            type="submit"
          >
            Send Password Reset Link
          </button>
        </form>
      ) : (
        <span className="p-10 flex flex-col items-center gap-5">
          <h1 className="text-4xl ml-32 mr-32 max-sm:ml-5 max-sm:mr-5 max-sm:text-center">
            Password reset link has been successfully sent!
          </h1>
          <p className="text-lg ml-32 mr-32 max-sm:ml-5 max-sm:mr-5 max-sm:text-center">
            An email has been sent out with instructions on how to reset your
            password.
          </p>
          <br></br>
          <button>
            <Link href="/login" className="p-5 text-black font-bold bg-white rounded-lg">Sign In</Link>
          </button>
        </span>
      )}
    </>
  );
};

export default PasswordReset;
