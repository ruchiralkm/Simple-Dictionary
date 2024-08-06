import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { InputContext } from "../App"; // Import InputContext

axios.defaults.baseURL = "https://api.dictionaryapi.dev/api/v2/entries/en";

function ResultList() {
  const { inputValue } = useContext(InputContext);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async (word) => {
    try {
      setLoading(true);
      const res = await axios(`/${word}`);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError("An error occurred while fetching the data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inputValue.length) {
      fetchData(inputValue);
    }
  }, [inputValue]);

  console.log(response);

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {response && (
        <div>
          <h3 className="text-2xl font-bold mt-4">
            Meaning and Definitions 📖
          </h3>
          {response[0]?.meanings.map((meaning, index) => (
            <div key={index}>
              <p>
                <strong>Part of Speech - </strong> {meaning.partOfSpeech}
              </p>
              <p>
                <strong>Definitions - </strong>
              </p>
              <ul>
                {meaning.definitions.map((definition, i) => (
                  <li key={i}>• {definition.definition}</li>
                ))}
              </ul>
            </div>
          ))}
          <h3 className="text-2xl font-bold mt-4">Examples 📖 </h3>
          {response[0]?.meanings.map((meaning, index) => (
            <div key={index}>
              <ul>
                {meaning.definitions.map((definition, i) =>
                  definition.example ? (
                    <li key={i}>• {definition.example}</li>
                  ) : null
                )}
              </ul>
            </div>
          ))}
          <h3 className="text-2xl font-bold mt-4">Synonyms 📖 </h3>
          {response[0]?.meanings.map((meaning, index) => (
            <div key={index}>
              <ul>
                {meaning.synonyms && meaning.synonyms.length > 0 ? (
                  meaning.synonyms.map((synonym, i) => (
                    <li key={i}>• {synonym}</li>
                  ))
                ) : (
                  <p>No synonyms available 😥</p>
                )}
              </ul>
            </div>
          ))}
          <h3 className="text-2xl font-bold mt-4">Antonyms 📖 </h3>
          {response[0]?.meanings.map((meaning, index) => (
            <div key={index}>
              <ul>
                {meaning.antonyms && meaning.antonyms.length > 0 ? (
                  meaning.antonyms.map((antonym, i) => (
                    <li key={i}>• {antonym}</li>
                  ))
                ) : (
                  <p>No antonyms available 😥</p>
                )}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ResultList;
