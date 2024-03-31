import axios from 'axios'
import { Task, TaskCategory } from './schema'

export const tasks: Task[] = [
  {
    id: 'MAIL-7419',
    details: 'From: Jennifer Rodgers -> To: Jeremy Galloway',
    status: 'waiting',
    label: 'bug',
    priority: 'high',
  },
  {
    id: 'MAIL-4471',
    details: 'From: Amanda Bates -> To: John Martin',
    status: 'en-route',
    label: 'documentation',
    priority: 'high',
  },
  {
    id: 'MAIL-6625',
    details: 'From: Paul Bowman -> To: Sarah Mcconnell',
    status: 'waiting',
    label: 'maintenance',
    priority: 'high',
  },
  {
    id: 'MAIL-5727',
    details: 'From: Tiffany Klein -> To: Steven Ponce',
    status: 'waiting',
    label: 'documentation',
    priority: 'low',
  },
  {
    id: 'MAIL-3358',
    details: 'From: Kaitlin Gutierrez -> To: Rebecca Benson',
    status: 'en-route',
    label: 'maintenance',
    priority: 'low',
  },
  {
    id: 'MAIL-5140',
    details: 'From: Michael Castillo -> To: Beth Martinez',
    status: 'waiting',
    label: 'feature',
    priority: 'high',
  },
  {
    id: 'MAIL-2260',
    details: 'From: Benjamin Levy -> To: James Blevins',
    status: 'lost',
    label: 'feature',
    priority: 'high',
  },
  {
    id: 'MAIL-6298',
    details: 'From: Tammy Austin -> To: Michael Dean',
    status: 'en-route',
    label: 'maintenance',
    priority: 'medium',
  },
  {
    id: 'MAIL-8368',
    details: 'From: Kyle Jensen -> To: Keith Oneill',
    status: 'waiting',
    label: 'maintenance',
    priority: 'low',
  },
  {
    id: 'MAIL-6114',
    details: 'From: Heather Mcdonald -> To: Lauren Richmond',
    status: 'waiting',
    label: 'documentation',
    priority: 'low',
  },
  {
    id: 'MAIL-2310',
    details: 'From: David Hanson -> To: Tina Barnes',
    status: 'waiting',
    label: 'maintenance',
    priority: 'high',
  },
  {
    id: 'MAIL-5643',
    details: 'From: Steven Gutierrez -> To: Gloria Flores',
    status: 'waiting',
    label: 'maintenance',
    priority: 'high',
  },
  {
    id: 'MAIL-8669',
    details: 'From: Troy James -> To: William Roberts',
    status: 'delivered',
    label: 'documentation',
    priority: 'medium',
  },
  {
    id: 'MAIL-5220',
    details: 'From: Lynn Smith -> To: Cynthia Cohen',
    status: 'waiting',
    label: 'documentation',
    priority: 'high',
  },
  {
    id: 'MAIL-3937',
    details: 'From: Timothy Morris -> To: Jesus Hartman',
    status: 'en-route',
    label: 'maintenance',
    priority: 'medium',
  },
  {
    id: 'MAIL-2446',
    details: 'From: Haley Chaney -> To: Calvin Blanchard',
    status: 'delivered',
    label: 'bug',
    priority: 'medium',
  },
  {
    id: 'MAIL-5203',
    details: 'From: Gregory Adams -> To: Rebekah Adams',
    status: 'delivered',
    label: 'maintenance',
    priority: 'low',
  },
] as Task[]

export const  names = [
  'Rob Brown',
  'John Doe',
  'Jason Brydon',
  'Jane Doe',
  'Alice Smith',
  'Bob Brown',
  'Charlie Brown',
  'David Doe',
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
];

tasks.forEach((task, index) => {
  // give randm category
  task.type =
    Object.values(TaskCategory)[index % Object.keys(TaskCategory).length]
  // assign random driver to some of the tasks
  if (index % 3 === 0) {
    task.driverAssigned = names[Math.floor(Math.random() * names.length)]
  }
})

