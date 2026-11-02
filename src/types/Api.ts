export type User = {
  id: string;
  username: string;
  email: string;
  fullName?: string;
  bio?: string;
  avatar?: string;
  isVerified: boolean;
  role: "user" | "admin";
  createdAt: string;
};

export type AuthResponse = {
  user: User;
  token: string;
};