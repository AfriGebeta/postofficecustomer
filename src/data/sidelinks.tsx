import { PostalUserRole } from '@/hooks/authProvider'
import {
  IconBarrierBlock,
  IconBoxSeam,
  IconChartHistogram,
  IconChecklist,
  IconComponents,
  IconError404,
  IconExclamationCircle,
  IconHexagonNumber1,
  IconHexagonNumber2,
  IconHexagonNumber3,
  IconHexagonNumber4,
  IconLayoutDashboard,
  IconMessages,
  IconRouteAltLeft,
  IconServerOff,
  IconSettings,
  IconTruck,
  IconUserShield,
  IconUsers,
} from '@tabler/icons-react'

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

export const sidelinks: SideLink[] = [
  {
    title: 'Dashboard',
    label: '',
    href: '/',
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: 'Sent package',
    label: '3',
    href: '/tasks',
    icon: <IconChecklist size={18} />,
  },
  {
    title: 'Incoming package',
    label: '3',
    href: '/tasks',
    icon: <IconChecklist size={18} />,
  },
  {
    title: 'package history',
    label: '9',
    href: '/chats',
    icon: <IconMessages size={18} />,
  },
  {
    title: 'Authentication',
    label: '',
    href: '',
    icon: <IconUserShield size={18} />,
    sub: [
      {
        title: 'Sign In (email + password)',
        label: '',
        href: '/sign-in',
        icon: <IconHexagonNumber1 size={18} />,
      },
      {
        title: 'Sign In (Box)',
        label: '',
        href: '/sign-in-2',
        icon: <IconHexagonNumber2 size={18} />,
      },
      {
        title: 'Sign Up',
        label: '',
        href: '/sign-up',
        icon: <IconHexagonNumber3 size={18} />,
      },
      {
        title: 'Forgot Password',
        label: '',
        href: '/forgot-password',
        icon: <IconHexagonNumber4 size={18} />,
      },
    ],
  },
  {
    title: 'Users',
    label: '',
    href: '/users',
    icon: <IconUsers size={18} />,
  },
  {
    title: 'Requests',
    label: '10',
    href: '/requests',
    icon: <IconRouteAltLeft size={18} />,
    sub: [
      {
        title: 'Trucks',
        label: '9',
        href: '/trucks',
        icon: <IconTruck size={18} />,
      },
      {
        title: 'Cargos',
        label: '',
        href: '/cargos',
        icon: <IconBoxSeam size={18} />,
      },
    ],
  },
  {
    title: 'Analysis',
    label: '',
    href: '/analysis',
    icon: <IconChartHistogram size={18} />,
  },
  {
    title: 'Extra Components',
    label: '',
    href: '/extra-components',
    icon: <IconComponents size={18} />,
  },
  {
    title: 'Error Pages',
    label: '',
    href: '',
    icon: <IconExclamationCircle size={18} />,
    sub: [
      {
        title: 'Not Found',
        label: '',
        href: '/404',
        icon: <IconError404 size={18} />,
      },
      {
        title: 'Internal Server Error',
        label: '',
        href: '/500',
        icon: <IconServerOff size={18} />,
      },
      {
        title: 'Maintenance Error',
        label: '',
        href: '/503',
        icon: <IconBarrierBlock size={18} />,
      },
    ],
  },
  {
    title: 'Settings',
    label: '',
    href: '/settings',
    icon: <IconSettings size={18} />,
  },
]

const adminSidelinks: SideLink[] = [
  {
    title: 'Dashboard',
    label: '',
    href: '/',
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: 'Users',
    label: '',
    href: '/users',
    icon: <IconUsers size={18} />,
  },
  {
    title: 'Branches',
    label: '',
    href: '/branches',
    icon: <IconHexagonNumber1 size={18} />,
  },
  {
    title: 'Employees',
    label: '',
    href: '/employees',
    icon: <IconHexagonNumber2 size={18} />,
  },
  {
    title: 'Other E-Sevices',
    label: '',
    href: '/other-services',
    icon: <IconHexagonNumber3 size={18} />,
  },
]

const employeeSidelinks: SideLink[] = [
  {
    title: 'Mail',
    label: '',
    href: '/mail',
    icon: <IconHexagonNumber3 size={18} />,
  },
  {
    title: 'Tasks',
    label: '',
    href: '/tasks',
    icon: <IconHexagonNumber4 size={18} />,
  },
  {
    title: 'Users',
    label: '',
    href: '/users',
    icon: <IconUsers size={18} />,
  },
  {
    title: 'Other E-Sevices',
    label: '',
    href: '/other-services',
    icon: <IconHexagonNumber1 size={18} />,
  },
]

const userSidelinks: SideLink[] = [
  {
    title: 'Dashbaord',
    label: '',
    href: '/403',
    icon: <IconLayoutDashboard size={18} />,
  },
]

const customerSideLinks: SideLink[] = [
  {
    title: 'Welcome',
    label: '',
    href: '/welcome',
    icon: <IconLayoutDashboard size={18} />,
  },

  {
    title: 'Sent package',
    label: '',
    href: '/outgoing',
    icon: <IconChecklist size={18} />,
  },
  {
    title: 'Incoming package',
    label: '',
    href: '/incoming',
    icon: <IconChecklist size={18} />,
  },
  {
    title: 'package history',
    label: '',
    href: '/history',
    icon: <IconMessages size={18} />,
  },

  {
    title: 'send',
    label: '',
    href: '/mail',
    icon: <IconMessages size={18} />,
  },
  {
    title: 'Settings',
    label: '',
    href: '/settings',
    icon: <IconSettings size={18} />,
  },
]

export const getSideLinks = (role: string | undefined) => {
  // switch (role) {
  //   case PostalUserRole.master:
  //     return adminSidelinks
  //   case PostalUserRole.Limd_yalew:
  //     return employeeSidelinks
  //   case PostalUserRole.basic || undefined:
  //     return userSidelinks
  //   default:
  //     return customerSideLinks
  // }
  return customerSideLinks
}
