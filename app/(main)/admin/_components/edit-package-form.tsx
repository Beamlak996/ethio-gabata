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


type EditPackageFormProps = {
    item?: Package
}

export const EditPackageForm = ({item}: EditPackageFormProps) => {
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

    return (
      <div className="md:w-[800px] sm:w-[600px] w-[300px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(() => {})} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Basic" />
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
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex items-center justify-end gap-4 ml-auto" >
                    <Button variant="secondary" >
                        Back
                    </Button>
                    <Button variant="success" >
                        Save
                    </Button>
            </div>
          </form>
        </Form>
      </div>
    );
}