import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  StopwatchIcon,
} from '@radix-ui/react-icons'

export const labels = [
  {
    value: 'bug',
    label: 'Bug',
  },
  {
    value: 'feature',
    label: 'Feature',
  },
  {
    value: 'documentation',
    label: 'Documentation',
  },
]

export const statuses = [
  {
    value: 'withUser',
    label: 'withUser',
    icon: StopwatchIcon,
  },
  {
    value: 'pickedup',
    label: 'Picked up',
    icon: CircleIcon,
  },
  {
    value: 'station',
    label: 'Station',
    icon: CrossCircledIcon,
  },
  {
    value: 'delivered',
    label: 'Delivered',
    icon: CheckCircledIcon,
  },
]

export const priorities = [
  {
    label: 'Low',
    value: 'low',
    icon: ArrowDownIcon,
  },
  {
    label: 'Medium',
    value: 'medium',
    icon: ArrowRightIcon,
  },
  {
    label: 'High',
    value: 'high',
    icon: ArrowUpIcon,
  },
]
