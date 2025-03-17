export interface User {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role: "ADMIN" | "USER";
  createdAt: Date;
  updatedAt: Date;
}
