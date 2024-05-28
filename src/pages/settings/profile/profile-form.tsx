import { z } from 'zod'
import { Link } from 'react-router-dom'
import { useFieldArray, useForm } from 'react-hook-form'
import { Button } from '@/components/custom/button'
import {useMap, useMapEvents} from "react-leaflet"
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
import L from 'leaflet'
import axios from 'axios'

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


function WideModal({location: location, setLocation}: {location: any, setLocation: any}) {
  const [showModal, setShowModal] = useState(false);
  const defaultLocation = { lat: 9.145, lng: 40.4897 }; // Ethiopia's coordinates
  const [currentLocation, setCurrentLocation] = useState<any>([9.019363454825323, 38.802153782900255]);

  // Function to handle the user's current position
  const showPosition = (position: any) => {
     setCurrentLocation([position.coords.latitude, position.coords.longitude]);
  };
  const icon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

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
                     }} className='mt-2' >Select</Button>
                 </Popup>
               </Marker>
             ))
           }
           <CurrentLocationButton />
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

  const [location, setLocation] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  })

  function onSubmit(data: ProfileFormValues) {
    setLoading(true);
    setTimeout(() => {
      setLoading(false)
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
      })
    }, 2000)
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
        <WideModal setLocation={setLocation} location={location}/>

        <Button loading={loading} type='submit'>Update profile</Button>
      </form>
    </Form>
  )
}


