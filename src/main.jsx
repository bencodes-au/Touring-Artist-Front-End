import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./styles/index.css";
import { HomePage } from "./pages/HomePage.jsx";
import { VenuesPage } from "./pages/VenuesPage.jsx";
import { BookingsPage } from "./pages/BookingsPage.jsx";
import { Navbar } from "./components/Navbar.jsx";
import { AuthModal } from "./components/AuthModal.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <header>
          {/* Pass openAuthModal to Navbar */}
          <Navbar openAuthModal={() => setAuthModalOpen(true)} />
        </header>
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage openAuthModal={() => setAuthModalOpen(true)} />
              }
            />
            <Route path="/venues" element={<VenuesPage />} />

            {/* Protect the BookingsPage */}
            <Route
              path="/bookings"
              element={
                <ProtectedRoute openAuthModal={() => setAuthModalOpen(true)}>
                  <BookingsPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        {/* Global Auth Modal */}
        {isAuthModalOpen && (
          <AuthModal
            isOpen={isAuthModalOpen}
            closeModal={() => setAuthModalOpen(false)}
          />
        )}
      </BrowserRouter>
    </QueryClientProvider>
  );
};

const root = document.getElementById("root");

if (root) {
  const rootInstance = ReactDOM.createRoot(root);
  rootInstance.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
