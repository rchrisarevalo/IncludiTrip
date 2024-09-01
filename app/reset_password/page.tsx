"use client";
import { auth } from "@/firebase";
import Link from "next/link";
import { useState } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";

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
            className="bg-black rounded-lg p-5 w-full text-white"
            type="submit"
          >
            Send Password Reset Link
          </button>
        </form>
      ) : (
        <span className="p-10 flex flex-col items-center gap-5">
          <h1 className="text-4xl ml-32 mr-32">
            Password reset link has been successfully sent!
          </h1>
          <p className="text-lg ml-32 mr-32">
            An email has been sent out with instructions on how to reset your
            password.
          </p>
          <button className="bg-white rounded-lg p-5 text-black">
            <Link href="/login">Sign In</Link>
          </button>
        </span>
      )}
    </>
  );
};

export default PasswordReset;
