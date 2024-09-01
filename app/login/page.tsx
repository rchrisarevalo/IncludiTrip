"use client";
import Link from "next/link";
import mainLogo from "../images/mainLogo.png";
import { useState, useEffect } from "react";
import { auth } from "@/firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { useRouter } from "next/navigation";

type LoginForm = {
  username: string;
  password: string;
};

const Login = () => {
  // SET UP REST OF STATE VARIABLES AND FIREBASE HOOKS HERE.
  // .....
  // .....
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [form, setForm] = useState<LoginForm>({
    username: "",
    password: "",
  });
  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        form.username,
        form.password
      );
      setUser(userCredential.user);
      setShowPopup(false);
      console.log("User signed in successfully: ", userCredential.user);
      router.push("/dashboard");
    } catch (e) {
      setShowPopup(true);
      console.error("Error signing in: ", e);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      setShowPopup(false);
      console.log("User signed in successfully: ", result.user);
      router.push("/dashboard");
    } catch (e) {
      setShowPopup(true);
      console.error("Error signing in: ", e);
    }
  };

  return (
    <>
      <span className="min-h-screen flex text-center justify-center items-center bg-[#23465d]">
        <img
          src={mainLogo.src}
          alt="IncludiTrip, Take it Easy logo"
          className="w-1/2 h-auto"
          />
      </span>
      <span className="min-h-screen flex text-center justify-center items-center bg-white text-black">
        <form
          onSubmit={handleSignIn}
          className="p-10 flex flex-col items-left text-left rounded-lg space-y-4"
        >
          <label className="p-1 font-bold">Email</label>
          <input
            type="text"
            name="username"
            required
            onChange={handleFormChange}
            className="p-3 w-[300px] border border-solid outline-none border-black rounded-lg"
          />
          <label className="p-1 font-bold">Password</label>
          <input
            type="password"
            name="password"
            required
            onChange={handleFormChange}
            className="p-3 w-[300px] border border-solid outline-none border-black rounded-lg"
          />
          <span className="flex flex-col gap-3 items-center">
            <button
              className="w-full p-3 rounded-lg mt-5 bg-[#23465d] text-white font-bold"
              type="submit"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full p-3 rounded-lg mt-5 bg-red-500 text-white font-bold"
            >
              Sign In with Google
            </button>
            <button className="text-sm mt-5 font-bold" type="button">
              <Link href="/signup">Create an account</Link>
            </button>
            <button className="text-sm mt-1 font-bold" type="button">
              <Link href="/reset_password">Forgot password? Click here!</Link>
            </button>
          </span>
        </form>
      </span>
      {showPopup && (
        <span className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white text-black p-10 rounded-lg">
            <h1 className="text-2xl font-bold">Error signing in</h1>
            <p className="text-sm mt-2">
              There was an error signing in. Please try again.
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="p-3 bg-black text-white rounded-lg mt-5"
            >
              Close
            </button>
          </div>
        </span>
      )}
    </>
  );
};

export default Login;
