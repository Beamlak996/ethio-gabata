import { Heading } from "@/components/heading"
import { Separator } from "@/components/ui/separator";
import { UserInfo } from "@/components/user-info";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface UserIdPageProps {
  params: {
    userId: string;
  };
};

const UserIdPage = async ({params}: UserIdPageProps) => {
  const currentUser = await db.user.findUnique({
    where: {
        id: params.userId
    }
  })

  if(!currentUser) {
    return redirect('/')
  }



  return (
    <div>
      <Heading
        title="Profile"
        description="This is how others will see you on the site."
      />
      <Separator className="mt-4 mb-6" />
      <div className="flex items-center justify-center h-full" >
          <UserInfo user={currentUser} />
      </div>
    </div>
  );
}

export default UserIdPage