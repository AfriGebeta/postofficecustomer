import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  type: z.string(),
  details: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
  fragile: z.boolean().optional(),
  sentFromId: z.string(),
  sentToId: z.string(),
})

export enum TaskCategory {
  DISPATCH = 'dispatch',
  SCAN = 'scan',
  NOTIFY = 'notify',
}

export interface Task extends z.infer<typeof taskSchema>{
  driverAssigned?: string
} 
