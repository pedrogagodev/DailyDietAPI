import Logo from "@/assets/DailyDietLogo-Photoroom.svg";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export function Header() {
  const { isSignedIn, signout, data } = useAuth();

  return (
    <div className="flex items-center justify-between">
      <Link to="/">
        <div className="flex items-center hover:cursor-pointer">
          <img src={Logo} alt="" className="h-20 w-15" />
          <p className="font-bold text-xl">Daily Diet</p>
        </div>
      </Link>
      {isSignedIn ? (
        <div className="flex gap-4">
          <Avatar className="h-9 w-9">
            <AvatarImage />
            <AvatarFallback>{data?.user?.name[0]}</AvatarFallback>
          </Avatar>
          <Button onClick={signout} className="mr-6 hover:cursor-pointer">
            Sign Out
          </Button>
        </div>
      ) : (
        <Link to="/login">
          <Button className="mr-6 hover:cursor-pointer">Sign In</Button>
        </Link>
      )}
    </div>
  );
}
