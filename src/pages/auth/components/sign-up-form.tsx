import React, { useState, HTMLAttributes } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconBrandFacebook, IconBrandGithub } from '@tabler/icons-react';
import axios from 'axios';
import { z } from 'zod';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/custom/button';
import { PasswordInput } from '@/components/custom/password-input';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/authProvider';

interface SignUpFormProps extends HTMLAttributes<HTMLDivElement> {}

const formSchema = z
  .object({
    firstName: z.string().min(1, { message: 'Please enter your first name' }),
    lastName: z.string().min(1, { message: 'Please enter your last name' }),
    phoneNumber: z.string().min(1, { message: 'Please enter phone' }),
    password: z
      .string()
      .min(1, {
        message: 'Please enter your password',
      })
      .min(3, {
        message: 'Password must be at least 3 characters long',
      }),
    confirmPassword: z.string(),
    location: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword'],
  });

const defaultLocation = { lat: 9.145, lng: 40.4897 }; // Ethiopia's coordinates

const icon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function LocationMarker({ setLocation }: { setLocation: (location: { lat: number; lng: number }) => void }) {
  useMapEvents({
    click(e) {
      setLocation(e.latlng);
    },
  });
  return null;
}

export function SignUpForm({ className, ...props }: SignUpFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const navigate = useNavigate();
  const { register } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      phoneNumber: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      location: defaultLocation,
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);

    if (location) {
      data.location = location;
    }

    console.log(data);

    register(data)
      .then((res: any) => {
        console.log(res);
        setIsLoading(false);
        toast({
          title: 'Signed up successfully!',
          description: 'You have successfully signed up to your account.',
        });
        navigate('/');
      })
      .catch((err: { message: any }) => {
        setIsLoading(false);
        toast({
          title: 'Failed to sign up!',
          description: `Failed with error ${err.message}`,
        });
      });
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Abebe' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Kebede' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='phoneNumber'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <div className='flex items-center'>
                      <p className='p-2 text-sm text-gray-400'>+251</p>{' '}
                      <Input placeholder='- - -  - -  - -  - -' {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='space-y-1'>
              <FormLabel>Select Location</FormLabel>
              <MapContainer
                center={defaultLocation}
                zoom={6}
                style={{ height: '300px', width: '100%' }}
              >
                <TileLayer
                  url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {location && <Marker position={location} icon={icon} />}
                <LocationMarker setLocation={setLocation} />
              </MapContainer>
            </div>

            <Button className='mt-2' loading={isLoading}>
              Create Account
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
