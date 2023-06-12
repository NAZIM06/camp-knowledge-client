import { useQuery } from "@tanstack/react-query"
import { useAuth } from "./useAuth"
import axios from "axios"


export const useInstructor = () => {
    const { user } = useAuth()
    const { data: isInstructor, isLoading: isInstructorLoading } = useQuery({
        queryKey: ['instructor', user?.email],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/instructor/${user.email}`)
            return res.data
        }
    })
    return [isInstructor, isInstructorLoading]
}