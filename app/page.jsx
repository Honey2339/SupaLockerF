import Image from "next/image";
import Link from "next/link";
import planet from "../public/solar.png";

export default function Home() {
  return (
    <>
      <main className="flex justify-center mt-20">
        <div>
          <h1 className="supa text-5xl font-extrabold text-center mb-8">
            SupaLocker
          </h1>
          <h1 className="text-center text-gray-400 text-lg">
            A modern way to handle and save all your documents
          </h1>
          <h1 className="text-center text-gray-400 text-lg mb-16">
            it is online locker which keeps track of your important data
          </h1>
          <Image className="-z-10" src={planet} alt="NoImage" />
          <Link href="/dashboard">
            <button
              className="bg-gray-300 absolute top-80 mt-2 text-black py-2 px-2 rounded-md font-semibold transition duration-150 hover:bg-white"
              style={{ left: "900px" }}
            >
              Get Started
            </button>
          </Link>
        </div>
      </main>
      <div className="box-inner"></div>
    </>
  );
}
