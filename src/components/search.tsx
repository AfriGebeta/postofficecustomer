import { Input } from '@/components/ui/input'
import { Task } from '@/pages/tasks/data/schema';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem} from '@/components/ui/dropdown-menu';
import axios from 'axios';
import { SVGProps, useEffect, useMemo, useState } from 'react';
import { Button } from './custom/button';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  StopwatchIcon,
} from '@radix-ui/react-icons'
import { useAuth } from '@/hooks/authProvider';
import { color } from 'framer-motion';

export function Search({setTracking}: {setTracking: React.Dispatch<React.SetStateAction<Task | null>>}) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const getUserById = useMemo(() => async (id: string) => {
    const user = await axios(import.meta.env.VITE_API_URL + '/profile?id=' + id).then(res => {
      return res.data
    }).catch(err => {
      console.error(err)
      return null
    })
    return user
  }, []);

  const statuses = [
    {
      value: 'withuser',
      label: 'withuser',
      icon: StopwatchIcon,
      color: 'blue',
    },
    {
      value: 'pickedup',
      label: 'Picked up',
      icon: CircleIcon,
      color: 'grey'
    },
    {
      value: 'station',
      label: 'Station',
      icon: CrossCircledIcon,
      color: 'red'
    },
    {
      value: 'delivered',
      label: 'Delivered',
      icon: CheckCircledIcon,
      color: 'green'
    },
  ]

  const handleTaskFetch = async () => {
    setLoading(true)
    const ftechtasks = await axios(import.meta.env.VITE_API_URL + '/package').then(res => {
      return res.data as Task[]
    }).catch(err => {
      console.error(err)

      setLoading(false)
      return []
    });

    const newTasks = ftechtasks.map(async task => {
      task.trackingNumber = "1Z9R5W90P22" + Math.floor(Math.random() * 100000).toString()
      // fetch the from and to names for each task by id

      const [from, to] = await Promise.all([
        getUserById(task.sentFromId),
        getUserById(task.sentToId)
      ])

      if (!from || !to) {
        console.log("from or to is null")
        setLoading(false)
        return task
      }

      return {
        ...task,
        sentFromId: from.firstName + " " + from.lastName,
        sentToId: to.firstName + " " + to.lastName
      }
    });
    Promise.all(newTasks).then(setTasks)
    setLoading(false)
  }

  const StatusIcon = ({ status }: { status: string }) => {
    const statusObj = statuses.find(s => s.value === status)
    if (!statusObj) {
      return null
    }
    const Icon = statusObj.icon
    return <Icon className={`h-4 w-4 text-muted-foreground`} color={statusObj.color}/>
  }

  const handleSearch = (e: any) => {
    setFilter(e.target.value)
  }

  useEffect(() => {
    handleTaskFetch()
  }, [])

  const { user } = useAuth()
  return (
    <div>
      <DropdownMenu modal={false}>
        <div className='flex flex-row gap-4 o'>
          <Input
            type='search'
            placeholder='Search...'
            className='md:w-[100px] lg:w-[300px]'
            onChange={handleSearch}
            value={filter}
          />
          <DropdownMenuTrigger>
            <Button>Track</Button>
          </DropdownMenuTrigger>
        </div>
        {/* <div className='flex flex-col items-center'> */}
        <DropdownMenuContent className='md:w-[60svw] w-[100vw] h-[60vh] md:h-fit' sideOffset={10} align='center'>
          {
            loading ? <DropdownMenuItem><p>Loading...</p> </DropdownMenuItem> :
              tasks.filter(t => {
                return t.trackingNumber.includes(filter) && (t.sentFromId.includes(user?.firstName + "") || t.sentToId.includes(user?.firstName + ""))
              }).map((task) => (
                <div>
                  <DropdownMenuItem key={task.trackingNumber} className='flex items-center justify-between' onClick={() => setTracking(task)}>
                    <div className='flex items-center'>
                      <div className='flex flex-row justify-evenly items-center gap-10'>
                        <p className='text-xs text-muted-foreground'>{task.trackingNumber}</p>
                        <p className='text-sm'>From: {task.sentFromId}</p>
                        <p className='text-sm'>To: {task.sentToId}</p>
                        <div className='flex flex-row justify-center gap-2'>
                          <StatusIcon status={task.status} />
                          <p className='text-sm'>{task.status}</p>
                          </div>
                      </div>
                    </div>
                  </DropdownMenuItem>
                  {/* <p>me: {user?.firstName}{ user?.lastName} from:{task.sentFromId} to:{task.sentToId}</p> */}
                </div>
              ))}
              {
                tasks.filter(t => {
                  return t.trackingNumber.includes(filter)
                }).length === 0 && <DropdownMenuItem><p>No results found</p></DropdownMenuItem>
              }
        </DropdownMenuContent>
        {/* </div> */}
        
      </DropdownMenu>
    </div>
  )
}