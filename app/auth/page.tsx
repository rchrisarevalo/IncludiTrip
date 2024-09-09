"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  checkActionCode,
  confirmPasswordReset,
  verifyPasswordResetCode,
  signInWithEmailLink,
  User,
  applyActionCode,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
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
  const [user, user_loading, user_error] = useAuthState(auth);
  const [curUser, setCurUser] = useState<User | null>(null);

  useEffect(() => {
    setCurUser(auth.currentUser);
  }, [user_loading, user_error]);

  // Used to retrieve unique password reset link from
  // query parameters.
  const param = useSearchParams();

  // useEffect hook used to verify the unique password
  // reset link.
  useEffect(() => {
    const verifyMode = async () => {
      if (param?.get("oobCode")) {
        try {
          await checkActionCode(auth, param?.get("oobCode") as string);

          // Check the password reset code after originally checking it
          // using the checkActionCode function.
          if (param?.get("mode") == "resetPassword") {
            await verifyPasswordResetCode(auth, param.get("oobCode") as string);
          }

          // Apply email verification automatically.
          else if (curUser && param?.get("mode") == "verifyEmail") {
            await applyActionCode(auth, param?.get("oobCode") as string);
          }
        } catch (error) {
          setError(true);
          console.log(error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("Failed!");
        setError(true);
        setLoading(false);
      }
    };
    verifyMode();
  }, [curUser, param]);

  const handlePasswordResetSubmission = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      if (authPassword.password == authPassword.confirm_password) {
        // Update user's password.
        await confirmPasswordReset(
          auth,
          param.get("oobCode") as string,
          authPassword.confirm_password
        );
        setPasswordReset(true);
      } else {
        throw new Error("Passwords are not the same");
      }
    } catch (error) {
      setPasswordResetError(true);
      console.error(error);
    }
  };

  const handleRefreshAfterConfirmation = () => {
    window.location.href = "https://includitrip.com/dashboard"
  }

  return (
    <>
      {!loading ? (
        error ? (
          <>
            {param?.get("mode") == "resetPassword" && (
              <span className="flex flex-col gap-5 items-center">
                <h1 className="text-3xl font-bold text-center">
                  Password reset link has expired or no longer exists.
                </h1>
                <button
                  className="bg-white rounded-lg p-5 w-[75%] text-black font-bold"
                  type="submit"
                >
                  <Link href="/login" className="p-3.5 pl-10 pr-10">
                    Sign In
                  </Link>
                </button>
              </span>
            )}
            {param?.get("mode") == "verifyEmail" && (
              <span className="flex flex-col gap-5 items-center">
                <h1 className="text-3xl max-sm:ml-5 max-sm:mr-5 font-bold text-center">
                  Email verification link has expired or no longer exists.
                </h1>
                <br></br>
                <button type="submit">
                  <Link
                    href="/login"
                    className="bg-white rounded-lg p-5 text-black font-bold pl-10 pr-10"
                  >
                    Sign In
                  </Link>
                </button>
              </span>
            )}
            {!param?.get("mode") && (
              <span className="flex flex-col gap-5 items-center">
                <h1 className="text-3xl font-bold text-center">
                  Unauthorized access. Please sign back in.
                </h1>
                <button type="submit">
                  <Link
                    href="/login"
                    className="bg-white rounded-lg p-5 text-black font-bold pl-10 pr-10"
                  >
                    Sign In
                  </Link>
                </button>
              </span>
            )}
          </>
        ) : param?.get("mode") == "resetPassword" ? (
          !passwordReset ? (
            <form
              onSubmit={handlePasswordResetSubmission}
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
                className="bg-[#23465d] rounded-lg p-5 w-full text-white font-bold"
                type="submit"
              >
                Update Password
              </button>
              {passwordResetError && (
                <p className="text-center font-bold text-red-500">
                  Failed to reset password! Try again!
                </p>
              )}
            </form>
          ) : (
            <span className="flex flex-col items-center text-center gap-5">
              <h3 className="text-3xl ml-16 mr-16">
                Password successfully reset! You can now log back in.
              </h3>
              <br></br>
              <button type="submit">
                <Link
                  href="/login"
                  className="bg-white font-bold rounded-lg p-5 w-[75%] text-black"
                >
                  Sign In
                </Link>
              </button>
            </span>
          )
        ) : (
          <span className="flex flex-col items-center text-center gap-5">
            <h3 className="text-3xl ml-16 mr-16">
              Email verified! You can now go to your Dashboard.
            </h3>
            <br></br>
            <button type="submit" className="bg-white font-bold rounded-lg p-5 w-[75%] text-black" onClick={handleRefreshAfterConfirmation}>
              Go To Dashboard
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
