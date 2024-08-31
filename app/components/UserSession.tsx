"use client";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase";
import { useRouter, usePathname } from "next/navigation";
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

  return (
    <>
      {!loading ? (
        !error ? (
          user ? (
            children
          ) : (
            router.push("/login")
          )
        ) : (
          <p>Error!</p>
        )
      ) : (
        <p>Loading...</p>
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
        <p>Loading...</p>
      )}
    </>
  );
};

export { ProtectedRoute, PublicRoute };
