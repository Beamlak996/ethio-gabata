import { db } from "@/lib/db";
import { getAllUsers } from "./user";


export const getAvailablePackages = async () => {
  try {
    const packages = await db.package.findMany()
    return packages;
  } catch (error) {
    return null;
  }
};


export const getTotalCommisionOwed = async () => {
  try {
    const users = await getAllUsers()
    const totalCommission = users?.reduce(
      (tot, user) => tot + (user?.commission || 0),
      0
    );
    
    return totalCommission
  } catch (error) {
    return null
  }
}

export const getTotalPaidUsers = async () => {
  try {
    const users = await getAllUsers();
    const totalPaidUsers = users?.reduce((tot, user) => tot + (user.isPaid ? 1 : 0 || 0), 0)
    return totalPaidUsers
  } catch (error) {
    return null
  }
}