import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../components/Hooks/useAuth"
import { useInstructor } from "../components/Hooks/useInstructor"
import Loader from "../pages/Shared/Loader"

const InstructorRoute = ({children}) => {
    const {user, loading} = useAuth()
    const [isInstructor, isInstructorLoading] = useInstructor()
    const location = useLocation()

    if(loading || isInstructorLoading){
        return <Loader/>
    }

    if(user && isInstructor){
        return children
    }
    return <Navigate to='/login' state={{from : location}} replace></Navigate>
}

export default InstructorRoute;