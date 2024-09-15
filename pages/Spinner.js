// Spinner.jsx
import React from "react";

const Spinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p className="loading-text">Processing, please wait...</p>
    </div>
  );
};

export default Spinner;
