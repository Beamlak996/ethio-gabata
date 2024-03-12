import { getAllInvitedUsers } from "@/data/user";
import { currentUser } from "@/lib/auths";
import { redirect } from "next/navigation";
import { UsersColumns, columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

const NetworkPage = async () => {
  const user = await currentUser();

  if (!user?.id) {
    return redirect("/");
  }

  const users = await getAllInvitedUsers(user.id);

  // @ts-ignore
  const formattedUsers: UsersColumns[] = users?.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  }));

  return (
    <div className="p-6" >
      <DataTable data={formattedUsers} columns={columns} />
    </div>
  );
};

export default NetworkPage;
