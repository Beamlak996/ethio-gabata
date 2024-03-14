"use server";

import { CommissionFromSchema } from "@/app/(main)/admin/users/_components/commision-form";
import { getUserById } from "@/data/user";
import { currentRole } from "@/lib/auths";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";
import * as z from "zod";

export const payCommission = async (
  values: z.infer<typeof CommissionFromSchema>,
  id: string
) => {
  const userRole = await currentRole();

  if (userRole !== UserRole.ADMIN) {
    return { error: "Only admins can pay commissions" };
  }

  const user = await getUserById(id)

  if(!user) return { error: "No such user!" }

  if((user.commission || 0) < values.commission)  return { error: "You are paying more than owed." }

  await db.user.update({
    where: { id: user.id },
    data: { commission: (user.commission || 0) - values.commission  }
  })

  return { success: "Commission paid!" }

};
