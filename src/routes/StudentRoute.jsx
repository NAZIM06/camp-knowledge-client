import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../Pages/Shared/Loader/Loader';
import { useAuth } from '../Hooks/useAuth';
import { useStudent } from '../Hooks/useStudent';

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