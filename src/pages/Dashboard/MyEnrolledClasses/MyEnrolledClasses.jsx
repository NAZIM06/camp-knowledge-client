import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const MyEnrolledClasses = () => {
    const { data: enrolledClasses = [], refetch } = useQuery({
        queryKey: ['selected-classes'],
        queryFn: async () => {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/enrolled-classes`)
            return response.data
        }
    })
    return (
        <div className='w-11/12 py-10 px-5 bg-base-300 shadow-2xl my-10'>
        <p className='text-3xl font-bold my-5 text-center'>My Enrolled Classes : {enrolledClasses.length}</p>
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead className='bg-slate-600 text-white'>
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Class Name</th>
                        <th>Instructor Name</th>
                        <th>Instructor Email</th>
                    </tr>
                </thead>
                <tbody>
                    {enrolledClasses.map((classes, index) =>
                        <tr key={classes._id} className='hover'>
                            <th>{index + 1}</th>
                            <td><img className='w-20' src={classes.singleClass.image} alt="" /></td>
                            <td>{classes.className}</td>
                            <td>{classes.instructorName}</td>
                            <td>{classes.instructorEmail}</td>
                        </tr>)}
                </tbody>
            </table>
        </div>
    </div>
    );
};

export default MyEnrolledClasses;