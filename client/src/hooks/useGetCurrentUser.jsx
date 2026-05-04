import axiosInstance from '../axiosInstance' // WHY: withCredentials baked in
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

function useGetCurrentUser() {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const { data } = await axiosInstance.get(`/api/user/me`)
                // /me returns { user: {...} } — extract .user before dispatching
                if (data && data.user) {
                    dispatch(setUserData(data.user))
                }
            } catch (error) {
                if (error?.response?.status === 401 || error?.response?.status === 400) {
                    // Session expired or no cookie — clear any stale localStorage user
                    dispatch(setUserData(null))
                } else {
                    console.error('useGetCurrentUser error:', error)
                }
            } finally {
                setIsLoading(false)
            }
        }
        getCurrentUser()
    }, [])

    return isLoading
}

export default useGetCurrentUser
