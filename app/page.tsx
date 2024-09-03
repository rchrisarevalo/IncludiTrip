import "@fontsource/poppins";
import Link from "next/link";
import image from "./images/home.png";
import logo from "./images/smallLogo.png";

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
            <li><Link href="/login" className="hover:text-gray-300">Login</Link></li>
          </ul>
        </div>
      </nav>
      <section className="flex flex-col p-8 md:p-24 md:flex-row items-center justify-center h-screen w-full bg-[#23465d] text-white">
      <div className="flex flex-1 flex-col justify-center items-start text-center md:text-left md:max-w-lg px-4 md:px-8 space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold">
            Struggling to plan an accessible vacation?
          </h1>
          <p className="text-lg md:text-xl">
            IncludiTrip takes the stress out of travel planning and offers accessible options!
          </p>
          </div>

          <div className="flex-1 flex justify-center items-center w-full h-64 md:h-auto mt-8 md:mt-0">
          <div className="relative w-full max-w-xs md:max-w-lg">
          <img
            src={image.src}
            alt="Travel the world image with person in wheelchair and a plane"
            className="object-cover rounded-lg"
            height={400}
            width={600}
          />
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center w-full text-center px-4 py-8 mt-24">
        <article className="max-w-2xl space-y-14 text-black">
          <h1 className="text-3xl md:text-5xl font-bold">
            What does IncludiTrip do?
          </h1>
          <h2 className="text-lg md:text-xl font-semibold">
            Get personalized travel recommendations tailored to your budget and preferences.
            <br></br>
            <br></br>
            IncludiTrip includies:
            <br></br>
            <ul>
              <li>flight slections</li>
              <li>hotel booking</li>
              <li>transport option</li>
              <li>local event alerts</li>
              <li>accessible options</li>
            </ul>
            <br></br>
            and much more!
          </h2>
          <Link 
            href="/login" 
            className="inline-block bg-[#23465d] text-white font-extrabold px-8 py-5 border-slate-400 border-4 rounded-lg hover:bg-slate-300 hover:text-black hover:border-[#23465d] transition duration-300">
              Take me to my next adventure!
          </Link>
        </article>
      </section>
    </main>
  );
}
