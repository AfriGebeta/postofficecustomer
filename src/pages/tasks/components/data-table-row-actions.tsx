import { Row } from '@tanstack/react-table'

import { Button } from '@/components/custom/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { statuses } from '../data/data'
import React from 'react'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {

  // const status = statuses.find(
  //   (status) => status.value === row.getValue('status')
  // )
  // assign a random status to the task
  const status = statuses[Math.floor(Math.random() * statuses.length)]

  if (!status) {
    return null
  }
  const [visibleStatus, setVisibleStatus] = React.useState(status)

  const handleStatusChange = (givenStatus: any) => {
    const newStatus = statuses.find((status) => status.value === givenStatus.value)
    if(newStatus){
      setVisibleStatus(newStatus)
    }
  }

  return (
    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild>
    //     <Button
    //       variant='ghost'
    //       className='flex h-8 w-full flex-row items-center justify-start p-0 data-[state=open]:bg-muted'
    //     >
    //       {visibleStatus.icon && (
    //         <visibleStatus.icon className='mr-2 h-4 w-4 text-muted-foreground' />
    //       )}
    //       <span>{visibleStatus.label}</span>
    //     </Button>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent align='end' className='w-[160px]'>
    //     <DropdownMenuRadioGroup value={visibleStatus.label}>
    //       {statuses.map((status) => (
    //         <DropdownMenuRadioItem
    //           key={status.value}
    //           value={status.value}
    //           onClick={() => handleStatusChange(status)}
    //         >
    //           <status.icon className='mr-2 h-4 w-4 text-muted-foreground' />
    //           {status.label}
    //         </DropdownMenuRadioItem>
    //       ))}
    //     </DropdownMenuRadioGroup>
    //     <DropdownMenuItem>Edit</DropdownMenuItem>
    //     <DropdownMenuItem>Make a copy</DropdownMenuItem>
    //     <DropdownMenuItem>Favorite</DropdownMenuItem>
    //     <DropdownMenuSeparator />
    //     <DropdownMenuSub>
    //       <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
    //       <DropdownMenuSubContent>
    //         <DropdownMenuRadioGroup value={task.label}>
    //           {statuses.map((label) => (
    //             <DropdownMenuRadioItem key={label.value} value={label.value}>
    //               {label.label}
    //             </DropdownMenuRadioItem>
    //           ))}
    //         </DropdownMenuRadioGroup>
    //       </DropdownMenuSubContent>
    //     </DropdownMenuSub>
    //     <DropdownMenuSeparator />
    //     <DropdownMenuItem>
    //       Delete
    //       <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
    //     </DropdownMenuItem>
    //   </DropdownMenuContent>
    // </DropdownMenu>
    <div className='flex flex-row justify-start'>
      <status.icon className='mr-2 h-4 w-4 text-muted-foreground' />
    <p>
      {status.label}
    </p>
    </div>
  )
}

;<div className='flex w-[100px] items-center'></div>
