import { Heading } from "@/components/heading"
import { StatusUserInfo } from "@/components/status-user-info";
import { Separator } from "@/components/ui/separator";
import { currentRole } from "@/lib/auths";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";



type UserIdPageProps = {
    params: {
        userId: string
    }
}

 
const UserIdPage = async ({params}: UserIdPageProps) => {
  const userRole = await currentRole()

  if(userRole !== UserRole.ADMIN) return redirect('/')

  const currentUser = await db.user.findUnique({
    where: {
      id: params.userId,
    },
  });

  if (!currentUser) {
    return redirect("/");
  }


  return (
    <div className="p-6">
      <Heading
        title="Profile"
        description="You can see user detail from here."
      />
      <Separator className="mt-4 mb-6" />
      <div className="flex items-center justify-center h-full">
        <StatusUserInfo user={currentUser} />
      </div>
    </div>
  );
}

export default UserIdPage