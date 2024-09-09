"use client";
import React, { useEffect, useState } from "react";
import {
  useAuthState,
  useSendEmailVerification,
  useSignOut,
} from "react-firebase-hooks/auth";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";
import "@fontsource/poppins";

interface UserSessionProps {
  children: React.ReactNode;
}

// Custom components to use on protected and public routes.
// NOTE: If you want to apply any of the following to multiple
// child routes, apply it to the root folder of the
// relevant page (e.g. if wanting to protect any routes or child
// routes of /dashboard, apply it to the 'dashboard' folder).

const ProtectedRoute: React.FC<UserSessionProps> = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const [signOut, signOutLoading, signOutError] = useSignOut(auth);
  const [sendVerification] =
    useSendEmailVerification(auth);
  
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [verificationError, setVerificationError] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const signed_out = await signOut();

      if (signed_out) {
        router.push("/login");
      } else {
        throw new Error("Failed to sign out!");
      }
    } catch (error) {
      console.error("Failed to sign out.");
    }
  };

  const handleSendEmailVerification = async () => {
    try {
      const verificationSent = await sendVerification();
      
      setVerificationError(false)
      setEmailSent(true)

      if (!verificationSent) {
        throw new Error("Verification email failed to be sent.")
      } else {
        setVerificationLoading(false)
      }
    } catch (error) {
      setEmailSent(false)
      setVerificationError(true)
      console.error(error);
    } finally {
      setVerificationLoading(false)
    }
  };

  useEffect(() => {
    console.log(emailSent)
  }, [emailSent])

  return (
    <>
      {!loading ? (
        !error ? (
          user ? (
            user?.emailVerified ? (
              children
            ) : (
              <span className="bg-[#23465d] flex flex-col font-['Poppins'] min-h-screen items-center justify-center gap-10">
                <h1 className="text-3xl text-center ml-64 mr-64 max-sm:ml-16 max-sm:mr-16">
                  {!emailSent ?
                    <>Please verify your email first before you proceed.</>
                    :
                    <>Verification email sent! <br></br><br></br> Please follow the instructions listed in the email to proceed using <b>IncludiTrip!</b></>
                  }
                </h1>
                {signOutLoading ? (
                  !error && (
                    <>
                      <button
                        onClick={handleSignOut}
                        className={
                         !emailSent ?
                          "bg-white rounded-lg text-black p-5 pl-10 pr-10 font-bold"
                          :
                          "bg-white rounded-lg text-black p-5 pl-10 pr-10 opacity-10 font-bold"
                        }

                      >
                        Signing out...
                      </button>
                    </>
                  )
                ) : (
                  <>
                    <button
                      onClick={handleSendEmailVerification}
                      className={
                        !emailSent ?
                         "bg-white rounded-lg text-black p-5 pl-10 pr-10 font-bold"
                         :
                         "bg-white rounded-lg text-black p-5 pl-10 pr-10 opacity-50 font-bold"
                       }
                       disabled={emailSent ? true : false}
                    >
                      {emailSent ?
                        !verificationLoading ?
                          !verificationError ?
                            <>Verification email sent!</>
                            :
                            <>Verification email failed to be sent.</>
                          :
                          <>Sending email...</>
                        :
                        <>Verify Your Email</>
                      }
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="bg-white rounded-lg text-black p-5 pl-10 pr-10 font-bold"
                    >
                      Log Out
                    </button>
                  </>
                )}
              </span>
            )
          ) : (
            router.push("/login")
          )
        ) : (
          <p>Error!</p>
        )
      ) : (
        <h1 className="text-3xl bg-[#23465d] text-white min-h-screen flex flex-row items-center justify-center font-bold">
          Loading...
        </h1>
      )}
    </>
  );
};

const PublicRoute: React.FC<UserSessionProps> = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  return (
    <>
      {!loading ? (
        !error ? (
          !user ? (
            children
          ) : (
            router.push("/dashboard")
          )
        ) : (
          <p>Error!</p>
        )
      ) : (
        <h1 className="text-3xl bg-[#23465d] text-white font-['Poppins'] min-h-screen flex flex-row items-center justify-center font-bold">
          Loading...
        </h1>
      )}
    </>
  );
};

export { ProtectedRoute, PublicRoute };
