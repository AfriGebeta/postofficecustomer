import { Card } from '@/components/ui/card'
import { ForgotForm } from './components/forgot-form'
import { Link } from 'react-router-dom'

import postOfficeLogo from '../../assets/post_logo.png'

export default function ForgotPassword() {
  return (
    <>
      <div className='container grid h-svh flex-col items-center justify-center bg-primary-foreground lg:max-w-none lg:px-0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8'>
          <div className='mb-4 flex items-center justify-center'>
            <img
              src={postOfficeLogo}
              alt='VirtualPo'
              className='mr-2 h-16 w-16'
              style={{ borderRadius: '50%' }}
            />
            <div className='flex flex-col p-2'>
              <p> EthioPost</p>
              <p>
                Virtual{' '}
                <span
                  style={{
                    color: '#FFA818',
                  }}
                >
                  {' '}
                  {` PO`}
                </span>
                box
              </p>
            </div>
          </div>
          <Card className='p-6'>
            <div className='mb-2 flex flex-col space-y-2 text-left'>
              <h1 className='text-md font-semibold tracking-tight'>
                Forgot Password
              </h1>
              <p className='text-sm text-muted-foreground'>
                Enter your registered phone number and <br /> we will send you a
                link to reset your password.
              </p>
            </div>
            <ForgotForm />
            <p className='mt-4 px-8 text-center text-sm text-muted-foreground'>
              Did you remember your details?{' '}
              <Link to='/sign-in'>
                Return to{' '}
                <span className='underline underline-offset-4 hover:text-primary'>
                  sign in
                </span>
              </Link>
            </p>
          </Card>
        </div>
      </div>
    </>
  )
}
