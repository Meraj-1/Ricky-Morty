import React, { useState } from "react";
import { motion } from "framer-motion";

// Modal component for more info
const Modal = ({ character, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-3/4 max-w-4xl transition-all transform duration-300">
        <h2 className="text-3xl font-bold text-center mb-4">{character.name}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p><strong>Status:</strong> {character.status}</p>
            <p><strong>Species:</strong> {character.species}</p>
            <p><strong>Origin:</strong> {character.origin?.name || "Unknown"}</p>
            <p><strong>Location:</strong> {character.location?.name || "Unknown"}</p>
            <p><strong>Gender:</strong> {character.gender}</p>
            <p><strong>First Appearance:</strong> {character.firstEpisode?.name || "Unknown"}</p>
          </div>
          <div>
            <img
              src={character.image}
              alt={character.name}
              className="w-full h-64 object-cover rounded-lg shadow-xl"
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
      className="relative group bg-gradient-to-r from-purple-600 via-indigo-700 to-blue-700 p-6 rounded-3xl shadow-lg  cursor-pointer"
      onClick={handleCardClick}
      role="button"
      aria-label={`More information about ${character.name}`}
    >
      {/* Parallax Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat  duration-500"
        style={{ backgroundImage: `url(${character.image})` }}
      ></div>

      {/* Card Content */}
      <div className="relative z-10">
        {/* Gradient Text Effect */}
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-500 to-red-500 mb-3">
          {character.name}
        </h2>

        {/* Status and Species Badges */}
        <div className="flex justify-center space-x-6 mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-lg">
              {character.status === "Alive" ? (
                <i className="fas fa-heartbeat text-green-400"></i>
              ) : character.status === "Dead" ? (
                <i className="fas fa-skull-crossbones text-red-400"></i>
              ) : (
                <i className="fas fa-question-circle text-gray-400"></i>
              )}
            </span>
            <span
              className={`px-6 py-2 rounded-full text-lg font-bold ${character.status === "Alive" ? "bg-green-500 text-green-900" : character.status === "Dead" ? "bg-red-500 text-red-900" : "bg-gray-500 text-gray-900"}`}
            >
              {character.status}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-lg">
              <i className="fas fa-atom text-blue-400"></i>
            </span>
            <span className="bg-blue-800 text-blue-300 px-6 py-2 rounded-full text-lg font-bold">
              {character.species}
            </span>
          </div>
        </div>

        {/* Character Information */}
        <p className="text-gray-400 text-sm italic">
          Origin: <span className="text-white">{character.origin?.name || "Unknown"}</span>
        </p>
        <p className="text-gray-400 text-sm italic mt-1">
          Location: <span className="text-white">{character.location?.name || "Unknown"}</span>
        </p>

        {/* Floating Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black opacity-0 group-hover:opacity-60 transition-opacity duration-300 rounded-3xl"></div>

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
