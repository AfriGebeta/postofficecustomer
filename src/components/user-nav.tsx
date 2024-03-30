import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/custom/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/hooks/authProvider'
import { IconLoader2, IconLogout } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { toast } from '@/components/ui/use-toast'

export function UserNav() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    toast({
      title: 'Logging you out...',
      description: (<div className='flex items-start gap-4'><p>Please wait...</p><IconLoader2 className='mr-2 h-4 w-4 animate-spin' /></div>),
      duration: 3000,
    })
    setTimeout(() => {
      // handle logout
      logout().then(() => {
        console.log('Logged out')
        navigate('/sign-in')
      }).catch((error) => {
        console.log('Error logging out:', error)
        toast({
          title: 'Failed to login!',
          description: 'Please check your phone number and password and try again.',
        })
      })
    }, 3000)
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-8 w-8 border-2'>
            <AvatarImage src={`https://api.dicebear.com/8.x/lorelei/svg?seed=${user?.firstName}`} alt='@VirtualPO' />
            <AvatarFallback>{user?.firstName[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>dummy</p>
            <p className='text-xs leading-none text-muted-foreground'>
              dummydev@gmail.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>New Team</DropdownMenuItem>
        </DropdownMenuGroup> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          Log out
          <DropdownMenuShortcut> <IconLogout size={16} color='red' /></DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
