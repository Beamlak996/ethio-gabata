"use client"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { EditPackageSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Package } from "@prisma/client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { editPackage } from "@/actions/edit-package"


type EditPackageFormProps = {
    item?: Package
}

export const EditPackageForm = ({item}: EditPackageFormProps) => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const [isPending, startTransition] = useTransition();

    const router = useRouter()

    const form = useForm<z.infer<typeof EditPackageSchema>>({
      resolver: zodResolver(EditPackageSchema),
      defaultValues: {
        id: item?.id,
        title: item?.title,
        description: item?.description,
        price: item?.price,
        commission: item?.commission || 0,
      },
    });

    const id = item?.id || ""

    const onSubmit = (values: z.infer<typeof EditPackageSchema>) => {
        setError("")
        setSuccess("")

        startTransition(()=> {
            editPackage(values, id)
        })
        router.refresh()
    } 

    return (
      <div className="md:w-[800px] sm:w-[600px] w-[300px]">
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
                      <Input {...field} placeholder="Basic" disabled={isPending} />
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
                        {...field}
                        placeholder="This package is good for buisness."
                        disabled={isPending}
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
                        {...field}
                        type="number"
                        placeholder="2000"
                        disabled={isPending}
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
                        {...field}
                        placeholder="500"
                        type="number"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <div className="w-full flex items-center justify-end gap-4 ml-auto" >
                    <Button variant="secondary" onClick={()=>router.back()} disabled={isPending} >
                        Back
                    </Button>
                    <Button variant="success" type="submit" disabled={isPending} >
                        Save
                    </Button>
            </div>
          </form>
        </Form>
      </div>
    );
}