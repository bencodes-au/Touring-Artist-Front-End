import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./styles/index.css";
import { HomePage } from "./pages/HomePage.jsx";
import { VenuesPage } from "./pages/VenuesPage.jsx";
import { BookingsPage } from "./pages/BookingsPage.jsx";
import { AuthenticationPage } from "./pages/AuthenticationPage.jsx";
import { Navbar } from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./styles/index.css";

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
          <Route path="/bookings" element={<BookingsPage />} />
          <Route
            path="/authentication"
            element={<AuthenticationPage />}
          ></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
