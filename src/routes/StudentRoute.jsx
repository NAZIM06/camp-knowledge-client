import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../components/Hooks/useAuth";
import { useStudent } from "../components/Hooks/useStudent";
import Loader from "../pages/Shared/Loader";

const StudentRoute = ({children}) => {
    const {user, loading} = useAuth()
    const [isStudent, isStudentLoading] = useStudent()
    const location = useLocation()

    if(loading || isStudentLoading){
        return <Loader/>
    }

    if(user && isStudent){
        return children
    }
    return <Navigate to='/login' state={{from : location}} replace></Navigate>
};

export default StudentRoute;