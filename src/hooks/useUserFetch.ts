import React, { useRef } from 'react'
import { useCookies } from 'react-cookie'
import { UserMe } from '~/types/user'
import { fetcher } from '~/utils/apiClient'

export function useUserFetch(setUser: React.Dispatch<UserMe | null>) {
  const [cookies] = useCookies(['Authorization'])
  const isFetched = useRef(false) // 요청이 발생했는지 추적

  React.useEffect(() => {
    const fetchUser = async () => {
      if (isFetched.current || !cookies.Authorization) {
        setUser(null)
        return
      }

      try {
        const res = await fetcher('/v1/users/@me')
        setUser(res.data)
        isFetched.current = true // 요청 완료 후 요청 발생 여부를 true로 설정
      } catch (error) {
        console.error('Failed to fetch user:', error)
        setUser(null)
      }
    }

    fetchUser()
  }, [cookies.Authorization, setUser])
}
