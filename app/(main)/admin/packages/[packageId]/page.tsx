import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import { EditPackageForm } from "../../_components/edit-package-form";
import { currentRole } from "@/lib/auths";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

type PackageIdPageProps = {
    params: {
        packageId: string
    }
}

const PackageIdPage = async ({params}: PackageIdPageProps) => {
  const userRole = await currentRole()

  if(userRole !== UserRole.ADMIN) return redirect("/")

  const item = await db.package.findUnique({
    where: {
        id: params.packageId
    }
  })

  if(!item) return 

  return (
    <div className="p-6" >
      <Heading title="Package" description="You can edit packages from here." />
      <Separator className="mt-4 mb-6" />
      <div className="flex justify-center items-center h-full" >
        <EditPackageForm item={item} />
      </div>
    </div>
  );
}

export default PackageIdPage