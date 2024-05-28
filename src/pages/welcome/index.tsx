import React, { SVGProps, useEffect, useState } from 'react'
import { IconCross, IconPlanet, IconX } from '@tabler/icons-react'
import postOfficeLogo from '../../assets/ethio_post_logo.svg'
import { Layout, LayoutHeader } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { TopNav } from '@/components/top-nav'
import { UserNav } from '@/components/user-nav'
import { Search } from '@/components/search'

const WelcomePage: React.FC = () => {
  const [tracking, setTracking] = useState<Task | null>(null)

  const resetTracking = () => {
    setTracking(null)
  }
  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <LayoutHeader>
        {/* <Search /> */}
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </LayoutHeader>
    <div >
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
        <Search setTracking={setTracking}/>

        {tracking && <TrackingComponent task={tracking} resetTracking={resetTracking} />}

      </div>
    </div>
    </Layout>
  )
}

export default WelcomePage



/**
 * v0 by Vercel.
 * @see https://v0.dev/t/apLxKyfxmnN
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import { JSX } from 'react/jsx-runtime';
import { statuses } from '@/pages/tasks/data/data';
import { Task } from '../tasks/data/schema'
import { Button } from '@/components/custom/button'
 function TrackingComponent({task, resetTracking}: {task: Task, resetTracking: () => void}) {
  const currentStatus = statuses.find(status => status.value.toLowerCase() === task.status.toLowerCase());

  const [estimatedTime, setEstimatedTime] = useState('');

  useEffect(() => {
    // Generate a random estimated time between 1 and 5 hours
    const hours = Math.floor(Math.random() * 5) + 1;
    const minutes = Math.floor(Math.random() * 60);
    setEstimatedTime(`${hours}h ${minutes}m`);
  }, []);

  return (
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
          <div className='flex flex-row justify-between'>
          <h2 className="text-lg font-medium mb-4">Package Tracking</h2>
          <Button
              className="rounded-full w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              size="icon"
              variant="ghost"
              onClick={resetTracking}
            >
              <IconX />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <div className="relative before:absolute before:inset-x-0 before:h-[2px] before:bg-gray-300 dark:before:bg-gray-600 before:top-1/2 before:-translate-y-1/2">
            <div className="flex justify-between">
              {statuses.map(status => (
                <div key={status.value} className="flex flex-col items-center cursor-pointer">
                  <div
                    className={`rounded-full w-8 h-8 flex items-center justify-center text-white ${
                      status.value.toLowerCase() === task.status.toLowerCase() ? `bg-black-100` : 'bg-grey-400'
                    }`}
                  >
                    <status.icon className={`w-5 h-5 `} color={status.value.toLowerCase() === task.status.toLowerCase() ? status.color : "lightgray"}/>
                  </div>
                  <span className="text-sm font-medium mt-2">{status.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mt-6">
          <h2 className="text-lg font-medium mb-4">Package Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 dark:text-gray-400 mb-1">Tracking Number</p>
              <p className="font-medium">{task.trackingNumber}</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 mb-1">Status</p>
              <p className="font-medium">{currentStatus?.value}</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 mb-1">{currentStatus !== statuses[3] ? "Estimated Time" : "Total Time Taken"}</p>
              <p className="font-medium">{estimatedTime}</p>
            </div>
          </div>
        </div>
      </div>
  );
}

function BuildingIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  )
}


function CheckIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}


function PackageIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  )
}


function SearchIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}


function UserIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}