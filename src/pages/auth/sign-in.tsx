import { UserAuthForm } from './components/user-auth-form'
import postOfficeLogo from '../../assets/post_logo.png'

export default function SignIn() {
  return (
    <>
      <div className='container relative grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0'>
        <div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
          <div className='absolute inset-0 bg-zinc-900' />
          <div className='relative z-20 flex items-center text-lg font-medium'>
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

          <img
            src={postOfficeLogo}
            className='relative m-auto'
            width={301}
            height={60}
            alt='post'
            style={{ borderRadius: '50%' }}
          />

          <div className='relative z-20 mt-auto'>
            <blockquote className='space-y-2'>
              <p className='text-xl font-bold'>Post for everyone!</p>
              {/* <footer className='text-sm'>Sofia Davis</footer> */}
            </blockquote>
          </div>
        </div>
        <div className='lg:p-8'>
          <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]'>
            <div className='flex flex-col space-y-2 text-left'>
              <h1 className='text-2xl font-semibold tracking-tight'>Login</h1>
              <p className='text-sm text-muted-foreground'>
                Enter your phone number and password below <br />
                to log into your account
              </p>
            </div>
            <UserAuthForm />
            <p className='px-8 text-center text-sm text-muted-foreground'>
              No account yet?{' '}
              <a
                href='/sign-up'
                className='underline underline-offset-4 hover:text-primary'
              >
                Sign up
              </a>
              .
            </p>
            <p className='px-8 text-center text-sm text-muted-foreground'>
              By clicking login, you agree to our{' '}
              <a
                href='/terms'
                className='underline underline-offset-4 hover:text-primary'
              >
                Terms of Service
              </a>{' '}
              and{' '}
              <a
                href='/privacy'
                className='underline underline-offset-4 hover:text-primary'
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
