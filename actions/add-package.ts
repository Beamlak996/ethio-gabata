"use server"

import * as z from "zod"

import { currentRole } from "@/lib/auths"
import { UserRole } from "@prisma/client"
import { AddPackageSchema } from "@/schemas"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export const addPackage = async (values: z.infer<typeof AddPackageSchema>) => {
    const userRole = await currentRole()

    if(userRole !== UserRole.ADMIN) return { error: "Only admins can create packages" }

    const validatedFields = AddPackageSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }

    const { title, description, price, commission } = validatedFields.data

    // const existingPackage = await db.package.findMany({
    //     where: {
    //         title
    //     }
    // })

    // if(existingPackage) return { error: "Package with name already exists!" }

    await db.package.create({
        data: {
            title,
            description,
            price,
            commission
        }
    })

    revalidatePath(`/admin/packages`);

    return { success: "Package added!" }
}