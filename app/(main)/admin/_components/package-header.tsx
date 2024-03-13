"use client"
import { Heading } from "@/components/heading";
import { AddPackageModal } from "@/components/modal/add-package-modal";
import { Button } from "@/components/ui/button";
// import usePackageModal from "@/hooks/use-package-modal";
import { Plus } from "lucide-react";


export const PackageHeader = () => {
    // const packageModal = usePackageModal();

    return (
      <div className="flex flex-row justify-between items-center">
        <Heading
          title="Packages"
          description="You can view, add and edit packages from here."
        />
        <AddPackageModal>
          <Button variant="success">
            <Plus className="h-4 w-4 mr-2" />
            Add Packages
          </Button>
        </AddPackageModal>
      </div>
    );
}