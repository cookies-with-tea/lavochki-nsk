import { GetStaticProps, NextPage } from 'next'
import { ReactElement, ReactNode, useState } from 'react'
import DefaultLayoutHeader
  from '@/app/components/Layouts/DefaultLayout/DefaultLayoutHeader'
import { StyledContainer }
  from '@/app/layouts/DefaultLayout/DefaultLayout.style'
import DefaultLayoutFooter
  from '@/app/components/Layouts/DefaultLayout/DefaultLayoutFooter'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import { UserMeType } from '@/app/types/user.type'
import UserService from '@/app/services/User/UserService'
import { UserContext } from '@/app/contexts/userContext'

interface IProps {
    children: ReactNode
}

const getMe = async (): Promise<UserMeType> => await UserService.getMe()

const DefaultLayout: NextPage<IProps> = ({ children }): ReactElement => {
  const [user, setUser] = useState<UserMeType>({
    id: '',
    role: '',
    telegram_id: 0,
    username: ''
  })

  useQuery<UserMeType>('get user', getMe, {
    onSuccess: (response) => {
      setUser(response)
    }
  })

  return (
    <>
      <UserContext.Provider value={user}>
        <DefaultLayoutHeader />

        <StyledContainer className="container">
          { children }
        </StyledContainer>

        <DefaultLayoutFooter />
      </UserContext.Provider>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery<UserMeType>('get user', getMe)

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}

export default DefaultLayout
