"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { v4 as uuidV4 } from "uuid";

import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";

export const addUser = async (
  values: z.infer<typeof RegisterSchema>,
  token: string
) => {
  const validatedFields = RegisterSchema.safeParse(values);


  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, email, password, fullName, address, phoneNumber, bankAccount } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  const inviteCode = uuidV4();

  const referral = await db.user.findUnique({
    where: {
      inviteCode: token,
    },
  }); 

  if(!referral || !referral.id) return { error: "Something went wrong!" }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      inviteCode,
      referalId: referral?.id,
      fullName,
      address,
      phoneNumber,
      bankAccount,
    },
  });

  return { success: "User add successfully!" }
};
