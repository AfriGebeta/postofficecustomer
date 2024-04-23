import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
// import { tasks } from './data/tasks'
import { useAuth } from '@/hooks/authProvider'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Task } from './data/schema'

type filters = "mine" | "toMe" | "all"

export default function Tasks({filter: filters = "all"}) {
  const { user } = useAuth()
  const [ tasks, setTasks ] = useState<Task[]>([])
  const handleTaskFetch = async () => {
    let ftechtasks = await axios(import.meta.env.VITE_API_URL + '/package').then(res => {
      return res.data as Task[]
    }).catch(err => {
      console.error(err)
      return []
    });
    
    console.log(ftechtasks, "from tasks======", user?.id);
    ftechtasks.forEach(task => {
      task.trackingNumber = "1Z9R5W90P22" + Math.floor(Math.random() * 100000).toString()
    });
    if(filters === "mine") ftechtasks = ftechtasks.filter(task => task.sentFromId === user?.id)
      else if(filters === "toMe") ftechtasks = ftechtasks.filter(task => task.sentToId === user?.id)
    setTasks(ftechtasks)
  }

  useEffect(() => {
    handleTaskFetch()
  }, [])
  const availableTasks = tasks.filter((task) => (task.status === 'waiting' || task.status === 'en-route') || task.driverAssigned === undefined)
  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <LayoutHeader>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </LayoutHeader>

      <LayoutBody className='flex flex-col' fixedHeight>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Welcome back! {user?.firstName}</h2>
            <p className='text-muted-foreground'>
              Here&apos;s a list of actions that have to be done.
            </p>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={availableTasks} columns={columns} />
        </div>
      </LayoutBody>
    </Layout>
  )
}
