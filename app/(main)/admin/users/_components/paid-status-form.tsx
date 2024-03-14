"use client";

import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Package } from "@prisma/client";
import { Pencil } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { changePaidStatus } from "@/actions/change-paid-status";
import { useRouter } from "next/navigation";

type PaidStatusForm = {
  user: any;
  items: Package[] | null;
};

export const ChangePaidStatusSchema = z.object({
  id: z.string(),
});

export const PaidStatusForm = ({ user, items }: PaidStatusForm) => {
  const [isEditing, setIsEditing] = useState(false);

  const [isPending, startTransition] = useTransition();

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter()

  const form = useForm<z.infer<typeof ChangePaidStatusSchema>>({
    resolver: zodResolver(ChangePaidStatusSchema),
    defaultValues: {
      id: user.packageId || "",
    },
  });

  const onSubmit =  (values: z.infer<typeof ChangePaidStatusSchema>) => {
    startTransition(()=> {
        changePaidStatus(values, user.id).then((data)=> {
          if(data.success) {
            setIsEditing(false)
            router.refresh()
          }

        })
    });
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Change Paid Status
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit paid status
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2",
            !user.isPaid === false && "text-slate-500 italic"
          )}
        >
          {user.isPaid ? "Paid" : "Not Paid"}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <Select
                    disabled={isPending}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role"  />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {items?.map((item: Package) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <Button type="submit" variant="success" disabled={isPending} >
                Save
            </Button>            
          </form>
        </Form>
      )}
    </div>
  );
};
