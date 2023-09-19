"use client";

import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Dashboard() {
  const [success, setSuccess] = useState("");
  const [data, setData] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const username = Cookies.get("username");
    const token = Cookies.get("token");
    if (!username || !token) {
      router.push("/login");
    }
  }, []);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];

    const formData = new FormData();
    formData.append("file", selectedFile);

    const res = axios
      .post("https://supabaseb.onrender.com/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      })
      .then((res) => {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        setSuccess(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Show Files

  useEffect(() => {
    const fetchData = async () => {
      const username = Cookies.get("username");
      const res = await axios
        .post("https://supabaseb.onrender.com/api/user/files", username ,{
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);

  const handleDownload = (filename) => {
    const username = Cookies.get("username");
    const res = axios.post(
      `https://supabaseb.onrender.com/api/file/download/${filename}`,
      { username },
      { withCredentials: true }
    );
  };

  const handleDelete = (filename) => {
    const username = Cookies.get("username");
    const res = axios
      .post(
        `https://supabaseb.onrender.com/api/file/delete/${filename}`,
        { username },
        { withCredentials: true }
      )
      .then((res) => {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
  };

  const handleSignOut = () => {
    Cookies.remove("username");
    Cookies.remove("token");
    router.push("/");
  };

  if (data === null) {
  }

  return (
    <main className="content-container py-2 bg-black">
      <div className="docnav flex items-center justify-between mt-4">
        <h1 className="ml-10 text-xl font-semibold text-orange-600">
          Your Documents
        </h1>
        <div className="flex items-center">
          <label
            htmlFor="fileInput"
            className="cursor-pointer bg-orange-600 rounded-lg py-1 px-2 mr-10 text-black font-semibold"
          >
            <span>Upload</span>
            <input
              type="file"
              id="fileInput"
              className="hidden"
              accept=".pdf , .docx"
              onChange={handleFileSelect}
            />
          </label>
          <button
            onClick={handleSignOut}
            className="mr-20 bg-blue-400 px-2 py-1 rounded-md text-black font-semibold"
          >
            SignOut
          </button>
        </div>
        {success && success ? (
          <h1 className="text-green-500">{success}</h1>
        ) : null}
      </div>
      <div className="grayline h-0.5 mt-5 mb-5 bg-gray-700"></div>
      {data && data.length === 0 ? (
        <div className="text-center mt-10 text-gray-400 text-lg">
          You have no documents
        </div>
      ) : (
        data.map((data) => (
          <div key={data._id} className="cards ml-5 mt-10 bg-white rounded-lg ">
            <header className="text-center font-semibold py-2 text-lg text-orange-600">
              {data.filename}
            </header>
            <div className="flex justify-center">
              <button
                onClick={() => {
                  handleDownload(data.filename);
                }}
                className="text-white mt-5 mb-2 rounded-lg px-2 py-2 bg-black"
              >
                Download
              </button>
              <button
                onClick={() => {
                  handleDelete(data.filename);
                }}
                className="text-white mt-5 mb-2 ml-12 rounded-lg px-2 py-2 bg-black"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </main>
  );
}

export default Dashboard;
