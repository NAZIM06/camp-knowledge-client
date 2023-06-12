import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useAuth } from '../../components/Hooks/useAuth';



const Classes = () => {
    const { user } = useAuth()
    const [currentUser, setCurrentUser] = useState({})
    const { data: allClasses = [], refetch } = useQuery({
        queryKey: ['all-classes'],
        queryFn: async () => {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/approved-all-classes`)
            return response.data
        }
    })
    
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_BASE_URL}/current-user?email=${user?.email}`)
        .then(res => {
            setCurrentUser(res.data)
        })
    },[])

    const handleSelect = (singleClass) => {
        if(!user){
            Swal.fire({
                icon: 'error',
                text: 'Without login you can not select class',
                footer: '<a href="/login">Please login</a>'
            })
            return;
        }
        const selectedClass = { singleClass, studentEmail: user?.email, classId: singleClass._id }
        axios.post(`${import.meta.env.VITE_BASE_URL}/selected-class`, selectedClass)
            .then(res => {
                if (res.data.acknowledged) {
                    refetch()
                    Swal.fire({
                        icon: 'success',
                        text: 'Class selected successfully',
                    })
                }
            
            })
    }
    return (
        <>
      
        <div className='md:p-10 my-10 mx-auto w-11/12'>
            <p className='text-3xl font-bold mb-10 text-center'>All Classes</p>
            <div className='grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-5'>
                {allClasses.map((classes) =>
              

                    <div key={classes._id} className={`card w-96 group glass ${classes.seats === 0 && 'bg-red-600'}`}>
                        <figure><img className='w-full h-80 group-hover:scale-110' src={classes.image} alt="car!" /></figure>
                        <div className="card-body">
                            <p className='font-semibold'>Class name: <span className='font-normal'>{classes.className}</span></p>
                            <p className='font-semibold'>Instructor Name: <span className='font-normal'>{classes.instructorName}</span></p>
                            <p className='font-semibold'>Available Seats: <span className='font-normal'>{classes.seats}</span></p>
                            <p className='font-semibold'>Price: <span className='font-normal'>${classes.price}</span></p>
                            <button disabled={classes.seats === 0 ? 'disabled' : currentUser.role === 'admin' || currentUser.role === 'instructor' ? 'disabled' : ''} onClick={() => handleSelect(classes)} className="button mx-auto">Enrole</button>
                        </div>
                    </div>
                    )}
            </div>
        </div>
        </>
    );
};

export default Classes;