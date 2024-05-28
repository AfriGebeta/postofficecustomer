import React, { useState, HTMLAttributes } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { IconCalendar } from "@tabler/icons-react";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useForm } from "react-hook-form";
import qr from "../../../assets/qr.svg";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
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
import { Label } from "@/components/ui/label";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  phone: z
    .string()
    .min(1, { message: "Please enter a phone" })
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
  const [trackingNumber, setTrackingNumber] = useState(
    "1Z9R5W90P22" + Math.floor(Math.random() * 100000)
  );
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string>("");
  const { user } = useAuth();

  const setSendTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  const sendSms = async (phoneNumber: string, message: string) => await axios.post(import.meta.env.VITE_API_URL + `/sendsms`, {
    //@ts-ignore
    YOUR_RECIPIENT: phoneNumber,
    MESSAGE: message
}).then((response) => {
  console.log(response)
  if(response.data.acknowledge === 'success'){
    toast({
      title: 'Message sent!',
      description: 'A message has been sent to the recipient.',
    })
  } else {
    toast({
      title: 'Message failed to send',
      description: `'The message failed to send.': ${response.data}`,
    })
  }}).catch((error) => {
    console.error(error)
    toast({
      title: 'Message failed to send',
      description: `'The message failed to send.': ${error.message}`,
    })
    });

  const sendNotification = async (
    trackingNumber: string,
    packageId: string,
    status: string
  ) =>
    await axios
      .post(import.meta.env.VITE_API_URL + `/notification/send-notification`, {
        //@ts-ignore
        id: driver.id,
        title: `a package has been sent`,
        body: {
          packageId: packageId,
          status: status,
          message: `a package has been sent: tracking number ${trackingNumber}`,
        },
      })
      .then((response) => {
        console.log(response);

        toast({
          title: "Notification sent",
          description: "The notification has been sent successfully.",
        });
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: "Notification failed to send",
          description: `'The message failed to send.': ${error.message}`,
        });
      });

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

  const [recipientName, setRecipientName] = useState("");

  const [open, setOpen] = useState(false);

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

        console.log("user", user);

        if (!filter.length) {
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
          setRecipientName(`${data.firstName} ${data.lastName}`);
          form.reset();
          sendSms(data.phone, `Hello ${data.firstName} ${data.lastName}, you have a package with tracking number ${trackingNumber}.`);
          user && sendSms(user?.phone, `Hello ${user?.firstName} ${user?.lastName}, you have sent a package with tracking number ${trackingNumber}.`);
          sendNotification(trackingNumber.toString(), result.data.id, "sent");
          toast({
            title: "Package sent successfully!",
            description: "You have successfully sent the package.",
          });
          setOpen(true); //TODO: test this
        } else {
          setIsLoading(false);
          form.reset();
          toast({
            title: "Failed to send package!",
            description: `failed with error ${result.data}`,
          });
        }
      } else {
        console.log(res.data, "1");
        setIsLoading(false);
        form.reset();
        toast({
          title: "Failed to send package!",
          description: `failed with error ${res.data}`,
        });
      }
    } catch (err: any) {
      setIsLoading(false);
      form.reset();
      toast({
        title: "Failed to send package!",
        description: `failed with error ${err.message}`,
      });
    }
  }

  const printQRCodeToPDF = () => {
    const qrElement = document.getElementById("qr-code");
    if (qrElement) {
      html2canvas(qrElement).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage({
          imageData: imgData,
          format: "PNG",
          x: 0,
          y: 40,
          width: 200,
          height: 150,
        });
        html2canvas(document.getElementById("post-logo") as HTMLElement).then(
          (post) => {
        const postOffiicLogo = post.toDataURL("image/png");
        pdf.addImage({
          imageData: postOffiicLogo,
          format: "PNG",
          x: 0,
          y: 0,
          width: 50,
          height: 50,
        });

      });
        // and some text like from and to
        pdf.addImage({
          imageData: imgData,
          format: "PNG",
          x: 0,
          y: 40,
          width: 200,
          height: 150,
        });
        pdf.text(`From: You`, 10, 10);
        pdf.text(`To: ${recipientName}`, 10, 20);
        pdf.text(`Tracking Number: ${trackingNumber}`, 50, 200);
        pdf.save("qr-code.pdf");
      });
    }
  };

  return (
    <div className={cn("grid gap-6 p-5", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="space-y-1 flex flex-row gap-5 items-center justify-start">
                  <FormLabel>Phone No.</FormLabel>
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
                <FormItem className="space-y-1 flex flex-row gap-5 items-center justify-between w-[50%]">
                  <div className="flex items-center justify-between">
                    <FormLabel className="w-[4vw]">Type</FormLabel>
                  </div>
                  <FormControl>
                    <Input placeholder="Type" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="space-y-1 flex flex-row gap-5 items-center justify-between w-[50%]">
                  <div className="flex items-center justify-between">
                    <FormLabel className="w-[4vw]">First Name</FormLabel>
                  </div>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="space-y-1 flex flex-row gap-5 items-center justify-between w-[50%]">
                  <div className="flex items-center justify-between">
                    <FormLabel className="w-[4vw]">Last Name</FormLabel>
                  </div>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="space-y-1 flex flex-row gap-5 items-center justify-between w-[50%]">
                  <div className="flex items-center justify-between">
                    <FormLabel className="w-[4vw]">City</FormLabel>
                  </div>
                  <FormControl>
                    <Input placeholder="Addis Ababa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="killo"
              render={({ field }) => (
                <FormItem className="space-y-1 flex flex-row gap-5 items-center justify-between w-[50%]">
                  <div className="flex items-center justify-between">
                    <FormLabel className="w-[4vw]">Weight(kg)</FormLabel>
                  </div>
                  <FormControl>
                    <Input placeholder="2kg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="space-y-1 flex flex-row gap-5 items-center justify-between w-[50%]">
                  <div className="flex items-center justify-between">
                    <FormLabel className="w-[4vw]">Item Description</FormLabel>
                  </div>
                  <FormControl>
                    <Input placeholder="Description..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-row gap-5 items-center justify-start">
              <Label className="w-[4vw]">Send date</Label>
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
                  <Input
                    onChange={setSendTime}
                    aria-label="Choose time"
                    className="w-full"
                    id="time"
                    type="time"
                  />
                </div>
              </div>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              {/* <DialogTrigger asChild> */}
              <div className="flex flex-row justify-center">
                <Button type="submit" className="mt-10 w-[60%]" loading={isLoading}>
                  Send
                </Button>
              </div>
              {/* </DialogTrigger> */}
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Package Sent</DialogTitle>
                  <DialogDescription>
                    Your package is queued and ready to be sent. Your tracking number is{" "}
                    <em className="font-bold">{trackingNumber}</em>. Please scan the
                    QR code to complete the transaction with Telebirr.
                  </DialogDescription>
                </DialogHeader>
                <div id="qr-code" className="flex flex-row justify-center items-center">
                  <img src={qr} alt="qr" className="w-40 h-40" />
                </div>
                <div className="flex flex-row justify-center mt-4">
                  <Button onClick={printQRCodeToPDF}>Download QR Code as PDF</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </form>
      </Form>
    </div>
  );
}
