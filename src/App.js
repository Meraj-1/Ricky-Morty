import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomPage.js";
import CharacterDetailPage from "./pages/CharacterDetailPage";

function App() {
  return (
    <Router>
      <div className="bg-gray-900 text-white min-h-screen p-4">
        <h1 className="text-center text-4xl font-bold mb-8">Rick and Morty API Explorer</h1>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/character/:id" element={<CharacterDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

