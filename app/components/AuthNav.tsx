"use client";
import React from "react";
import Link from "next/link";
import logo from "../images/smallLogo.png";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";

const AuthNav = () => {
  const [user] = useAuthState(auth);
  const [signOut] = useSignOut(auth);
  const router = useRouter();

  const handleLogOut = async () => {
    if (user) {
      try {
        await signOut();
        router.push("/login");
      } catch (error) {
        console.error("Error logging out. Please try again.");
      }
    } else {
        router.push("/login")
    }
  };

  return (
    <nav className="w-full fixed top-0 mb-12 text-[#23465d] bg-white py-4 px-8">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        <Link href="/">
          <img
            src={logo.src}
            alt="IncludiTrip logo"
            className="object-cover rounded-lg"
            height={100}
            width={100}
          />
        </Link>
        <ul className="flex space-x-6 font-bold text-l">
          <li>
            <Link href="/login" className="hover:text-gray-300">
              <button onClick={handleLogOut}>Log Out</button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AuthNav;
