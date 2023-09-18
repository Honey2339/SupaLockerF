import Link from "next/link";
import Image from "next/image";
import React from "react";
import solar from "../public/smallp.png";

function Navbar() {
  return (
    <header className="navbar shadow-2xl bg-black py-5 flex items-center">
      <nav className="ml-20 flex gap-10 items-center">
        <a href="/" className="flex items-center gap-5 ">
          <Image height="50" src={solar} />
          <h2 className="text-xl font-bold cursor-pointer">SupaLocker</h2>
        </a>
        <a href="/" className="w-0">
          <h2 className="text-lg ml-5 cursor-pointer transition duration-300 hover:text-orange-500">
            Home
          </h2>
        </a>
        <a href="/dashboard" className="w-0 ml-10">
          <h2 className="text-lg cursor-pointer transition duration-300 hover:text-orange-500">
            Dashboard
          </h2>
        </a>
      </nav>
    </header>
  );
}

export default Navbar;
