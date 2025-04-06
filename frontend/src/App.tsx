import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router";
import { Router } from "./Router";

import { AuthProvider } from "./contexts/AuthContext";
import { queryClient } from "./services/query-client";

export function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Toaster />
          <Router />
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
