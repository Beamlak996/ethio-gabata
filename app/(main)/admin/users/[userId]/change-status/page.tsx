import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import { getAvailablePackages } from "@/data/package";
import { getUserById } from "@/data/user";
import { currentRole } from "@/lib/auths";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { PaidStatusForm } from "../../_components/paid-status-form";
import { CommissionFrom } from "../../_components/commision-form";

type ChangeStatusProps = {
    params: {
        userId: string
    }
}


const ChangeStatus = async ({params}: ChangeStatusProps) => {
  const userRole = await currentRole()

  if(userRole !== UserRole.ADMIN) return redirect('/')


  const packages = await getAvailablePackages()

  const user = await getUserById(params.userId as string) 

  return (
    <div className="p-6">
      <Heading
        title="Change status"
        description="You can see user detail and change user status from here."
      />
      <Separator className="mt-4 mb-6" />
      <div className="">
        <PaidStatusForm items={packages} user={user} />
        <CommissionFrom user={user} />
      </div>
    </div>
  );
}

export default ChangeStatus