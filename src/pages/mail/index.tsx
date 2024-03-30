import { Card } from '@/components/ui/card'
import { UserAuthForm } from './components/user-auth-form'
import postOfficeLogo from '../../assets/ethio_post_logo.svg'

export default function Mail() {
  return (
    <>
      <div className='container grid h-svh flex-col items-center justify-center bg-primary-foreground lg:max-w-none lg:px-0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8'>
          <div className='mb-4 flex items-center justify-center'>
            <h1 className='text-xl font-medium'>VirtualPo</h1>
          </div>

          <div className='flex flex-col space-y-2 text-left'>
            <p className='text-sm text-muted-foreground'>
              Fill the form below <br />
              to send package
            </p>
          </div>
          <UserAuthForm />
        </div>
      </div>
    </>
  )
}
