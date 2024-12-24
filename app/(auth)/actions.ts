"use server";

import { z } from "zod";
import { createUser, getUser } from "@/lib/db/queries";
import { signIn } from "./auth";

const authLogInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(10),
});

const authRegisterFormSchema = z.object({
  email: z.string().email(),
  username: z.string().min(6),
  password: z.string().min(10),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
});

export interface LoginActionState {
  status: "idle" | "success" | "failed" | "in_progress" | "invalid_data";
}

export const login = async (
  _: LoginActionState,
  formData: FormData
): Promise<LoginActionState> => {
  try {
    const validatedData = authLogInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", {
      email: validatedData.email,
      password: validatedData.password,
      redirect: false,
    });

    return { status: "success" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: "invalid_data" };
    }

    return { status: "failed" };
  }
};

export interface RegisterActionState {
  status:
    | "idle"
    | "success"
    | "failed"
    | "invalid_data"
    | "user_exists"
    | "in_progress";
}

export const register = async (
  _: RegisterActionState,
  formData: FormData
): Promise<RegisterActionState> => {
  try {
    const { email, username, password, first_name, last_name } =
      authRegisterFormSchema.parse({
        email: formData.get("email"),
        username: formData.get("username"),
        password: formData.get("password"),
        first_name: formData.get("first_name"),
        last_name: formData.get("last_name"),
        //created_at & last_login timestamps are already being generated for us
      });

    const [user] = await getUser(email);

    if (user) return { status: "user_exists" };

    await createUser(
      email,
      password,
      username,
      first_name ? first_name : "",
      last_name ? last_name : ""
    );
    await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });
    return { status: "success" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: "invalid_data" };
    }

    return { status: "failed" };
  }
};
