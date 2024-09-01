"use client";
import React from "react";
import {
  useAuthState,
  useSendEmailVerification,
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
  const router = useRouter();

  console.log(user?.emailVerified)

  return (
    <>
      {!loading ? (
        !error ? (
          user ? (
            user.emailVerified ? (
              children
            ) : (
              <h1>Verify your email first.</h1>
            )
          ) : (
            router.push("/login")
          )
        ) : (
          <p>Error!</p>
        )
      ) : (
        <h1 className="text-3xl min-h-screen flex flex-row items-center justify-center font-bold">Loading...</h1>
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
        <h1 className="text-3xl min-h-screen flex flex-row items-center justify-center font-bold">Loading...</h1>
      )}
    </>
  );
};

export { ProtectedRoute, PublicRoute };
