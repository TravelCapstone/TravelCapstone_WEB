import React from "react";

const LoadingOverlay = ({ isLoading, title }) => {
  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-60">
          <div className="flex items-center mb-4">
            <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-green-500 animate-text">
              {`Cóc Travel ${title ? title : ""}...`}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default LoadingOverlay;
