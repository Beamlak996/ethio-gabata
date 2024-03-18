"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  MoreHorizontal,
  ListCollapse,
  FileBarChart,
  FolderTree,
  Trash,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AlertModal } from "@/components/modal/alert-modal";
import { useState, useTransition } from "react";
import { deleteUser } from "@/actions/delete";
import { useRouter } from "next/navigation";

export type UsersColumns = {
  id: string;
  name: string;
  email: string;
  isPaid: boolean;
};

export const columns: ColumnDef<UsersColumns>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "isPaid",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const isPaid = row.getValue("isPaid")

      return (
        <Badge
          className={cn(
            ""
          )}
        >
          {isPaid ? "Paid" : "Free"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const { id } = row.original;

      const [open, setOpen] = useState(false)
      const [isPending, startTransition] = useTransition();

      const router = useRouter()

      const onConfirm = async () => {
        startTransition(()=> {
          deleteUser(id).then(()=> {
            setOpen(false)
            router.refresh()
          })
        })
      }

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
              <Button variant="ghost" className="h-4 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="flex flex-col w-full px-0"
            >
              <Link href={`/admin/users/${id}`}>
                <DropdownMenuItem>
                  <ListCollapse className="h-4 w-4 mr-2" />
                  Details
                </DropdownMenuItem>
              </Link>
              <Link href={`/admin/users/${id}/change-status`}>
                <DropdownMenuItem>
                  <FileBarChart className="h-4 w-4 mr-2" />
                  Change Status
                </DropdownMenuItem>
              </Link>
              <Link href={`/admin/family/${id}`}>
                <DropdownMenuItem>
                  <FolderTree className="h-4 w-4 mr-2" />
                  Family Tree
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem>
                <div className="flex flex-row" onClick={() => setOpen(true)}>
                  <Trash className="h-4 w-4 mr-2" />
                  Delete
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
