'use client';
import { auth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useSignOut } from 'react-firebase-hooks/auth';

const Dashboard = () => {

    const [signOut, loading, error] = useSignOut(auth)
    const router = useRouter()

    const handleSignOut = async () => {
        try {
            const signed_out = await signOut()

            if (signed_out) {
                router.push("/login")
            } else {
                throw new Error("Failed to sign out!")
            }
        } catch (error) {
            console.error("Failed to sign out.")
        }
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#f5f5f5] p-6 gap-10">
        <span className="ml-32 mr-32 max-sm:ml-1 max-sm:mr-1 space-y-5 text-center">
          <h1 className="text-5xl font-bold mb-4 text-[#23465d]">Hi there!</h1>
          <p className="text-xl mb-4 ml-16 mr-16 max-sm:ml-8 max-sm:mr-8">
            If you came across this page, this means you are on our waitlist!
          </p>
          <p className="text-xl mb-4 ml-16 mr-16 max-sm:ml-8 max-sm:mr-8">
            More updates will be provided as we continue to
            develop IncludiTrip,which offers not only personalized itineraries but also accessibility
            resources for people with disabilities.
          </p>
          <p className="text-xl mb-4 ml-16 mr-16 max-sm:ml-8 max-sm:mr-8">
            Thank you for your understanding and patience. We look forward to seeing
            you on launch day!
          </p>
          <button
          onClick={handleSignOut}
          className={`px-6 py-3 font-bold rounded-lg transition duration-300 ease-in-out ${
            loading ? "bg-gray-300 text-gray-700 cursor-not-allowed" : "bg-[#23465d] text-white hover:bg-white hover:text-black hover:border-2 hover:border-[#23465d]"
          }`}
          disabled={loading}
        >
          {loading ? "Signing out..." : "Log Out"}
        </button>
        {error && (
          <p className="text-red-600 mt-4">{`Error: ${error.message}`}</p>
        )}
        </span>
      </div>
    );
}

export default Dashboard;