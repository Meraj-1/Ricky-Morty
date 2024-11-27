import React, { useState, useEffect } from "react";
import axios from "axios";
import CharacterList from "../components/CharacterList";
import Pagination from "../components/Paginations";

const HomePage = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://rickandmortyapi.com/api/character?page=${currentPage}&name=${search}`
        );
        setCharacters(response.data);
      } catch (err) {
        setError("Failed to load characters. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [currentPage, search]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name..."
        className="w-full p-2 mb-4 bg-gray-800 text-white rounded"
        onChange={(e) => setSearch(e.target.value)}
      />
      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          <CharacterList characters={characters.results} />
          <Pagination
            info={characters.info}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default HomePage;
