"use server"

import { getUserById } from "@/data/user"
import { db } from "@/lib/db"

export const withdrawRequest = async (id: string) => {
    const existingUser = await getUserById(id)

    if(!existingUser) return { error: "No such user!" }

    if(!existingUser.isPaid) return { error: "Please pay for a package first!" }

    if((existingUser.commission || 0) <= 0) return { error: "You have no commission!" }

    await db.user.update({
        where: { id: existingUser.id },
        data: {
            withdraw: true
        }
    })

    return { success: "Withdraw request has been sent!" }
}