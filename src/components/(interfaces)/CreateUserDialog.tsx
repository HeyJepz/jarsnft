"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Button as NextButton } from "@nextui-org/react";
import { Input } from "@/components/ui/input";
import { useLogout, useUser } from "@thirdweb-dev/react";
import { Spinner } from "@nextui-org/react";
import Link from "next/link";

// Zod Validation Form
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Profile } from "@/types/users";
import { cn } from "@/lib/utils";
import { jars } from "@/lib/core/api";
import updateUser from "@/app/actions/updateUser";
import createProfile from "@/app/actions/createProfile";

const formCreateUserSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Name is too short",
    })
    .max(50, {
      message: "Name is too long",
    }),
  email: z.string().email(),
});

type UserProfile = {
  user: Profile;
  isLoggedIn: boolean;
  isLoading: boolean;
};

export default function CreateUserDialog({
  isOpenCreate,
}: {
  isOpenCreate: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(isOpenCreate);
  const {
    user,
    isLoggedIn,
    isLoading: sessionLoading,
  } = useUser() as UserProfile;
  // Logout/Disconnect the wallet
  const { logout, isLoading } = useLogout();

  // Define the form with zod schema.
  const form = useForm<z.infer<typeof formCreateUserSchema>>({
    resolver: zodResolver(formCreateUserSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  async function handleUpdateUser(
    values: z.infer<typeof formCreateUserSchema>,
  ) {
    if (isLoggedIn) {
      const updatedUser = updateUser(user.address, {
        name: values.name,
        email: values.email,
      });
      const createUserProfile = createProfile(user.address);
      await Promise.all([updatedUser, createUserProfile]);
      setDialogOpen(false);
    }
    setLoading(false);
  }

  // Define the form submit handler function
  async function onSubmit(values: z.infer<typeof formCreateUserSchema>) {
    setLoading(true);
    await handleUpdateUser(values);
  }

  return (
    <Dialog open={dialogOpen}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="alan_turing@gmail.com" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                </FormItem>
              )}
            />

            <DialogFooter>
              <div className="flex w-full flex-col items-center justify-center gap-3">
                <NextButton
                  type="submit"
                  disabled={loading}
                  isLoading={loading}
                  spinner={<Spinner />}
                  className={cn(
                    loading ? "cursor-not-allowed" : "cursor-pointer",
                  )}
                >
                  {!loading && "Create"}
                </NextButton>
                <Button variant="link" onClick={() => logout()}>
                  {isLoading ? <Spinner /> : "Logout"}
                </Button>
                <Link
                  href="/insights/setup-wallet"
                  className="text-left text-sm hover:text-fuchsia-600"
                  target="_blank"
                >
                  New to wallet?
                </Link>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
