import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Cashier from "./Cashier";
import Manager from "./Manager";
import Login from "./Login";
// import Kiosk from "./Kiosk";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cashier" element={<Cashier />} />
      <Route path="/manager/dashboard" element={<Manager />} />
      <Route path = "/login" element = {<Login/>} />
    </Routes>
  );
}

export default AppRoutes;