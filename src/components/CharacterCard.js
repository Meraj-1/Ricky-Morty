import React, { useState } from "react";
import { motion } from "framer-motion";

// Modal component for more information
const Modal = ({ character, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-3/4 sm:w-1/2 transition-all transform duration-300">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">{character.name}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            <p><strong>Status:</strong> {character.status}</p>
            <p><strong>Species:</strong> {character.species}</p>
            <p><strong>Origin:</strong> {character.origin?.name || "Unknown"}</p>
            <p><strong>Location:</strong> {character.location?.name || "Unknown"}</p>
            <p><strong>Gender:</strong> {character.gender}</p>
            <p><strong>First Appearance:</strong> {character.firstEpisode?.name || "Unknown"}</p>
          </div>
          <div className="flex justify-center items-center">
            <img
              src={character.image}
              alt={character.name}
              className="w-48 h-48 object-cover rounded-lg shadow-xl"
            />
          </div>
        </div>
        <button
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition-all"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

const CharacterCard = ({ character }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isFavorite, setFavorite] = useState(false);

  const handleCardClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const toggleFavorite = (e) => {
    e.stopPropagation(); // Prevent modal from opening when clicking on the favorite button
    setFavorite(!isFavorite);
  };

  return (
    <div
      className="relative bg-gray-800 p-6 rounded-lg shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer"
      onClick={handleCardClick}
      role="button"
      aria-label={`More information about ${character.name}`}
    >
      {/* Character Name and Background Image */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-lg"
        style={{ backgroundImage: `url(${character.image})` }}>
        {/* Gradient Overlay for Better Text Visibility */}
        <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg"></div>
      </div>

      {/* Card Content */}
      <div className="relative z-10 text-center text-white">
        <h2 className="text-3xl font-bold text-gradient bg-clip-text mb-3">
          {character.name}
        </h2>

        {/* Status and Species Badge */}
        <div className="flex justify-center space-x-4 mb-3">
          <div className="text-sm font-medium bg-green-600 text-white px-4 py-2 rounded-full">
            {character.status}
          </div>
          <div className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-full">
            {character.species}
          </div>
        </div>

        {/* Origin and Location */}
        <p className="text-gray-300 text-sm italic">
          Origin: <span className="text-white">{character.origin?.name || "Unknown"}</span>
        </p>
        <p className="text-gray-300 text-sm italic">
          Location: <span className="text-white">{character.location?.name || "Unknown"}</span>
        </p>

        {/* Favorite Button */}
        <motion.button
          className={`absolute top-4 right-4 p-3 rounded-full ${isFavorite ? 'bg-yellow-500' : 'bg-gray-700'} text-white`}
          onClick={toggleFavorite}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <i className={`fas ${isFavorite ? 'fa-star' : 'fa-star-half-alt'}`}></i>
        </motion.button>
      </div>

      {/* Modal for More Info */}
      <Modal character={character} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default CharacterCard;
