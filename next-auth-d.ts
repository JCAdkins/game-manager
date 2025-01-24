import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    role: string; // Add the role field to the User interface
  }

  interface Session {
    user: User;
  }
}
