import { z } from 'zod'
import { Link } from 'react-router-dom'
import { useFieldArray, useForm } from 'react-hook-form'
import { Button } from '@/components/custom/button'
import {useMap} from "react-leaflet"
import { IconButton } from '@chakra-ui/react';
import { FaMapMarker } from 'react-icons/fa';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { PasswordInput } from '@/components/custom/password-input'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css' // Import Leaflet CSS
import { FaCrosshairs } from 'react-icons/fa';
const profileFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  password: z.string(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  firstName: '',
  lastName: '',

  phone: '',
  password: '',
}



import React, { useState , useEffect} from 'react'
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
} from 'tw-elements-react'
import { IconPhone } from '@tabler/icons-react'

 interface RecenterButtonProps {
  newLocation: any;
 }
 const RecenterButton = ({ newLocation } : RecenterButtonProps) => {
  const map = useMap();
 
  const recenterMap = () => {
     map.setView(newLocation, map.getZoom());
  };
 
  return (
    //  <button
    //    style={{ position: 'absolute', bottom: '20px', right: '10px', zIndex: 1000 }}
    //    onClick={recenterMap}
    //  >
    //    Recenter Map
    //  </button>

<IconButton
aria-label="Recenter Map"
icon={<FaCrosshairs size="2em" />} // Adjust the size as needed
onClick={recenterMap}
position="absolute"
bottom="20px"
right="10px"
zIndex={1000}
/>
  );
 };


function WideModal() {
  const [showModal, setShowModal] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<any>([9.019363454825323, 38.802153782900255]);

  // Function to handle the user's current position
  const showPosition = (position: any) => {
     setCurrentLocation([position.coords.latitude, position.coords.longitude]);
  };
 
  useEffect(() => {
     if (showModal) {
       navigator.geolocation.getCurrentPosition(showPosition);
     }
  }, [showModal]);

 
  return (
     <div>
       {/* Button to trigger the modal */}
       <Button
         onClick={(event) => {
           event.preventDefault();
           setShowModal(!showModal);
         }}
       >
         {!showModal ? 'Change location' : 'Close'}
       </Button>
 
       <p> </p>
       {/* Modal */}
       {showModal && (
         <div>
           {/* Form and other components */}
           <MapContainer
             center={currentLocation}
             zoom={13}
             style={{ height: '400px', width: '100%' }}
           >
             <TileLayer
               url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
               attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
             />
             <Marker position={[51.505, -0.09]}>
               <Popup>
                 A pretty CSS3 popup. <br /> Easily customizable.
               </Popup>
             </Marker>
 
             {currentLocation && (
               <Marker position={currentLocation}>
                 <Popup>You are here</Popup>
               </Marker>
             )}
             {currentLocation && (
               <RecenterAutomatically lat={currentLocation[0]} lng={currentLocation[1]} />
             )}
          
          
            <RecenterButton newLocation={currentLocation} />
           </MapContainer>
         </div>
       )}
     </div>
  );
 }



type RecenterAutomaticallyProps = {
  lat: number;
  lng: number;
 };

// Component to recenter the map automatically
const RecenterAutomatically = ({ lat, lng }:RecenterAutomaticallyProps) => {
  const map = useMap();
  useEffect(() => {
     map.setView([lat, lng]);
  }, [lat, lng]);
  return null;
 };
 

 
export default function ProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  })

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='firstName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>first name</FormLabel>
              <FormControl>
                <Input placeholder='first name' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='lastName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>last name</FormLabel>
              <FormControl>
                <Input placeholder='last name' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='phone'
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
              <div className='flex items-center justify-between'>
                <FormLabel>Password</FormLabel>
                <Link
                  to='/forgot-password'
                  className='text-sm font-medium text-muted-foreground hover:opacity-75'
                >
                  Forgot password?
                </Link>
              </div>
              <FormControl>
                <PasswordInput placeholder='********' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <WideModal />

        <Button type='submit'>Update profile</Button>
      </form>
    </Form>
  )
}


