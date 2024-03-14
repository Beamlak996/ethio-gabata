"use client";

import { deletePackage } from "@/actions/delete-package";
import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import { Edit, Info, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

type PackageActionsProps = {
  id: string;
};

export const PackageActions = ({ id }: PackageActionsProps) => {
  const userRole = useCurrentRole()

  const [open, setOpen] = useState(false);

  const [editOpen, setEditOpen] = useState(false);

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const onConfirm = async () => {
    startTransition(() => {
      deletePackage(id).then((data) => {
        if (data.success) {
          setOpen(false);
          router.refresh();
        }
      });
    });
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={isPending}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {userRole === UserRole.ADMIN ? (
            <>
              <DropdownMenuItem
                onClick={() => router.push(`/admin/packages/${id}`)}
              >
                <Edit className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpen(true)}>
                <Trash className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </>
          ) : (
            <DropdownMenuItem>
              <Info className="mr-2 h-4 w-4" />
              Info
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
