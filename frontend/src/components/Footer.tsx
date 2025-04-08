import Logo from "@/assets/DailyDietLogo-Photoroom.svg";

export function Footer() {
  return (
    <footer className="border-t py-6">
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:px-10">
        <div className="flex items-center gap-2">
          <div className="size-8 md:size-10 rounded-full bg-primary/20 flex items-center justify-center">
            <img
              src={Logo}
              alt="DailyDiet Logo"
              className="size-10 md:size-16 text-primary"
            />
          </div>
          <span className="text-xl font-bold">Daily Diet</span>
        </div>

        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Daily Diet. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
