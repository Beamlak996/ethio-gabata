import { currentRole } from "@/lib/auths";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { DataTable } from "../_components/data-table";
import { getAllUsers } from "@/data/user";
import { UsersColumns, columns } from "../_components/columns";

const TotalUsersPage = async () => {
  const userRole = await currentRole();

  if (userRole === UserRole.USER) {
    redirect("/dashboard");
  }

  const users = await getAllUsers();

  // @ts-ignore
  const formattedUsers: UsersColumns[]  = users?.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  })); 

  return (
    <div className="p-6" >
      <DataTable data={formattedUsers} columns={columns} />
    </div>
  );
};

export default TotalUsersPage;
