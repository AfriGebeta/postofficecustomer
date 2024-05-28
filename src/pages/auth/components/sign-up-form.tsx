import React, { useState, HTMLAttributes, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconBrandFacebook, IconBrandGithub } from '@tabler/icons-react';
import axios from 'axios';
import { z } from 'zod';
import { MapContainer, TileLayer, Marker, useMapEvents, Popup, useMap } from 'react-leaflet';
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

export function SignUpForm({ className, ...props }: SignUpFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const navigate = useNavigate();
  const { register } = useAuth();

  const [branchLocations, setBranchLocations] = useState<{name: string, location: {lat: number, lng: number}}[]>([]);
const getBranches = async () => {
  try {
    const res = await axios.get('https://postoffice.gebeta.app/branch');
    console.log(res.data);
    res.data.forEach((branch: any) => {
      const newBranches = branchLocations;
      newBranches.push({name: branch.name, location: {lat: branch.location.latitude, lng: branch.location.longitude}});
      console.log({newBranches});
      setBranchLocations(newBranches);
    });
  } catch (error) {
    console.error(error);
  }
};

function CurrentLocationButton() {
  const map = useMap();

  const handleClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latlng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        map.setView(latlng, 13); // Adjust zoom level as needed
        L.marker(latlng, { icon }).addTo(map);
        setLocation(latlng);
      }, (error) => {
        console.error(error);
        toast({
          title: 'Geolocation Error',
          description: 'Unable to retrieve your location.',
        });
      });
    } else {
      toast({
        title: 'Geolocation Not Supported',
        description: 'Your browser does not support geolocation.',
      });
    }
  };

  useEffect(() => {
    const control = new L.Control({ position: 'bottomright' });

    control.onAdd = () => {
      const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
      const button = L.DomUtil.create('button', '', div);
      button.innerHTML = 'Use Current Location';
      button.style.backgroundColor = 'white';
      button.style.border = '2px solid rgba(0,0,0,0.2)';
      button.style.cursor = 'pointer';
      button.style.padding = '5px';
      button.onclick = handleClick;
      return div;
    };

    control.addTo(map);

    return () => {
      control.remove();
    };
  }, [map]);

  return null;
}

function LocationMarker({ setLocation }: { setLocation: (location: { lat: number; lng: number }) => void }) {
  useMapEvents({
    click(e) {
      setLocation(e.latlng);
    },
  });
  return null;
}

useEffect(() => {
  getBranches();
}, []);

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
                {
                  branchLocations.map((branch, index) => (
                    <Marker key={index} position={branch.location} icon={icon}>
                      <Popup className='flex flex-row justify-between gap-3'>
                        <p>{branch.name}</p>
                        <Button
                          onClick={() => {
                            setLocation(branch.location);
                          }} className='mt-2' loading={isLoading}>Select</Button>
                      </Popup>
                    </Marker>
                  ))
                }
                <CurrentLocationButton />
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
