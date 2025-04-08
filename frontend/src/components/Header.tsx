import Logo from "@/assets/DailyDietLogo-Photoroom.svg";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { ModeToggle } from "./ui/mode-toggle";

export function Header() {
  const { isSignedIn, signout, data } = useAuth();
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 min-w-full items-center justify-between px-2 md:px-10">
        <Link to="/">
          <div className="flex items-center gap-2 hover:cursor-pointer">
            <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center">
              <img
                src={Logo}
                alt="DailyDiet Logo"
                className="h-14 w-14 md:h-20 md:w-15"
              />
            </div>
            <span className="md:text-xl font-bold">Daily Diet</span>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <ModeToggle />
          {isSignedIn ? (
            <div className="flex gap-4">
              <Avatar className="h-9 w-9">
                <AvatarImage />
                <AvatarFallback>{data?.user?.name[0]}</AvatarFallback>
              </Avatar>
              <Button
                onClick={signout}
                className="mr-6 hover:cursor-pointer font-bold"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex gap-4 items-center justify-center">
              <Link
                to="/login"
                className="text-sm font-medium hover:text-primary"
              >
                Log in
              </Link>
              <Button asChild>
                <Link to="/register">Get Started</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
