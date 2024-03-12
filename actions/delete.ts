import { getUserById } from "@/data/user";
import { currentRole } from "@/lib/auths";
import { db } from "@/lib/db";

export const deleteUser = async (id: string) => {
    const admin = await currentRole();

    if (admin !== "ADMIN") {
      return { error: "Only an admin can change roles!" };
    }

    const existingUser = await getUserById(id);

    if (!existingUser) {
      return { error: "No such user!" };
    }

    await db.user.delete({
        where: { id }
    })

    return { success: "User Deleted!" }
}