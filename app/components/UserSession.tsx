"use client";
import React from "react";
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
  const [sendVerification, verificationLoading, verificationError] =
    useSendEmailVerification(auth);
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

      if (!verificationSent) {
        throw new Error("Verification email failed to be sent.")
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {!loading ? (
        !error ? (
          user ? (
            user?.emailVerified ? (
              children
            ) : (
              <>
                <h1 className="text-3xl text-center">
                  Please verify your email first before you proceed.
                </h1>
                {signOutLoading ? (
                  !error && (
                    <>
                      <button
                        onClick={handleSignOut}
                        className="bg-white rounded-lg text-black p-5 pl-10 pr-10 font-bold"
                        disabled
                      >
                        Signing out...
                      </button>
                    </>
                  )
                ) : (
                  <>
                    <button
                      onClick={handleSendEmailVerification}
                      className="bg-white rounded-lg text-black p-5 pl-10 pr-10 font-bold"
                    >
                      {verificationLoading ?
                        !verificationError ?
                          <>Verification email sent!</>
                          :
                          <>Verification mail failed to be sent.</>
                        :
                        <>Verify Email</>
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
              </>
            )
          ) : (
            router.push("/login")
          )
        ) : (
          <p>Error!</p>
        )
      ) : (
        <h1 className="text-3xl bg-[#23465d] min-h-screen flex flex-row items-center justify-center font-bold">
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
        <h1 className="text-3xl bg-[#23465d] min-h-screen flex flex-row items-center justify-center font-bold">
          Loading...
        </h1>
      )}
    </>
  );
};

export { ProtectedRoute, PublicRoute };
