import React from "react";

export const LoaderPDF = ({ isLoading }) => {
  if (!isLoading) return null;
  return (
    <div id="loader" className="loadingbarpdf">
      <p>Loading...</p>
    </div>
  );
};
