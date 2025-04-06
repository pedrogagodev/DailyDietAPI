import Logo from "@/assets/DailyDietLogo-Photoroom.svg";
import { Link } from "react-router";
import { Button } from "./ui/button";

export function Header() {
  return (
    <div className="flex items-center justify-between">
      <Link to="/">
        <div className="flex items-center hover:cursor-pointer">
          <img src={Logo} alt="" className="h-20 w-15" />
          <p className="font-bold text-xl">Daily Diet</p>
        </div>
      </Link>
      <Link to="/login">
        <Button className="mr-6 hover:cursor-pointer">Sign In</Button>
      </Link>
    </div>
  );
}
