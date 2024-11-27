import React from "react";

const Pagination = ({ info, currentPage, setCurrentPage }) => {
  return (
    <div className="flex justify-center items-center mt-4">
      <button
        disabled={!info?.prev}
        onClick={() => setCurrentPage(currentPage - 1)}
        className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
      >
        Previous
      </button>
      <span className="px-4 py-2">{`Page ${currentPage}`}</span>
      <button
        disabled={!info?.next}
        onClick={() => setCurrentPage(currentPage + 1)}
        className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
