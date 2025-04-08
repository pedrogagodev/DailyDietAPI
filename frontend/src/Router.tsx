import { Route, Routes } from "react-router";
import { AuthGuard } from "./layouts/AuthGuard";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { CreateMeal } from "./pages/CreateMeal";
import Dashboard from "./pages/Dashboard";
import { EditMeal } from "./pages/EditMeal";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

export function Router() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
      <Route path="/" element={<LandingPage />} />
        <Route element={<AuthGuard isPrivate={true} />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="meals/create" element={<CreateMeal />} />
            <Route path="meals/:mealId" element={<EditMeal />} />
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
