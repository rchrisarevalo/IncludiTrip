import "@fontsource/poppins";
import Link from "next/link";
import image from "./images/home.png";

export default function Home() {
  return (
    <main className="flex font-['Poppins'] min-h-screen flex-col items-center justify-between p-8 md:p-24">
      <section className="flex flex-col md:flex-row items-center justify-center h-screen w-full md:space-y-0 md:space-x-8 bg-[#23465d] text-white">
      <div className="flex flex-1 flex-col justify-center items-start text-left md:max-w-md px-4 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">
            Struggling to plan your next vacation?
          </h1>
          <p className="text-lg md:text-xl">
            Look no further! The AI Travel App takes the stress out of travel planning.
          </p>
          </div>

          <div className="flex-1 flex justify-center items-center w-full h-full">
          <img
            src={image.src}
            alt="Travel the world image with person in wheelchair and a plane"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </section>

      <section className="flex flex-col items-center justify-center w-full text-center px-4 py-8">
        <article className="max-w-2xl space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">
            What does the AI Travel App do?
          </h1>
          <p className="text-lg md:text-xl">
            Get personalized travel recommendations tailored to your budget and preferences.
            Start your adventure today with the AI Travel App by having it find the best hotels for you!
          </p>
          <button className="p-5 pl-5 pr-5 bg-white text-black font-extrabold rounded-lg">
            <Link href="/login">Take me to my next adventure!</Link>
          </button>
        </article>
      </section>
    </main>
  );
}
