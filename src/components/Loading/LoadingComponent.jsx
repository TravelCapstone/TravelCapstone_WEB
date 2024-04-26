import React, { useState, useEffect } from "react";

function LoadingComponent({ isLoading }) {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="flex flex-col items-center justify-center bg-opacity-50  rounded-full p-8">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <span>Đang tải...</span>
          </div>
        </div>
      )}
    </>
  );
}

export default LoadingComponent;
