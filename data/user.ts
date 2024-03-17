import { db } from "@/lib/db";
import { User, UserRole } from "@prisma/client";

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
    const invitedUsers = await getAllInvitedUsers(id);
    return invitedUsers?.length;
  } catch (error) {
    return null;
  }
};

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
    const users = await getAllInvitedUsers(id);
    const totalPaidUsers = users?.reduce(
      (tot, user) => tot + (user.isPaid ? 1 : 0 || 0),
      0
    );
    return totalPaidUsers;
  } catch (error) {
    return null;
  }
};



async function getUsersByReferrer(
  referrerId: string,
  usersMap: Record<string, User[]>,
  users: User[]
) {
  const invitedUsers = await db.user.findMany({
    where: {
      referalId: referrerId,
    },
  });

  for (const user of invitedUsers) {
    if (!usersMap[referrerId]) {
      usersMap[referrerId] = [];
    }
    usersMap[referrerId].push(user);

    await getUsersByReferrer(user.id, usersMap, users); // Pass usersMap recursively
  }
}

export const getAllInvitedPaidUsers = async (id: string) => {
  try {
    const usersMap: Record<string, User[]> = {};

    await getUsersByReferrer(id, usersMap, []);
    return usersMap;
  } catch (error) {
    console.error(error);
    return null;
  }
};



