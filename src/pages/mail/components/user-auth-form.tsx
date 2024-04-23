import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar"
import { IconCalendar, IconClock } from "@tabler/icons-react";
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { HTMLAttributes, useState } from "react";
import { useForm } from "react-hook-form";
import qr from "../../../assets/qr.svg";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "@/components/ui/use-toast";
// import { IconBrandFacebook, IconBrandGithub } from '@tabler/icons-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/custom/button";
import { PasswordInput } from "@/components/custom/password-input";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/authProvider";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { Label } from "@/components/ui/label";

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> { }

const formSchema = z.object({
  phone: z
    .string()
    .min(1, { message: "Please enter  phone" })
    .min(9, { message: "Phone number is not valid" })
    .max(9, { message: "Phone number is not valid" }),
  type: z.string(),
  killo: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  city: z.string(),
  description: z.string(),
});

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState(Math.floor(Math.random() * 100000));
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [time , setTime] = React.useState<string>("")
  const { user } = useAuth();

  const setSendTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value)
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      type: "",
      killo: "",
      firstName: "",
      lastName: "",
      city: "",
      description: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const res = await axios.get(import.meta.env.VITE_API_URL + "/profile");

      if (res.data) {
        const filter = res.data.filter((user: any) => {
          if (user.phoneNumber.toString() === data.phone) {
            return user;
          }
        });

        console.log("user", user)

        if(!filter.length) {
          setIsLoading(false);
          toast({
            title: "Failed to send package!",
            description: `No user found with phone number ${data.phone}`,
          });
          return;
        }

        const result = await axios.post(
          import.meta.env.VITE_API_URL + "/package",
          {
            location_history: {},
            specification: {
              description: data.description,
              killo: data.killo,
              type: data.type,
              city: data.city,
              firstName: data.firstName,
              lastName: data.lastName,
              trackingNumber: trackingNumber,
              time: time.toString(),
              date: date?.toString(),
            },
            type: data.type,
            fragile: false,
            sentFromId: user?.id,
            sentToId: filter[0].id,
          }
        );

        if (result.data) {
          setIsLoading(false);
          toast({
            title: "Package sent successfully!",
            description: "You have successfully sent the package.",
          });
        } else {
          setIsLoading(false);
          toast({
            title: "Failed to send package!",
            description: `failed with error ${result.data}`,
          });
        }
      } else {
        console.log(res.data, "1");
        setIsLoading(false);
        toast({
          title: "Failed to send package!",
          description: `failed with error ${res.data}`,
        });
      }
    } catch (err: any) {
      setIsLoading(false);
      toast({
        title: "Failed to send package!",
        description: `failed with error ${err.message}`,
      });
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>recipient phone number</FormLabel>
                  <FormControl>
                    <div className="flex items-center">
                      <p className="p-2 text-sm text-gray-400">+251</p>{" "}
                      <Input placeholder="- - -  - -  - -  - -" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <div className="flex items-center justify-between">
                    <FormLabel>type</FormLabel>
                  </div>
                  <FormControl>
                    <Input placeholder="type" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <div className="flex items-center justify-between">
                    <FormLabel>recipient firstName</FormLabel>
                  </div>
                  <FormControl>
                    <Input placeholder="firstName" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <div className="flex items-center justify-between">
                    <FormLabel>recipient lastName</FormLabel>
                  </div>
                  <FormControl>
                    <Input placeholder="lastName" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <div className="flex items-center justify-between">
                    <FormLabel>recipient city</FormLabel>
                  </div>
                  <FormControl>
                    <Input placeholder="city" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="killo"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <div className="flex items-center justify-between">
                    <FormLabel>killo</FormLabel>
                  </div>
                  <FormControl>
                    <Input placeholder="type" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <div className="flex items-center justify-between">
                    <FormLabel>item description</FormLabel>
                  </div>
                  <FormControl>
                    <Input placeholder="description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-row gap-2 items-center justify-start">
              <Label>Send date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <IconCalendar className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              
                  <div className="flex items-center space-x-2">
                    <div className="grid w-full items-center gap-1.5">
                      <Input onChange={setSendTime} aria-label="Choose time" className="w-full" id="time" type="time" />
                    </div>
                  </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button type="submit" className="mt-2" loading={isLoading}>
                  Send
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Your package is queued and ready to be sent. Your tracking number is <em className="font-bold text-black">{trackingNumber}</em> . Please scan the
                    QR code to complete the transaction with Telebirr.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-row justify-center items-center">
                  <img src={qr} alt="qr" className="w-40 h-40" />
                </div>
                {/* <DialogFooter>
                  <Button className="mt-2" loading={isLoading}>
                    close
                  </Button>
                </DialogFooter> */}
              </DialogContent>
            </Dialog>
          </div>
        </form>
      </Form>
    </div>
  );
}
