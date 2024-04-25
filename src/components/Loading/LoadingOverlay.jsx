import React from "react";

const LoadingOverlay = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-50">
          <span className="text-white loading loading-dots loading-lg"></span>
          <span className="text-white">Bạn vui lòng chờ một tí..</span>
        </div>
      )}
    </>
  );
};

export default LoadingOverlay;
