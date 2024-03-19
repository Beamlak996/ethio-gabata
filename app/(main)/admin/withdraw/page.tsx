import { getAllWithdrawRequestUsers } from "@/data/user"
import { currentRole } from "@/lib/auths"
import { redirect } from "next/navigation"
import { DataTable } from "./_components/data-table"
import { columns } from "./_components/columns"

const WithdrawPage = async () => {
  const userRole = await currentRole();

  if (userRole !== "ADMIN") return redirect("/");

  const users = await getAllWithdrawRequestUsers();

  // @ts-ignore
  const formattedUsers: UsersColumns[] = users?.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    isPaid: user.isPaid,
    commission: user.commission
  }));

  return (
    <div className="p-6">
      <DataTable data={formattedUsers} columns={columns} />
    </div>
  );
}

export default WithdrawPage