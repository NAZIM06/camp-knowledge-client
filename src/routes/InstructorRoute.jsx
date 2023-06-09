import React from 'react';
import { useAuth } from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../Pages/Shared/Loader/Loader';
import { useInstructor } from '../Hooks/useInstructor';

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