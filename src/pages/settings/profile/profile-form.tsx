import { z } from 'zod'
import { Link } from 'react-router-dom'
import { useFieldArray, useForm } from 'react-hook-form'
import { Button } from '@/components/custom/button'
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

import React, { useState } from 'react'
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
} from 'tw-elements-react'

function WideModal() {
  const [showModal, setShowModal] = useState(false)

  return (
    <div>
      {/* Button to trigger the modal */}

      <Button
        onClick={(event) => {
          event.preventDefault()
          setShowModal(!showModal)
        }}
      >
        {!showModal ? 'Change location' : 'Close'}
      </Button>

      <p> </p>
      {/* Modal */}
      {showModal && (
        <div>
          <FormField
            name='firstName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>name</FormLabel>
                <FormControl>
                  <Input
                    className='mt-[2%]'
                    style={{ marginBottom: '17px' }}
                    placeholder='bole'
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <MapContainer
            center={[9.019363454825323, 38.802153782900255]}
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
          </MapContainer>
        </div>
      )}
    </div>
  )
}

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

// "firstName" : "kebede",
//     "lastName" : "basdfeso",
//     "phoneNumber" : "0956148732",
//     "password" : "passowrd",
//     "location" : {
//         "name" : "Main" ,
//         "coords" : {
//             "latitude"  : 8.194781321106052  ,
//             "longitude"   : 38.81276362247961
//         }
//     }
