import { IconLoader2 } from '@tabler/icons-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PostalUserRole, useAuth } from './hooks/authProvider'
import { Layout, LayoutHeader } from './components/custom/layout'
import ThemeSwitch from './components/theme-switch'
import { UserNav } from './components/user-nav'

const RouterIndex = () => {
  const navigator = useNavigate()
  const { user, setUser } = useAuth()
  useEffect(() => {
    let localUser
    if (user) {
      localUser = user
    } else {
      const result = localStorage.getItem('user')
      if (result) {
        localUser = JSON.parse(result)
        console.log('Local user:', localUser)
        setUser(localUser)
      }
    }
    // if (localUser) {
    //   switch (localUser?.role) {
    //     case PostalUserRole.master:
    //       navigator('/dashboard')
    //       break
    //     case PostalUserRole.Limd_yalew:
    //       navigator('/mail')
    //       break
    //     case PostalUserRole.basic:
    //       navigator('/403')
    //       break
    //     default:
    //       navigator('/welcome')
    //   }
    // } else {
    //   navigator('/sign-in')
    // }
  }, [user])
  console.log('User: isidensdcd', user)
  return (
    <Layout>
      <LayoutHeader>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </LayoutHeader>
      <div className='flex items-start gap-4'>
        <p>Please wait...</p>
        <IconLoader2 className='mr-2 h-4 w-4 animate-spin' />
      </div>
    </Layout>
  )
}

export default RouterIndex
