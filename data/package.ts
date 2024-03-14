import { db } from "@/lib/db";


export const getAvailablePackages = async () => {
  try {
    const packages = await db.package.findMany()
    return packages;
  } catch (error) {
    return null;
  }
};
