import React, { useContext, useState } from "react";
import { InputContext } from "../App";

function Header() {
  const [value, setValue] = useState("");
  const { inputValue, setInputValue } = useContext(InputContext);

  const handleInputChange = (e) => setValue(e.target.value);

  const handleInputSubmit = () => {
    setInputValue(value); // Update context value
    setValue("");
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      setInputValue(value); // Update context value
      setValue("");
    }
  };

  return (
    <div className="bg-gray-700">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-white text-center">
          Simple Dictionary
        </h1>
        <p className="text-center text-slate-300 mt-1 text-lg mb-10">
          Find Definitions for words
        </p>

        <div className="flex items-center justify-center mt-5">
          <div className="flex border-2 border-gray-200 rounded">
            <input
              className="px-4 py-2 md:w-80"
              type="text"
              placeholder="Search..."
              value={value}
              onChange={handleInputChange}
              //value={value}
              onKeyDown={handleInputKeyDown}
            />
            <button
              className="bg-blue-400 border-l px-4 py-2 text-white"
              onClick={handleInputSubmit}
            >
              Search
            </button>
          </div>
        </div>

        {inputValue && (
          <h3 className="text-gray-50 text-center mt-4 text-2xl">
            Results for 👉{" "}
            <span className="text-white text-2xl font-semibold">
              {inputValue}
            </span>
          </h3>
        )}
      </div>
    </div>
  );
}

export default Header;
