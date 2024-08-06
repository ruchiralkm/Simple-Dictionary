import { createContext, useState } from "react";
import Header from "./com/Header";
import ResultList from "./com/ResultList";

// Create context
export const InputContext = createContext();

function App() {
  const [inputValue, setInputValue] = useState("");

  const value = {
    inputValue,
    setInputValue,
  };

  return (
    <>
      <InputContext.Provider value={value}>
        <div className="App">
          <Header />
          <ResultList />
        </div>
      </InputContext.Provider>
    </>
  );
}

export default App;
