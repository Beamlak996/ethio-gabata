"use client";

import * as z from "zod";
import { useState, useTransition } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useForm } from "react-hook-form";
import { AddPackageSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { addPackage } from "@/actions/add-package";
import { FormError } from "../form-error";
import { RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormSuccess } from "../form-success";
import usePackageModal from "@/hooks/use-package-modal";

export const AddPackageModal = ({children}: {children: React.ReactNode}) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const {isOpen, onClose} = usePackageModal()

  const [isPending, startTransition] = useTransition();

  const router = useRouter()


  const form = useForm<z.infer<typeof AddPackageSchema>>({
    resolver: zodResolver(AddPackageSchema),
    defaultValues: {
      title: "",
      description: "",
      price: undefined,
      commission: undefined,
    },
  });



  const onSubmit = async (values: z.infer<typeof AddPackageSchema>) => {
    setError("")
    setSuccess("")

    startTransition(()=> {
         addPackage(values).then((data)=> {
            setError(data.error)
            // if(success) {
            //     // setOpen()
            // }
        })
    })
    
  };

  

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-425px z-[50]" >
        <DialogHeader>
          <DialogTitle>Add Package</DialogTitle>
          <DialogDescription>
            You and add new packages from here.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        {...field}
                        placeholder="Basic"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isPending}
                        placeholder="This package is good for buisness"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        {...field}
                        type="number"
                        placeholder="2000"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="commission"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Commission</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        {...field}
                        placeholder="500"
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
              <Button
                type="submit"
                className="w-full"
                variant="success"
                disabled={isPending}

              >
                {isPending ? (
                  <RefreshCcw className="h-4 w-4 animate-spin" />
                ) : (
                  "Add"
                )}
              </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
