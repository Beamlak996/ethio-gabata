import { Heading } from "@/components/heading"
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UserInfo } from "@/components/user-info";
import { getUserById } from "@/data/user";
import { currentRole } from "@/lib/auths";
import { db } from "@/lib/db";
import { Edit } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

interface UserIdPageProps {
  params: {
    userId: string;
  };
};

const UserIdPage = async ({params}: UserIdPageProps) => {
  const userRole = await currentRole()

  const currentUser = await db.user.findUnique({
    where: {
        id: params.userId
    }
  })

  if(!currentUser) {
    return redirect('/')
  }


  const user = await getUserById(currentUser.id)


  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        
        <Heading
          title="Profile"
          description="This is how others will see you on the site."
        />
        {userRole !== "ADMIN" && (
          <Link href={`/user/${params.userId}/settings`}>
            <Button className="">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </Link>
        )}
      </div>

      <Separator className="mt-4 mb-6" />
      <div className="flex items-center justify-center h-full">
        <UserInfo user={user} />
      </div>
    </div>
  );
}

export default UserIdPage