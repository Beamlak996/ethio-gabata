import { currentRole, currentUser } from "@/lib/auths";
import { DataCard } from "../_components/data-card";
import { UserRole } from "@prisma/client";
import { getAllInvitedUsers, getInvitedPaidUsers, getTotalPaidUsers } from "@/data/user";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { getTotalCommisionOwed } from "@/data/package";
import HeroImage from "../../../public/ethio-gabata.jpg";
import Image from "next/image";
import { EthioGabata } from "../_components/ethio-gabata-info-card";


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
    <div className="p-6  bg-slate-50">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
        <EthioGabata />
        <Image src={HeroImage} alt="" className="rounded-md" />
      </div>
      {/* <Chart data={graphData} /> */}
    </div>
  );
};

export default DashboardPage;
