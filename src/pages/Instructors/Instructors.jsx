import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Helmet } from 'react-helmet';

const Instructors = () => {
    const { data: allInstructors = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/all-instructors`);
            return response.data;
        },
    });
    return (
        <>
            <Helmet>
                <title>MindFulness || Instructors</title>
            </Helmet>
            <div className='w-11/12 px-10 my-10 mx-auto'>
                <p className='text-3xl font-bold my-5 text-center'>All Instructors </p>
                <div className='grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-5 mx-auto'>
                    {
                        allInstructors.map(instructor =>
                            <div key={instructor._id} className="card w-80 glass shadow-2xl group">
                                <figure><img className='group-hover:scale-110' src={instructor?.image} alt={instructor.name} /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{instructor.name}</h2>
                                    <p className='font-semibold'>Email: <span className='font-normal'>{instructor.email}</span></p>
                                </div>
                            </div>)
                    }
                </div>
            </div>
        </>
    );
};

export default Instructors;