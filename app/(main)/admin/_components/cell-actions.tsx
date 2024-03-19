"use client"

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UsersColumns } from "./columns";
import { FileBarChart, FolderTree, ListCollapse, MoreHorizontal, Trash } from "lucide-react";
import Link from "next/link";
import { useDeleteModal } from "@/hooks/use-delete-user-modal";

type CellActionProps = {
    data: UsersColumns
}

export const CellAction: React.FC<CellActionProps> = ({data}) => {
    const { open } = useDeleteModal()

    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-4 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="flex flex-col w-full px-0"
          >
            <Link href={`/admin/users/${data.id}`}>
              <DropdownMenuItem>
                <ListCollapse className="h-4 w-4 mr-2" />
                Details
              </DropdownMenuItem>
            </Link>
            <Link href={`/admin/users/${data.id}/change-status`}>
              <DropdownMenuItem>
                <FileBarChart className="h-4 w-4 mr-2" />
                Change Status
              </DropdownMenuItem>
            </Link>
            <Link href={`/admin/family/${data.id}`}>
              <DropdownMenuItem>
                <FolderTree className="h-4 w-4 mr-2" />
                Family Tree
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem>
              <div className="flex flex-row" onClick={() => open(data.id)}>
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
};
