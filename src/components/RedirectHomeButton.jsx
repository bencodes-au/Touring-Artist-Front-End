import React from "react";
import { Navigate } from "react-router-dom";

function RedirectHomeButton() {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  return (
    <div>
      <button
        onClick={() => {
          setShouldRedirect(true);
        }}
      >
        Return Home
      </button>
      {shouldRedirect && <Navigate to="/" />} {}
    </div>
  );
}

export default RedirectHomeButton;
