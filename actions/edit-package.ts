"use server"

import * as z from "zod"

import { currentRole } from "@/lib/auths";
import { UserRole } from "@prisma/client";
import { EditPackageSchema } from "@/schemas";
import { db } from "@/lib/db";

export const editPackage = async (values: z.infer<typeof EditPackageSchema>, id: string) => {
    const userRole = await currentRole();

    if (userRole !== UserRole.ADMIN)
      return { error: "Only admins can create packages" };

    const validatedFields = EditPackageSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }

    const { title, description, price, commission } = validatedFields.data;

    console.log(id)

    const existingPackage = await db.package.findUnique({
        where: { id }
    })

    if (!existingPackage) {
      return { error: "No such package!" };
    }

    await db.package.update({
        where: { id: existingPackage.id },
        data: { 
            title: title,
            description: description,
            price: price,
            commission: commission
         }
    })

    return { success: "Package updated!" }
}