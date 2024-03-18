import { currentRole, currentUser } from "@/lib/auths";
import { Chart } from "../_components/charts";
import { DataCard } from "../_components/data-card";
import { UserRole } from "@prisma/client";
import {getAllInvitedPaidUsers, getAllInvitedUsers, getInvitedPaidUsers, getTotalPaidUsers } from "@/data/user";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { getTotalCommisionOwed } from "@/data/package";


const graphData = [
  { name: "Jan", total: 0 },
  { name: "Feb", total: 0 },
  { name: "Mar", total: 4 },
  { name: "Apr", total: 0 },
  { name: "May", total: 0 },
  { name: "Jun", total: 0 },
  { name: "Jul", total: 0 },
  { name: "Aug", total: 0 },
  { name: "Sep", total: 0 },
  { name: "Oct", total: 0 },
  { name: "Nov", total: 0 },
  { name: "Dec", total: 0 },
];

const DashboardPage = async () => {
  const userRole = await currentRole();
  const user = await currentUser();
  let userNumber = 0;



  if (!user || !user.id) {
    return redirect("/");
  }

  if (userRole == UserRole.ADMIN) {
    userNumber = await db.user.count();
  } else {
    const invitedUsers = await getAllInvitedUsers(user?.id);
    //  @ts-ignore
    userNumber = invitedUsers?.length;
  }

  const totalCommission = await getTotalCommisionOwed();
  const adminTotalPaidUsers = await getTotalPaidUsers()
  const userTotalPaidUsers = await getInvitedPaidUsers(user.id)


  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <DataCard
          label={`${
            userRole === UserRole.ADMIN ? "Total Users" : "Total Invited Users"
          }`}
          value={userNumber}
        />

        {/* Piad Users */}
        {userRole === UserRole.ADMIN && (
          <DataCard label="Total Paid Users" value={adminTotalPaidUsers || 0} />
        )}
        {userRole === UserRole.USER && (
          <DataCard label="Total Paid Users" value={userTotalPaidUsers || 0} />
        )}

        {/* Commission */}
        {userRole === UserRole.USER && (
          <DataCard label="Total Commission" value={user.commission} />
        )}
        {userRole === UserRole.ADMIN && (
          <DataCard
            label="Total Commission Owed"
            value={totalCommission || 0}
          />
        )}
      </div>
      <Chart data={graphData} />
    </div>
  );
};

export default DashboardPage;
