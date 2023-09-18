"use client"

import React, { useState } from "react"
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google"
import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"

function SignUp() {
  const [clientData, setClientData] = useState()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID

  const router = useRouter()

  const handleSignUpButton = () => {
    const res = axios
      .post("http://localhost:5000/api/signup", {
        username,
        password,
      })
      .then((res) => {
        setSuccess(res.data.msg)
        setUsername("")
        setPassword("")
        setTimeout(() => {
          router.push("/login")
        }, 2000)
      })
      .catch((err) => {
        setError(err.response.data.msg)
      })
  }

  return (
    <main className="flex justify-center items-center mt-60">
      <div className="flex  flex-col bg-black rounded-2xl py-10 px-10">
        <h1 className="font-semibold text-2xl text-center mb-4 underline">
          Sign Up
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
            setUsername(e.target.value)
          }}
          placeholder="username"
        />
        <h1 className="mb-2">Password :</h1>
        <input
          className="rounded-lg py-2"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          value={password}
          placeholder="test123"
        />
        <button
          onClick={handleSignUpButton}
          className="signupbtn self-center rounded-md mt-5 py-2 bg-orange-600 text-black font-semibold w-24"
        >
          Submit
        </button>
        <div className="h-0.5 mt-5 mb-5 bg-gray-700"></div>
        <GoogleOAuthProvider clientId={CLIENT_ID}>
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={(data) => {
                console.log(data)
                setClientData(data)
              }}
            />
          </div>
        </GoogleOAuthProvider>
        <div className="flex gap-2 mt-4">
          <p className="text-center">Already Have An Account?</p>
          <Link href="/login">
            <p className="text-center text-orange-600 font-bold">Login</p>
          </Link>
        </div>
      </div>
    </main>
  )
}

export default SignUp
