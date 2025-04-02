import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Cashier from "./Cashier";
import Manager from "./Manager";
import Employees from "./Employees";
import MenuItems from "./MenuItems";
import Inventory from "./Inventory";
import Login from "./Login";
// import Kiosk from "./Kiosk";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cashier" element={<Cashier />} />
      <Route path="/manager/dashboard" element={<Manager />} />
      <Route path="/manager/employees" element={<Employees />} />
      <Route path="/manager/menu" element={<MenuItems />} />
      <Route path = "/login" element = {<Login/>} />
      <Route path="/manager/inventory" element={<Inventory />} />
    </Routes>
  );
}

export default AppRoutes;