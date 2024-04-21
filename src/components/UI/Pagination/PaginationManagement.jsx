import { useState } from "react";

const PaginationManagement = ({currentPage,totalPages,handlePageClick})=>{

    const displayPages = 3; 
    const getPageNumbers = () => {
        const pageNumbers = [];
    
        if (totalPages <= displayPages) {
          for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
          }
        } else {
          const startPage = Math.max(1, currentPage - Math.floor(displayPages / 2));
          const endPage = Math.min(totalPages, startPage + displayPages - 1);
    
          // Thêm trang đầu tiên nếu startPage khác 1
          if (startPage !== 1) {
            pageNumbers.push(1);
            if (startPage > 2) {
              pageNumbers.push("...");
            }
          }
    
          // Thêm các trang giữa
          for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
          }
    
          // Thêm trang cuối cùng nếu endPage khác totalPages
          if (endPage !== totalPages) {
            if (endPage < totalPages - 1) {
              pageNumbers.push("...");
            }
            pageNumbers.push(totalPages);
          }
        }
    
        return pageNumbers;
      };
    
      const handleClick = (page) => {
        handlePageClick(page);
      };
    
      const renderPageNumbers = () => {
        const pageNumbers = getPageNumbers();
    
        return pageNumbers.map((page, index) => (
          <li key={index}>
            {page === "..." ? (
              <span className="btn btn-disabled">...</span>
            ) : (
              <button
                className={`btn ${currentPage === page ? "btn-active" : ""}`}
                onClick={() => handleClick(page)}
              >
                {page}
              </button>
            )}
          </li>
        ));
      };
    return(<>
     <div className="flex justify-center my-8">
          <ul className="btn-group flex">{renderPageNumbers()}</ul>
        </div>
    </>)
}
export default PaginationManagement;