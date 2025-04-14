import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Cashier from "./Cashier";
import Manager from "./Manager";
import Employees from "./Employees";
import MenuItems from "./MenuItems";
import Inventory from "./Inventory";
import Login from "./Login";
import Reports from "./Reports";
import KioskLogin from "./KioskLogin";
import KioskMenu from "./KioskMenu";

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
       {/* Route for the employee screen */}
      <Route path="/manager/employees" element={<Employees />} />
         {/* Route for the menu item screen */}
      <Route path="/manager/menu" element={<MenuItems />} />
        {/* Route for the Login page */}
      <Route path = "/login" element = {<Login/>} />
         {/* Route for the inventory screen */}
      <Route path="/manager/inventory" element={<Inventory />} />
      {/* Route for the Reports page */}
      <Route path="/manager/reports" element={<Reports />} />

      <Route path = "/kioskLogin" element={<KioskLogin/>} />

      <Route path = "/kioskMenu" element={<KioskMenu/>} />

    </Routes>
  );
}

export default AppRoutes;