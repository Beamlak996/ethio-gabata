"use client"

import * as z from "zod"

import { Package, User } from "@prisma/client"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { payCommission } from "@/actions/pay-commison"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"

type CommissionFromProps = {
    user: any
}

export const CommissionFromSchema = z.object({
    commission: z.coerce.number()
})

export const CommissionFrom = ({user}: CommissionFromProps) => {
const [error, setError] = useState<string | undefined>("")
const [success, setSuccess] = useState<string | undefined>("")

const [isEditing, setIsEditing] = useState(false);

const [isPending, startTransition] = useTransition();

const toggleEdit = () => setIsEditing((current) => !current);

const router = useRouter();

const form = useForm<z.infer<typeof CommissionFromSchema>>({
  resolver: zodResolver(CommissionFromSchema),
  defaultValues: {
    commission: user.commission || 0
  },
});

const onSubmit = (values: z.infer<typeof CommissionFromSchema>) => {
    setError("")
    setSuccess("")
    startTransition(()=> {
        payCommission(values, user.id).then((data)=> {
          setError(data.error)
          if(data.success) {
            setIsEditing(false)
            router.refresh()
          }
        })
    })
}

    return (
      <div className="mt-6 border bg-slate-100 rounded-md p-4">
        <div className="font-medium flex items-center justify-between">
          Commission
          <Button onClick={toggleEdit} variant="ghost">
            {isEditing ? (
              <>Cancel</>
            ) : (
              <>
                <Pencil className="h-4 w-4 mr-2" />
                Pay Commission
              </>
            )}
          </Button>
        </div>
        {!isEditing && (
          <p
            className={cn(
              "text-sm mt-2",
              user.commission !== 0 && "text-slate-500 italic"
            )}
          >
            {user.commission !== 0 ? `${user.commission} Birr is not paid` : "Fully Paid"}
          </p>
        )}
        {isEditing && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="commission"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unpaid Commission</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder={"0"}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormError message={error} />
              <Button type="submit" variant="success" disabled={isPending} >
                Pay
              </Button>
            </form>
          </Form>
        )}
      </div>
    );
}