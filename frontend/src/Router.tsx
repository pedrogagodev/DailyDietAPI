import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Register from "./pages/Register";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
