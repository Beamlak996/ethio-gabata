import { currentRole, currentUser } from "@/lib/auths";
import { Chart } from "../_components/charts";
import { DataCard } from "../_components/data-card";
import { UserRole } from "@prisma/client";
import { getAllUsers } from "@/data/user";
import { db } from "@/lib/db";


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
  const userRole = await  currentRole()
  let userNumber = 0

  if(userRole == UserRole.ADMIN) {
    userNumber = await db.user.count()
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DataCard label="Total Users" value={userNumber} />
        <DataCard label="Total Paid Users" value={0} />
      </div>
      <Chart data={graphData}/>
    </div>
  );
}

export default DashboardPage