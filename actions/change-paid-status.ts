"use server";

import { ChangePaidStatusSchema } from "@/app/(main)/admin/users/_components/paid-status-form";
import { getUserById } from "@/data/user";
import { currentRole } from "@/lib/auths";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import * as z from "zod";

export const changePaidStatus = async (
  values: z.infer<typeof ChangePaidStatusSchema>,
  id: string
) => {
  const userRole = await currentRole();

  if (userRole !== UserRole.ADMIN) {
    return { error: "Only admins can create packages!" };
  }

  // console.log(values.id)
  const user = await getUserById(id);

  if (!user) return { error: "No such user!" };



  await db.purchase.create({
    data: {
      userId: id,
      packageId: values.id,
    },
  });

  await db.user.update({
    where: { id: user.id },
    data: { isPaid: true, packageId: values.id },
  });


  if (user.referalId) {
    const iUser = await db.user.findFirst({
      where: {
        id: user.referalId,
      },
    });

    console.log(iUser?.name)

    const item = await db.package.findUnique({
      where: { id: values.id },
    });

    if (iUser) {
      await db.user.update({
        where: { id: iUser.id },
        data: {
          commission: (iUser?.commission || 0) + (item?.commission || 0),
        },
      });
    }
  }

  return { success: "Package Paid!" };
};
