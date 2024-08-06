import React, { useContext, useState } from "react";
import axios from "axios";
import { InputContext } from "../App";

function Header() {
  const [value, setValue] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { inputValue, setInputValue } = useContext(InputContext);

  const handleInputChange = (e) => setValue(e.target.value);

  const handleInputSubmit = async () => {
    setInputValue(value);
    setValue("");
    fetchImage(value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      setInputValue(value);
      setValue("");
      fetchImage(value);
    }
  };

  const fetchImage = async (query) => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/photos/random`,
        {
          params: {
            query,
            client_id: "ENTER_YOUR_API_KEY", // Enter your unsplash api access key
          },
        }
      );
      if (response.data && response.data.urls) {
        setImageUrl(response.data.urls.small);
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-800 via-purple-950 to-blue-900">
      <div className="container mx-auto py-8">
        <center>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="5em"
            height="5em"
            viewBox="0 0 64 64"
          >
            <path
              fill="#547725"
              d="m55 35.1l7.5 7.4l-33.3 15.9s-4.4 2-6.5-1.2C14.5 44.4 55 35.1 55 35.1"
            />
            <path
              fill="#d9e3e8"
              d="M28.4 49.1s-6.4 2.2-5.2 6.5c1.2 4.4 6.3 1.7 6.3 1.7l31.6-14.7s-1.8-4.7 1.4-7.8z"
            />
            <path fill="#83bf4f" d="M33.7 5L64 34.5l-35.8 14l-23-35.8z" />
            <path fill="#fff" d="m34.6 11.7l5.8 6.2l-21.7 7.8l-5.1-7.9z" />
            <path
              fill="#94989b"
              d="m61 38l-21.1 8.6l20.8-9.5zm-.3 2.6l-22.5 9.3l22.1-10.3zm.2 1.4L32.2 54.5l28.3-13.4z"
            />
            <path
              fill="#699635"
              d="M22.7 57.2c-3.5-7.3 5.5-8.6 5.5-8.6l-23-35.9S0 12.6 0 18c0 2.2 1 3.9 1 3.9z"
            />
          </svg>
        </center>
        <h1 className="text-3xl font-bold text-white text-center">
          Simple Dictionary
        </h1>

        <p className="text-center text-slate-300 mt-1 text-lg mb-10 font-mono">
          Find Definitions for any words
        </p>

        <div className="flex items-center justify-center mt-5 ">
          <div className="flex border-2 border-gray-200 rounded-lg">
            <input
              className="px-4 py-2 md:w-80 rounded-tl-md rounded-bl-md outline-none border-none"
              type="text"
              placeholder="Search any words..."
              value={value}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
            />
            <button
              className="bg-green-700 border-l px-4 py-2 text-white rounded-tr-md rounded-br-md"
              onClick={handleInputSubmit}
            >
              Search
            </button>
          </div>
        </div>

        {inputValue && (
          <div>
            <h3 className="text-gray-50 text-center mt-4 text-2xl">
              Results for 👉{' "'}
              <span className="text-white text-2xl font-semibold">
                {inputValue}
              </span>
              {'"'}
            </h3>
            {imageUrl && (
              <div className="flex justify-center mt-4">
                <img
                  src={imageUrl}
                  alt={inputValue}
                  className="w-64 h-auto rounded-md shadow-md"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
