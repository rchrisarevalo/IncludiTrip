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
      <div className="flex flex-col items-center justify-center gap-10">
        <span className="ml-32 mr-32 max-sm:ml-1 max-sm:mr-1 space-y-5 text-center">
          <h1 className="text-5xl font-bold">Hi there!</h1>
          <p className="text-xl ml-16 mr-16 max-sm:ml-8 max-sm:mr-8">
            If you came across this page, this means you are on a waitlist!
          </p>
          <p className="text-xl ml-16 mr-16 max-sm:ml-8 max-sm:mr-8">
            More updates will be provided as we continue to
            develop IncludiTravel, which helps provide not only personalized
            itineraries, but also provides accessibility resources for people
            with disabilities.
          </p>
          <p className="text-xl ml-16 mr-16 max-sm:ml-8 max-sm:mr-8">
            Thank you for your understanding and patience, and we will see you
            on launch day!
          </p>
          {loading ?
            !error ?
                <button
                    onClick={handleSignOut}
                    className="bg-white rounded-lg text-black p-5 pl-10 pr-10 font-bold"
                    disabled
                >
                    Signing out...
                </button>
                :
                <button
                    onClick={handleSignOut}
                    className="bg-white rounded-lg text-black p-5 pl-10 pr-10 font-bold"
                    disabled
                >
                    Log Out
                </button>
            :
            <button
                onClick={handleSignOut}
                className="bg-white rounded-lg text-black p-5 pl-10 pr-10 font-bold"
            >
                Log Out
            </button>
          }
        </span>
      </div>
    );
}

export default Dashboard;