import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/custom/button'
import { Layout, LayoutHeader } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'

export default function Unauthorized() {
  const navigate = useNavigate()
  return (
    <Layout>
      <LayoutHeader>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </LayoutHeader>
      <div className='h-svh'>
        <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
          <h1 className='text-[7rem] font-bold leading-tight'>403</h1>
          <span className='font-medium'>Oops! You shouldn't be here.</span>
          <p className='text-center text-muted-foreground'>
            Never should have come here <br />
            There is nothing for you here.
          </p>
          <div className='mt-6 flex gap-4'>
            <Button variant='outline' onClick={() => navigate(-1)}>
              Go Back
            </Button>
            <Button onClick={() => navigate('/')}>Back to Home</Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
