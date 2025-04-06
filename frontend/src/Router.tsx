import { Route, Routes } from "react-router";
import { AuthGuard } from "./layouts/AuthGuard";
import { DefaultLayout } from "./layouts/DefaultLayout";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { CreateMeal } from "./pages/CreateMeal";

export function Router() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route element={<AuthGuard isPrivate={true} />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="meals/create" element={<CreateMeal />} />
          </Route>
        </Route>
      </Route>
      <Route element={<AuthGuard isPrivate={false} />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}
