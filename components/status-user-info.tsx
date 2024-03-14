"use client"

import { getTotalInvitedUsers } from "@/data/user";
import { Badge } from "./ui/badge";



export const StatusUserInfo =  ({ user, items }: any) => {
  const totalInvitedUsers = getTotalInvitedUsers(user.id);

  const onClick = () => {
    console.log("click")
  }

  return (
    <div className="flex flex-col w-[85%] gap-4">
      <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
        <p className="text-sm font-medium">Name</p>
        <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
          {user?.name}
        </p>
      </div>
      <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
        <p className="text-sm font-medium">Total users invited</p>
        <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
          {totalInvitedUsers}
        </p>
      </div>
      <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
        <p className="text-sm font-medium">Email</p>
        <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
          {user?.email}
        </p>
      </div>
      <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
        <p className="text-sm font-medium">Role</p>
        <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
          {user?.role}
        </p>
      </div>

      <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
        <p className="text-sm font-medium">Paid Status</p>
        <Badge variant={user?.paid ? "success" : "destructive"}>
          {user?.paid ? "Paid" : "Free"}
        </Badge>
      </div>
    </div>
  );
};
