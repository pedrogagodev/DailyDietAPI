import { Header } from "@/components/Header";
import { Outlet } from "react-router";

export function DefaultLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
