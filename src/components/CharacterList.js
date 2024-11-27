import React, { useState } from "react";
import { Link } from "react-router-dom";
import CharacterCard from "./CharacterCard";
import { motion } from "framer-motion";

const CharacterList = ({ characters }) => {
  const [statusFilter, setStatusFilter] = useState(""); // Status filter state
  const [speciesFilter, setSpeciesFilter] = useState(""); // Species filter state
  const [genderFilter, setGenderFilter] = useState(""); // Gender filter state

  // Function to clear all filters
  const clearFilters = () => {
    setStatusFilter("");
    setSpeciesFilter("");
    setGenderFilter("");
  };

  // Filter characters based on filter conditions
  const filteredCharacters = characters.filter((character) => {
    const matchesStatus = !statusFilter || character.status === statusFilter; // Matching by status
    const matchesSpecies = !speciesFilter || character.species === speciesFilter; // Matching by species
    const matchesGender = !genderFilter || character.gender === genderFilter; // Matching by gender

    return matchesStatus && matchesSpecies && matchesGender;
  });

  // If no characters match the filter
  if (filteredCharacters.length === 0) {
    return (
      <p className="text-center text-xl text-gray-500 font-semibold">
        No characters match the filter criteria.
      </p>
    );
  }

  return (
    <div>
      {/* Filter Section */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-gray-800 text-white px-4 py-2 rounded-md"
        >
          <option value="">Filter by Status</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
          <option value="Unknown">Unknown</option>
        </select>

        {/* Species Filter */}
        <select
          value={speciesFilter}
          onChange={(e) => setSpeciesFilter(e.target.value)}
          className="bg-gray-800 text-white px-4 py-2 rounded-md"
        >
          <option value="">Filter by Species</option>
          <option value="Human">Human</option>
          <option value="Alien">Alien</option>
          <option value="Robot">Robot</option>
        </select>

        {/* Gender Filter */}
        <select
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
          className="bg-gray-800 text-white px-4 py-2 rounded-md"
        >
          <option value="">Filter by Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Genderless">Genderless</option>
          <option value="Unknown">Unknown</option>
        </select>

        {/* Clear Filters Button */}
        <button
          onClick={clearFilters}
          className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-all duration-300"
        >
          Clear Filters
        </button>
      </div>

      {/* Character Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 p-8">
        {filteredCharacters.map((character) => (
          <Link
            to={`/character/${character.id}`}
            key={character.id}
            className="group relative transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
          >
            {/* Card Wrapper */}
            <div className="bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-700 rounded-xl shadow-lg overflow-hidden group-hover:scale-105 group-hover:shadow-2xl transition-all duration-500">
              <div className="relative">
                {/* Parallax Hover Effect */}
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat group-hover:scale-110 transition-all duration-500"
                  style={{
                    backgroundImage: `url(${character.image})`,
                    height: "200px",
                  }}
                ></div>

                <div className="relative z-10 p-6 hover:text-gray-300">
                  {/* Character Name */}
                  <h2 className="text-2xl font-extrabold text-black">
                    {character.name}
                  </h2>

                  {/* Status and Species */}
                  <div className="flex justify-between mb-4">
                    <p className="bg-gray-800 text-green-400 px-4 py-2 rounded-full text-sm">
                      {character.status}
                    </p>
                    <p className="bg-gray-800 text-blue-400 px-4 py-2 rounded-full text-sm">
                      {character.species}
                    </p>
                  </div>

                  {/* Favorite Button */}
                  <motion.button
                    className="absolute top-4 right-4 p-3 rounded-full bg-gray-700 text-white transform transition-all duration-300 hover:bg-yellow-500 hover:scale-110"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={`Add ${character.name} to favorites`}
                  >
                    <i className="fas fa-star"></i>
                  </motion.button>

                  {/* Additional Character Info */}
                  <p className="text-gray-300 text-sm italic">
                    Origin: <span className="text-white">{character.origin?.name || "Unknown"}</span>
                  </p>
                  <p className="text-gray-300 text-sm italic">
                    Location: <span className="text-white">{character.location?.name || "Unknown"}</span>
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CharacterList;
