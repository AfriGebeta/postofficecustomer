import React from 'react'
import { IconPlanet } from '@tabler/icons-react'
import postOfficeLogo from '../../assets/ethio_post_logo.svg'

const WelcomePage: React.FC = () => {
  return (
    <div className='h-svh'>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        <img
          src={postOfficeLogo}
          alt='VirtualPo'
          className='mr-2'
          style={{ height: '170px', width: '170px' }}
        />
        <h1 className='text-4xl font-bold leading-tight'>Welcome back</h1>
        <p className='text-center text-muted-foreground'>
          Welcome back to your virtual PO Box! We're delighted to see you again
          and ready to assist with all your mailing needs. <br />
        </p>
      </div>
    </div>
  )
}

export default WelcomePage
