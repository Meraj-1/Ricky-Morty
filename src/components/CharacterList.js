import React from "react";
import { Link } from "react-router-dom";
import CharacterCard from "./CharacterCard";

const CharacterList = ({ characters }) => {
  if (!characters) return <p>No characters found.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {characters.map((character) => (
        <Link to={`/character/${character.id}`} key={character.id}>
          <CharacterCard character={character} />
        </Link>
      ))}
    </div>
  );
};

export default CharacterList;

