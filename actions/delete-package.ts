"use server"
import { currentRole } from "@/lib/auths";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";

export const deletePackage = async (id: string) => {
  const userRole = await currentRole();

  if (userRole !== UserRole.ADMIN) {
    return { error: "Only admins can create packages!" };
  }

  const existingPackage = await db.package.findUnique({
    where: {
        id
    }
  })

  if(!existingPackage) return { error: "No such package!" }

  await db.package.delete({
    where: { id }
  })

  return { success: "Package deleted" }
};
