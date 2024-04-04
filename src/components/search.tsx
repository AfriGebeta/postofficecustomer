import { Input } from '@/components/ui/input'
import { Task } from '@/pages/tasks/data/schema';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuPortal, DropdownMenuRadioItem, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent } from '@/components/ui/dropdown-menu';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { Button } from './custom/button';
import { useNavigate } from 'react-router-dom';

export function Search() {
  const navigate = useNavigate()
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

  const handleSearch = (e: any) => {
    setFilter(e.target.value)
  }

  useEffect(() => {
    handleTaskFetch()
  }, [])

  return (
    <div>
      <DropdownMenu modal={false}>
        <div className='flex flex-row gap-4'>
          <Input
            type='search'
            placeholder='Search...'
            className='md:w-[100px] lg:w-[300px]'
            onChange={handleSearch}
            value={filter}
          />
          <DropdownMenuTrigger>
            <Button>Search</Button>
          </DropdownMenuTrigger>
        </div>
        <DropdownMenuContent className='w-[60svw] DropdownMenuContent' sideOffset={5}>
          {
            loading ? <DropdownMenuItem><p>Loading...</p> </DropdownMenuItem> :
              tasks.filter(t => {
                return t.trackingNumber.includes(filter)
              }).map((task) => (
                  <DropdownMenuItem key={task.trackingNumber} className='flex items-center justify-between' onClick={() => navigate("/incoming")}>
                    <div className='flex items-center'>
                      <div className='flex flex-row justify-between items-center gap-4'>
                        <p className='text-xs text-muted-foreground'>{task.trackingNumber}</p>
                        <p className='text-sm'>From: {task.sentFromId}</p>
                        <p className='text-sm'>To: {task.sentToId}</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
              ))}
              {
                tasks.filter(t => {
                  return t.trackingNumber.includes(filter)
                }).length === 0 && <DropdownMenuItem><p>No results found</p></DropdownMenuItem>
              }
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

