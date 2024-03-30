import { HTMLAttributes, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { toast } from '@/components/ui/use-toast'
// import { IconBrandFacebook, IconBrandGithub } from '@tabler/icons-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/custom/button'
import { PasswordInput } from '@/components/custom/password-input'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/authProvider'

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  phone: z
    .string()
    .min(1, { message: 'Please enter  phone' })
    .min(9, { message: 'Phone number is not valid' })
    .max(9, { message: 'Phone number is not valid' }),
  type: z.string(),
  killo: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  city: z.string(),
  description: z.string(),
})

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: '',
      type: '',
      killo: '',
      firstName: '',
      lastName: '',
      city: '',
      description: '',
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)
    console.log(data)

    setTimeout(() => {
      setIsLoading(false)
      // handle login
      //   login(data.phone, data.password)
      //     .then((user) => {
      //       console.log('Logged in')
      //       toast({
      //         title: 'Logged in successfully!',
      //         description: 'You have successfully logged in to your account.',
      //       })
      //       navigate('/')
      //     })
      //     .catch((e) => {
      //       console.error('Failed to login:', e)
      //       toast({
      //         title: 'Failed to login!',
      //         description:
      //           'Please check your phone number and password and try again.',
      //       })
      //     })
    }, 3000)
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>recipient phone number</FormLabel>
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
              name='type'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <div className='flex items-center justify-between'>
                    <FormLabel>type</FormLabel>
                  </div>
                  <FormControl>
                    <Input placeholder='type' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <div className='flex items-center justify-between'>
                    <FormLabel>recipient firstName</FormLabel>
                  </div>
                  <FormControl>
                    <Input placeholder='firstName' {...field} />
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
                  <div className='flex items-center justify-between'>
                    <FormLabel>recipient lastName</FormLabel>
                  </div>
                  <FormControl>
                    <Input placeholder='lastName' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='city'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <div className='flex items-center justify-between'>
                    <FormLabel>recipient city</FormLabel>
                  </div>
                  <FormControl>
                    <Input placeholder='city' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='killo'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <div className='flex items-center justify-between'>
                    <FormLabel>killo</FormLabel>
                  </div>
                  <FormControl>
                    <Input placeholder='type' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <div className='flex items-center justify-between'>
                    <FormLabel>item description</FormLabel>
                  </div>
                  <FormControl>
                    <Input placeholder='description' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className='mt-2' loading={isLoading}>
              Send
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
