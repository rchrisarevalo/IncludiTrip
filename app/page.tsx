import "@fontsource/poppins";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex font-['Poppins'] min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="mt-10 mb-10 ml-10 mr-10 text-center text-lg space-y-5">
          <h1 className="text-5xl">Struggling to plan your next vacation?</h1>
          <p>
            Look no further! The AI Travel App takes the stress out of travel
            planning.
          </p>
          <br></br>
          <h1 className="text-5xl">What does the AI Travel App do?</h1>
          <p>
            Get personalized travel recommendations tailored to your budget and
            preferences. Start your adventure today with the AI Travel App by
            having it find the best hotels for you!
          </p>
          <br></br>
          <button className="p-5 pl-5 pr-5 bg-white text-black font-extrabold rounded-lg">
            <Link href="/login">Take me to my next adventure!</Link>
          </button>
        </div>
      </div>
    </main>
  );
}
