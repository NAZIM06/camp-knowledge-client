import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


const PopularInstructors = () => {

    const { data: instructors = [] } = useQuery({
        queryKey: ['instructors'],
        queryFn: async () => {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/popular-instructors`)
            return response.data
        }
    })
    // console.log(instructors)
    return (
        <div className='px-6 md:px-10 mb-10 mx-auto w-11/12'>
            <p className='text-5xl font-extrabold mb-10 text-blue-900 text-center'>Popular Instructors</p>
            <div className='grid md:grid-cols-3 grid-cols-1 gap-5'>
                {
                    instructors.slice(0, 6).map(instructor =>

                        <div key={instructor._id} className="card w-full sm:w-80 glass shadow-2xl group">
                            <figure><img className='h-64 w-full object-cover' src={instructor?.image} alt={instructor.name} /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{instructor.name}</h2>
                                <p className='font-semibold'>Email: <span className='font-normal'>{instructor.email}</span></p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default PopularInstructors;


