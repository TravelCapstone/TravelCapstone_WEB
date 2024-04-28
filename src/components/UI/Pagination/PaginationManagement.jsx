import { useState } from "react";

const PaginationManagement = ({ currentPage, totalPages, handlePageClick }) => {
  const displayPages = 3;
  const getPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= displayPages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage - 1 <= 1) {
        endPage = Math.min(displayPages, totalPages - 1);
      }
      if (currentPage + 1 >= totalPages) {
        startPage = Math.max(totalPages - (displayPages - 1), 2);
      }

      pageNumbers.push(1);
      if (startPage > 2) pageNumbers.push("...");

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages - 1) pageNumbers.push("...");
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const renderPageNumbers = () => {
    const pageNumbers = getPageNumbers();

    return pageNumbers.map((page, index) => (
      <li className="px-1" key={index}>
        {page === "..." ? (
          <span className="btn btn-disabled">...</span>
        ) : (
          <button
            className={`block px-4 py-2 rounded-md ${currentPage === page ? " bg-mainColor text-white" : ""}`}
            onClick={() => page !== currentPage && handlePageClick(page)}
            disabled={currentPage === page}
          >
            {page}
          </button>
        )}
      </li>
    ));
  };

  return (
    <div className="flex justify-center my-8">
      <ul className="btn-group flex">
        {currentPage > 1 && (
          <li className="px-1">
            <button
              className="bg-mainColor text-white rounded-lg block px-4 py-2"
              onClick={() => handlePageClick(currentPage - 1)}
            >
              Previous
            </button>
          </li>
        )}
        {renderPageNumbers()}
        {currentPage < totalPages && (
          <li className="px-1">
            <button
              className="bg-mainColor text-white rounded-lg block px-4 py-2"
              onClick={() => handlePageClick(currentPage + 1)}
            >
              Next
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};
export default PaginationManagement;
