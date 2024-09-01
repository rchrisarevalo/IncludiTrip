"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { confirmPasswordReset, checkActionCode, verifyPasswordResetCode } from "firebase/auth";
import { auth } from "@/firebase";
import Link from "next/link";

const ChangePassword = () => {
  const [authPassword, setAuthPassword] = useState({
    password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [passwordReset, setPasswordReset] = useState<boolean>(false);
  const [passwordResetError, setPasswordResetError] = useState<boolean>(false);

  // Used to retrieve unique password reset link from
  // query parameters.
  const param = useSearchParams();

  // useEffect hook used to verify the unique password
  // reset link.
  useEffect(() => {
    const verifyPasswordResetLink = async () => {
      try {
        await verifyPasswordResetCode(auth, param.get("oobCode") as string);
        await checkActionCode(auth, param.get("oobCode") as string)
      } catch (error) {
        setError(true)
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    verifyPasswordResetLink();
  }, []);

  const handleSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (authPassword.password == authPassword.confirm_password) {
        // Update user's password.
        await confirmPasswordReset(auth, param.get("oobCode") as string, authPassword.confirm_password)
        setPasswordReset(true)
      }
    } catch (error) {
      setPasswordResetError(true)
      console.error(error);
    }
  };

  return (
    <>
      {!loading ? (
        error ? (
          <span className="flex flex-col gap-5 items-center">
            <h1 className="text-3xl font-bold text-center">
              Password reset link has expired or no longer exists.
            </h1>
            <button
              className="bg-white rounded-lg p-5 w-[75%] text-black"
              type="submit"
            >
              <Link href="/login" className="p-3.5 pl-10 pr-10">Sign In</Link>
            </button>
          </span>
        ) : (
          !passwordReset ?
            <form
              onSubmit={handleSubmission}
              className="bg-white p-10 rounded-lg pl-12 pr-12 flex flex-col items-left justify-left gap-5 text-black"
            >
              <label className="font-bold text-2xl">Reset Password</label>
              <label className="font-bold">Enter your new password:</label>
              <input
                className="border border-solid border-black rounded-lg p-2"
                value={authPassword.password}
                type="password"
                required
                onChange={(e) =>
                  setAuthPassword({ ...authPassword, password: e.target.value })
                }
              />
              <label className="font-bold">Confirm your new password:</label>
              <input
                className="border border-solid border-black rounded-lg p-2"
                value={authPassword.confirm_password}
                type="password"
                required
                onChange={(e) =>
                  setAuthPassword({
                    ...authPassword,
                    confirm_password: e.target.value,
                  })
                }
              />
              <button
                className="bg-black rounded-lg p-5 w-full text-white"
                type="submit"
              >
                Update Password
              </button>
              {passwordResetError && <p className="text-center font-bold text-red-500">Failed to reset password! Try again!</p>}
            </form>
            :
            <span className="flex flex-col items-center text-center gap-5">
              <h3 className="text-lg ml-16 mr-16">Password successfully reset! You can now log back in.</h3>
              <button
                className="bg-white rounded-lg p-5 w-[75%] text-black"
                type="submit"
              >
                <Link href="/login" className="p-3.5 pl-10 pr-10">Sign In</Link>
              </button>
            </span>
        )
      ) : (
        <h1 className="text-3xl font-bold text-center">Loading...</h1>
      )}
    </>
  );
};

export default ChangePassword;
