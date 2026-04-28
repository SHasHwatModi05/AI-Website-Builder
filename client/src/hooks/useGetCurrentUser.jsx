import axios from 'axios'
import { useEffect, useState } from 'react'
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

function useGetCurrentUser() {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const result = await axios.get(`${serverUrl}/user/me`)
                // /me returns { user: {...} }
                if (result && result.data) {
                    dispatch(setUserData(result.data))
                }
            } catch (error) {
                // 401 = no token / not logged in — expected, not a real error
                if (error?.response?.status !== 401 && error?.response?.status !== 400) {
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
