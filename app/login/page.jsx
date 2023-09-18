"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const handleLoginButton = () => {
    const res = axios
      .post("https://supa-locker-b.vercel.app/api/login", {
        username,
        password,
      })
      .then((res) => {
        setUsername("");
        setPassword("");
        Cookies.set("username", username);
        Cookies.set("token", res.data.token);
        setSuccess(res.data.msg);
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      })
      .catch((err) => {
        setError(err.response.data.msg);
      });
  };

  return (
    <main className="flex justify-center items-center mt-60">
      <div className="flex  flex-col bg-black rounded-2xl py-10 px-10">
        <h1 className="font-semibold text-2xl text-center mb-4 underline">
          Login
        </h1>
        {error ? (
          <h1 className="text-red-500 text-center mb-2">{error}</h1>
        ) : null}
        {success ? (
          <h1 className="text-green-500 text-center mb-2">{success}</h1>
        ) : null}
        <h1 className="mb-2">Username :</h1>
        <input
          className="rounded-lg mb-4 py-2"
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder="username.."
        />
        <h1 className="mb-2">Password :</h1>
        <input
          className="rounded-lg py-2"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="test123"
        />
        <button
          onClick={handleLoginButton}
          className="signupbtn self-center rounded-md mt-5 py-2 bg-orange-600 text-black font-semibold w-24"
        >
          Submit
        </button>
        <div className="h-0.5 mt-5 mb-5 bg-gray-700"></div>
        <div className="flex gap-2">
          <p className="text-center">Dont Have An Account?</p>
          <Link href="/signup">
            <p className="text-center text-orange-600 font-bold">Signup</p>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Login;
