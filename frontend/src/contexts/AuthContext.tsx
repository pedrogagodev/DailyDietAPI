import { usersService } from "@/services/usersService";
import type { meResponse } from "@/services/usersService/me";
import { useQuery } from "@tanstack/react-query";
import { createContext, useCallback, useEffect, useState } from "react";

interface AuthContextValue {
  isSignedIn: boolean;
  signin: (token: string) => void;
  signout: () => void;
  data: meResponse | undefined;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(() => {
    const storedToken = localStorage.getItem("@DailyDiet:token");
    return !!storedToken;
  });

  const { isError, data, isSuccess } = useQuery({
    queryKey: ["me"],
    queryFn: () => usersService.me(),
    enabled: isSignedIn,
  });

  const signin = useCallback((token: string) => {
    localStorage.setItem("@DailyDiet:token", token);

    setIsSignedIn(true);
  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem("@DailyDiet:token");
    setIsSignedIn(false);
  }, []);

  useEffect(() => {
    if (isError) {
      signout();
    }
  }, [isError, signout]);

  return (
    <AuthContext.Provider
      value={{
        isSignedIn: isSignedIn && isSuccess,
        signin,
        signout,
        data,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
