import axios from 'axios'
import { Task, TaskCategory } from './schema'

export const tasks: Task[] = [
  {
    "id": "MAIL-7419",
    "details": "From: Alem Kebede -> To: Tesfaye Dinku",
    "status": "waiting",
    "label": "bug",
    "priority": "high"
  },
  {
    "id": "MAIL-4471",
    "details": "From: Ayana Worku -> To: Yohannes Berhane",
    "status": "en-route",
    "label": "documentation",
    "priority": "high"
  },
  {
    "id": "MAIL-6625",
    "details": "From: Bekele Zeleke -> To: Sara Tadesse",
    "status": "waiting",
    "label": "maintenance",
    "priority": "high"
  },
  {
    "id": "MAIL-5727",
    "details": "From: Genet Dibaba -> To: Fitsum Mekonnen",
    "status": "waiting",
    "label": "documentation",
    "priority": "low"
  },
  {
    "id": "MAIL-3358",
    "details": "From: Lemlem Eshetu -> To: Almaz Dessalegn",
    "status": "en-route",
    "label": "maintenance",
    "priority": "low"
  },
  {
    "id": "MAIL-5140",
    "details": "From: Gebre Bekele -> To: Yordanos Fikru",
    "status": "waiting",
    "label": "feature",
    "priority": "high"
  },
  {
    "id": "MAIL-2260",
    "details": "From: Negusie Amare -> To: Kifle Tadesse",
    "status": "lost",
    "label": "feature",
    "priority": "high"
  },
  {
    "id": "MAIL-6298",
    "details": "From: Aster Kassaye -> To: Teklu Mekonnen",
    "status": "en-route",
    "label": "maintenance",
    "priority": "medium"
  },
  {
    "id": "MAIL-8368",
    "details": "From: Haile Yesuf -> To: Yared Mulugeta",
    "status": "waiting",
    "label": "maintenance",
    "priority": "low"
  },
  {
    "id": "MAIL-6114",
    "details": "From: Tsehay Abebe -> To: Mariam Gebru",
    "status": "waiting",
    "label": "documentation",
    "priority": "low"
  },
  {
    "id": "MAIL-2310",
    "details": "From: Dawit Haile -> To: Zenebech Alemu",
    "status": "waiting",
    "label": "maintenance",
    "priority": "high"
  },
  {
    "id": "MAIL-5643",
    "details": "From: Solomon Gebre -> To: Seble Belay",
    "status": "waiting",
    "label": "maintenance",
    "priority": "high"
  },
  {
    "id": "MAIL-8669",
    "details": "From: Elias Tadesse -> To: Tamrat Tefera",
    "status": "delivered",
    "label": "documentation",
    "priority": "medium"
  },
  {
    "id": "MAIL-5220",
    "details": "From: Hana Abate -> To: Meseret Tadese",
    "status": "waiting",
    "label": "documentation",
    "priority": "high"
  },
  {
    "id": "MAIL-3937",
    "details": "From: Kebede Alemu -> To: Abebe Mengesha",
    "status": "en-route",
    "label": "maintenance",
    "priority": "medium"
  },
  {
    "id": "MAIL-2446",
    "details": "From: Aklilu Gebre -> To: Eyob Asfaw",
    "status": "delivered",
    "label": "bug",
    "priority": "medium"
  },
  {
    "id": "MAIL-5203",
    "details": "From: Kassa Eshetu -> To: Wondimu Kassa",
    "status": "delivered",
    "label": "maintenance",
    "priority": "low"
  }
] as Task[]

export const  names = [
  "Alemu Bekele",
  "Yohannes Dinku",
  "Mulugeta Zeleke",
  "Almaz Dinku",
  "Genet Tadesse",
  "Tesfaye Bekele",
  "Haile Bekele",
  "Dawit Dinku"
];

tasks.forEach((task, index) => {
  // give randm category
  task.type =
    Object.values(TaskCategory)[index % Object.keys(TaskCategory).length]
  // assign random driver to some of the tasks
  if (index % 3 === 0) {
    task.driverAssigned = names[Math.floor(Math.random() * names.length)]
  }
  // assign a random tracking number 5 digitss

  task.trackingNumber = "1Z9R5W90P22" + Math.floor(Math.random() * 100000).toString()
})

