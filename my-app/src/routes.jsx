import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Cashier from "./Cashier";
import Manager from "./Manager";
import Login from "./Login";

/**
 * AppRoutes Component
 *
 * This component defines the application's routing structure using React Router.
 * It maps specific paths to their corresponding components, enabling navigation
 * between different pages of the application.
 *
 * @component
 * @returns {JSX.Element} The routing structure for the application.
 */
function AppRoutes() {
  return (
    <Routes>
      {/* Route for the Home page */}
      <Route path="/" element={<Home />} />

      {/* Route for the Cashier page */}
      <Route path="/cashier" element={<Cashier />} />

      {/* Route for the Manager dashboard */}
      <Route path="/manager/dashboard" element={<Manager />} />

      {/* Route for the Login page */}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default AppRoutes;