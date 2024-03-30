import { Outlet } from 'react-router-dom'
import Sidebar from './sidebar'
import useIsCollapsed from '@/hooks/use-is-collapsed'
import { useAuth } from '@/hooks/authProvider'
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

export default function AppShell() {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed()
  const { user } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    console.log('User:', user, "useEffect triggered")
    if(user){
      console.log('User is logged in:', user)
    }else{
      console.log('User is not logged in')
      // navigate('/sign-in')
    }
  }
  , [user])
  return (
    <div className='relative h-full overflow-hidden bg-background'>
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        id='content'
        className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${isCollapsed ? 'md:ml-14' : 'md:ml-64'} h-full`}
      >
        <Outlet />
      </main>
    </div>
  )
}
