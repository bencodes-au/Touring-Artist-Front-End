import React from "react";

const LoginIndicator = () => {
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  return (
    <div>
      {isLoggedIn ? <p>You are logged in!</p> : <p>You are logged out.</p>}
    </div>
  );
};

export default LoginIndicator;
