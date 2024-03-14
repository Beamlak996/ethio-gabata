import { Heading } from "@/components/heading";
import { PackagesList } from "@/components/packages-list";
import { Separator } from "@/components/ui/separator";

const PackagesPage = () => {
  return (
    <div className="p-6">
      <Heading title="Packages" description="Here are all the avaliable packages." />
      <Separator className="mt-4 mb-6" />
      <PackagesList />
    </div>
  );
}

export default PackagesPage