"use server";
import * as z from "zod";
import { AuthError } from "next-auth";

import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";


export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, password } = validatedFields.data;

  const existingUser = await db.user.findUnique({
    where: {
      name
    }
  });

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Invalid credentials!" };
  }

  if(existingUser.role !== "ADMIN" && !existingUser.isPaid) return { error: "Please pay for a package!" }


  try {
    await signIn("credentials", {
      name,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};
