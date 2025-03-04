import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { VenuesPage } from "./pages/VenuesPage.jsx";
import { BookingPage } from "./pages/BookingPage.jsx";
import { AuthenticationPage } from "./pages/AuthenticationPage.jsx";
import { Navbar } from "./components/Navbar.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

// create route render
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navbar /> {}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/venues" element={<VenuesPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route
            path="/authentication"
            element={<AuthenticationPage />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
