"use client"
import * as z from "zod"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginSchema } from "@/schemas"

import { CardWrapper } from "./card-wrapper"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { FormError } from "../form-error"

export const LoginForm = () => {
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    }) 

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        console.log(values)
    }

    return (
        <CardWrapper
          headerLabel="Welcome back"
          backButtonLabel="Don't have an account?"
          backButtonHref="/auth/register"
          showSocial
        >
            <Form {...form} >
                <form 
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                    <div className="space-y-4" >
                        <FormField 
                          control={form.control}
                          name="email"
                          render={({field})=> (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input 
                                      {...field}
                                      placeholder="dawit.tsegaye@gmail.com"
                                      type="email"
                                    />
                                </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField 
                          control={form.control}
                          name="password"
                          render={({field})=> (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input 
                                      {...field}
                                      placeholder="******"
                                      type="password"
                                    />
                                </FormControl>
                            </FormItem>
                          )}
                        />
                    </div>
                    <FormError />
                    <Button
                      type="submit"
                      className="w-full"
                      variant="success"
                    >
                        Login
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}