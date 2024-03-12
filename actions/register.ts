"use server";
import * as z from "zod";
import bcrypt from "bcryptjs"
import { v4 as uuidV4 } from "uuid";
import { headers } from 'next/headers';

import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail-service";

export const register = async (values: z.infer<typeof RegisterSchema>, token: string | null) => {
  const validatedFields = RegisterSchema.safeParse(values);

  let referral = null

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, email, password } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByEmail(email)

  if(existingUser) {
    return { error: "Email already in use!" }
  }

  const inviteCode = uuidV4()

  if(token) {
    // @ts-ignore
    referral = await db.user.findUnique({
      where: {
        inviteCode: token
      }
    }) 
  }

  const newUser = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      inviteCode,
      referalId: referral?.id
    }
  })

  console.log(newUser)

  

  const verificationToken = await generateVerificationToken(email)

  await sendVerificationEmail(verificationToken.email, verificationToken.token)

  return { success: "Confirmation email sent!" };
};
