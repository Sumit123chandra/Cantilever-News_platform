import React from "react";
import front from "../images/front.png";
import logo from "../images/logo.png";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/setup";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const navigate=useNavigate()

  const googleSignin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      auth.currentUser && navigate('/')
      console.log("User signed in successfully");
    } catch (err) {
      console.error("Error signing in: ", err);
    }
  };
  console.log(auth);

  return (
    <div className="flex flex-cols bg-black h-screen bg-gradient-to-r from-slate-900 to-black">
      <div className="flex flex-col items-center justify-center text-center w-full md:w-1/2 p-4 mt-0 ">
        <img src={logo} alt="Logo" className="h-28 rounded mt-0 md:mt-26 " />
        <h1 className="text-white text-3xl font-semibold mt-7">Sign in</h1>
        <button
          onClick={googleSignin}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border mt-14 border-blue-700 rounded h-14 w-64 md:w-96">
          Sign in
        </button>
        <h2 className="text-blue-500 underline mt-7">Sign in now</h2>
      </div>

      <div className="relative w-full md:w-1/2 h-1/2 md:h-full p-4 hidden md:block">
        <img src={front} alt="Front" className="h-screen p-4 rounded-md" />
      </div>
    </div>
  );
}
