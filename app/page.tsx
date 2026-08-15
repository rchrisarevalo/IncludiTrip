import "@fontsource/poppins";
import Link from "next/link";
import image from "./images/home.png";
import logo from "./images/smallLogo.png";
import { FaPlane, FaHotel, FaTaxi, FaCalendarAlt, FaAccessibleIcon } from "react-icons/fa";

const features = [
  {
    icon: FaPlane,
    title: "Flight Selections",
    description: "Compare flights with accessibility notes built in.",
  },
  {
    icon: FaHotel,
    title: "Hotel Booking",
    description: "Filter stays by the accommodations you actually need.",
  },
  {
    icon: FaTaxi,
    title: "Transport Options",
    description: "Find accessible transit and rideshare at your destination.",
  },
  {
    icon: FaCalendarAlt,
    title: "Local Event Alerts",
    description: "Stay in the loop on accessible events near you.",
  },
  {
    icon: FaAccessibleIcon,
    title: "Accessible Options",
    description: "Every recommendation is screened for accessibility first.",
  },
];

const steps = [
  {
    title: "Create an Account",
    description: "Create an account or sign in to IncludiTrip.",
  },
  {
    title: "Set Preferences",
    description: "Set your preferences and accessibility requirements.",
  },
  {
    title: "Get Recommendations",
    description: "Get personalized travel recommendations and plan your trip.",
  },
  {
    title: "Book Your Trip",
    description: "Book your flights, hotels, and transport options with ease.",
  },
  {
    title: "Enjoy Your Vacation",
    description: "Enjoy your stress-free and accessible vacation!",
  },
];

export default function Home() {
  return (
    <main className="flex font-['Poppins'] min-h-screen flex-col items-center justify-between bg-[#f5f5f5]">
      {/* Nav */}
      <nav className="w-full text-[#23465d] bg-white py-3 px-4 sm:px-8 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto">
          <Link href="/">
            <img
              src={logo.src}
              alt="IncludiTrip logo"
              className="object-cover rounded-lg"
              height={56}
              width={56}
            />
          </Link>
          <ul className="flex items-center space-x-4 sm:space-x-6 font-bold text-sm sm:text-base">
            <li>
              <Link href="/" className="hover:text-slate-500 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="#features" className="hover:text-slate-500 transition-colors">
                Features
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="hover:text-slate-500 transition-colors border-2 border-[#23465d] px-3 py-1.5 rounded-lg"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col p-6 sm:p-10 md:p-24 md:flex-row items-center justify-center min-h-[90vh] md:min-h-screen w-full bg-[#23465d] text-white gap-10 md:gap-0">
        <div className="flex flex-1 flex-col justify-center items-center md:items-start text-center md:text-left px-2 sm:px-4 md:px-8 space-y-5 sm:space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">
            Struggling to plan an accessible vacation?
          </h1>
          <p className="text-base sm:text-lg md:text-2xl text-white/90">
            IncludiTrip makes travel planning stress-free and offers
            accessible options tailored to your needs
          </p>
          <Link
            href="/signup"
            className="inline-block bg-[#23465d] text-white font-extrabold px-6 py-3.5 sm:py-4 border-slate-400 border-4 rounded-lg hover:bg-slate-300 hover:text-black hover:border-[#23465d] transition duration-300 mt-4 sm:mt-8"
          >
            Join The Waitlist
          </Link>
        </div>

        <div className="flex-1 flex justify-center items-center w-full">
          <div className="relative w-full max-w-[280px] sm:max-w-sm md:max-w-lg">
            <img
              src={image.src}
              alt="Travel the world image with person in wheelchair and a plane"
              className="object-cover rounded-lg w-full h-auto"
              height={400}
              width={600}
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="w-full flex flex-col items-center justify-center text-center px-4 sm:px-6 py-16 sm:py-20 scroll-mt-20"
      >
        <article className="max-w-screen-xl w-full space-y-10 sm:space-y-14 text-black">
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold">
              What does IncludiTrip do?
            </h1>
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-[#23465d]">
              Get AI-powered personalized travel recommendations tailored to
              your budget and preferences.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 sm:p-8 bg-[#23465d] rounded-2xl w-full">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex flex-col items-center text-center gap-3 p-6 bg-white text-[#23465d] rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition duration-300 ease-in-out"
              >
                <Icon size={36} />
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="text-sm text-slate-600">{description}</p>
              </div>
            ))}
          </div>

          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-[#23465d]">
            ...and much more!
          </h2>
        </article>
      </section>

      {/* How it works */}
      <section
        id="instructions"
        className="w-full flex flex-col items-center justify-center text-center px-4 sm:px-6 py-16 sm:py-20 bg-[#f5f5f5]"
      >
        <article className="max-w-3xl w-full space-y-10 sm:space-y-12 text-black">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold">
            How to Get Started
          </h1>

          <ol className="flex flex-col gap-4 sm:gap-5 text-left">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="flex items-start gap-4 sm:gap-5 p-5 sm:p-6 bg-white text-[#23465d] rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out"
              >
                <span className="flex-shrink-0 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#23465d] text-white font-bold text-sm sm:text-base">
                  {i + 1}
                </span>
                <div className="space-y-1">
                  <h2 className="text-lg sm:text-xl font-bold">{step.title}</h2>
                  <p className="text-sm sm:text-base text-slate-600">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </article>
      </section>

      {/* Footer */}
      <footer className="w-full bg-white text-black py-8 px-4 sm:px-8">
        <div className="max-w-screen-xl mx-auto flex flex-col items-center">
          <img
            src={logo.src}
            alt="IncludiTrip logo"
            className="object-cover rounded-lg"
            height={72}
            width={72}
          />
          <p className="mt-4 text-sm text-slate-600">
            © 2024 IncludiTrip. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}