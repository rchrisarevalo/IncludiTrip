import "@fontsource/poppins";
import Link from "next/link";
import image from "./images/home.png";
import logo from "./images/smallLogo.png";
import { FaPlane, FaHotel, FaTaxi, FaCalendarAlt, FaAccessibleIcon } from "react-icons/fa";

export default function Home() {
  return (
    <main className="flex font-['Poppins'] min-h-screen flex-col items-center justify-between bg-[#f5f5f5]">
      <nav className="w-full text-[#23465d] bg-white py-4 px-8">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto">
          <Link href="/" >
          <img
            src={logo.src}
            alt="IncludiTrip logo"
            className="object-cover rounded-lg"
            height={100}
            width={100}
          />
          </Link>
          <ul className="flex space-x-6 font-bold text-l">
            <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
            <li><Link href="#features" className="hover:text-gray-500">Features</Link></li>
            <li><Link href="/login" className="hover:text-gray-300">Login</Link></li>
          </ul>
        </div>
      </nav>
      <section className="flex flex-col p-8 md:p-24 md:flex-row items-center justify-center min-h-screen w-full bg-[#23465d] text-white">
      <div className="flex flex-1 flex-col justify-center items-center md:items-start text-center md:text-left px-4 md:px-8 space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold">
            Struggling to plan an accessible vacation?
          </h1>
          <p className="text-lg md:text-2xl">
            IncludiTrip makes travel planning stress-free and offers accessible options tailored to your needs
          </p>
          <Link 
            href="/signup" 
            className="inline-block bg-[#23465d] text-white font-extrabold px-6 py-4 border-slate-400 border-4 rounded-lg hover:bg-slate-300 hover:text-black hover:border-[#23465d] transition duration-300 mt-8">
              Join The Waitlist
          </Link>
          </div>

          <div className="flex-1 flex justify-center items-center mt-8 md:mt-0">
          <div className="relative w-full max-w-xs md:max-w-lg">
          <img
            src={image.src}
            alt="Travel the world image with person in wheelchair and a plane"
            className="object-cover rounded-lg  w-full h-auto"
            height={400}
            width={600}
          />
          </div>
        </div>
      </section>

      <section id="features" className="w-full flex flex-col items-center justify-center text-center px-4 py-8 mt-24 scroll-smooth">
        <article className="max-w-screen w-full space-y-14 text-black">
          <h1 className="text-3xl md:text-5xl font-bold">
            What does IncludiTrip do?
          </h1>
          <h2 className="text-lg md:text-xl font-semibold">
            Get AI-powered personalized travel recommendations tailored to your budget and preferences.
          </h2>
          <section className="flex flex-wrap justify-center gap-8 p-8 bg-[#23465d] text-white rounded-lg w-full">
            <div className="w-60 h-60 p-6 bg-white text-[#23465d] rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out">
              <FaPlane size={40} className="mb-4" />
              <h3 className="text-2xl font-bold">Flight Selections</h3>
            </div>
            <div className="w-60 h-60 p-6 bg-white text-[#23465d] rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out">
              <FaHotel size={40} className="mb-4" />
              <h3 className="text-2xl font-bold">Hotel Booking</h3>
            </div>
            <div className="w-60 h-60 p-6 bg-white text-[#23465d] rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out">
              <FaTaxi size={40} className="mb-4" />
              <h3 className="text-2xl font-bold">Transport Options</h3>
            </div>
            <div className="w-60 h-60 p-6 bg-white text-[#23465d] rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out">
              <FaCalendarAlt size={40} className="mb-4" />
              <h3 className="text-2xl font-bold">Local Event Alerts</h3>
            </div>
            <div className="w-60 h-60 p-6 bg-white text-[#23465d] rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out">
              <FaAccessibleIcon size={40} className="mb-4" />
              <h3 className="text-2xl font-bold">Accessible Options</h3>
            </div>
          </section>
          <h2 className="text-lg md:text-xl font-semibold">
            ...and much more!
          </h2>
        </article>
      </section>

      <section id="instructions" className="w-full flex flex-col items-center justify-center text-center px-4 py-8 mt-24 mb-24 bg-[#f5f5f5]">
  <article className="max-w-screen-xl w-full space-y-14 text-black">
    <h1 className="text-3xl md:text-5xl font-bold mb-8">
      How to Get Started
    </h1>
    <div className="flex flex-col items-center gap-8">
      <div className="w-full max-w-88 p-6 bg-white text-[#23465d] rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">1. Create an Account</h2>
        <p>Create an account or sign in to IncludiTrip.</p>
      </div>
      <div className="w-full max-w-88 p-6 bg-white text-[#23465d] rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">2. Set Preferences</h2>
        <p>Set your preferences and accessibility requirements.</p>
      </div>
      <div className="w-full max-w-88 p-6 bg-white text-[#23465d] rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">3. Get Recommendations</h2>
        <p>Get personalized travel recommendations and plan your trip.</p>
      </div>
      <div className="w-full max-w-88 p-6 bg-white text-[#23465d] rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">4. Book Your Trip</h2>
        <p>Book your flights, hotels, and transport options with ease.</p>
      </div>
      <div className="w-full max-w-88 p-6 bg-white text-[#23465d] rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">5. Enjoy Your Vacation</h2>
        <p>Enjoy your stress-free and accessible vacation!</p>
      </div>
    </div>
  </article>
</section>


      <footer className="w-full bg-white text-black py-8 px-8">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between">
          <div className="mb-4 md:mb-0 mx-auto">
            <img
              src={logo.src}
              alt="Logo"
              className="object-cover rounded-lg mx-auto"
              height={100}
              width={100}
            />
            <p className="mt-4">© 2024 IncludiTrip. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
