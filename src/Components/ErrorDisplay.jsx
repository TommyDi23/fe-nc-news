import React from "react";

const ErrorDisplay = ({ err }) => {
  return (
    <div>
      <p>
        Error: this is an error {err.status} {err.msg}
      </p>
    </div>
  );
};

export default ErrorDisplay;
