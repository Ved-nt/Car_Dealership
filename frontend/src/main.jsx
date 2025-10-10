import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Contact from "./pages/Contact.jsx";
import Cars from "./pages/Cars.jsx";
import CarDetails from "./pages/CarDetails.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import CarsAdmin from "./pages/CarsAdmin.jsx";

const AdminRoute = ({ children }) => {
  const isAdmin = sessionStorage.getItem("isAdmin") === "true";
  return isAdmin ? children : <Navigate to="/admin/login" />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "/contact", element: <Contact /> },
      { path: "/cars", element: <Cars /> },
      { path: "/cars/:id", element: <CarDetails /> },
      { path: "/admin/login", element: <AdminLogin /> },
      {
        path: "/admin/add-car",
        element: (
          <AdminRoute>
            <CarsAdmin />
          </AdminRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
