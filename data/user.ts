import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

export const getAllUsers = async () => {
  try {
    const users = await db.user.findMany({
      where: {
        role: UserRole.USER,
      },
    });
    return users;
  } catch (error) {
    return null;
  }
};

export const getAllInvitedUsers = async (id: string) => {
  try {
    const users = await db.user.findMany({
      where: {
        referalId: id,
      },
    });
    return users;
  } catch (error) {
    return null;
  }
};


export const getTotalInvitedUsers = async (id: string) => {
  try {
    const invitedUsers = await getAllInvitedUsers(id)
    return invitedUsers?.length
  } catch (error) {
    return null
  }
}  

export const getTotalPaidUsers = async () => {
  try {
    const users = await getAllUsers();
    const totalPaidUsers = users?.reduce(
      (tot, user) => tot + (user.isPaid ? 1 : 0 || 0),
      0
    );
    return totalPaidUsers;
  } catch (error) {
    return null;
  }
};

export const getInvitedPaidUsers = async (id: string) => {
  try {
    const users = await getAllInvitedUsers(id)
    const totalPaidUsers = users?.reduce(
      (tot, user) => tot + (user.isPaid ? 1 : 0 || 0),
      0
    );
    return totalPaidUsers;
  } catch (error) {
    return null
  }
} 