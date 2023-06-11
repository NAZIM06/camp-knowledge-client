import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, {useState } from 'react';

const ManageClasses = () => {
    /**Class Image, Class name, Instructor name, Instructor email, Available seats, Price, 
     * Status(pending/approved/denied) 3 buttons( Approve, Deny and send feedback */
    const [modal, setModal] = useState(false)
    const [selectedClassId, setSelectedClassId] = useState(null);
    const { data: allClasses = [], refetch } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/all-classes`);
            return response.data;
        },
    });

    // console.log(allClasses)
    const handleUpdate = (id, status) => {
        fetch(`${import.meta.env.VITE_BASE_URL}/all-classes/${id}?status=${status}`, {
            method: 'PUT'
        })
            .then(res => res.json())
            .then(data => {
                refetch()
                console.log(data)
            })
    }
    const handleModal = (id) => {
        setSelectedClassId(id)
        setModal(true)

    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const feedback = event.target.feedback.value;
        const id = selectedClassId; // Access the selected class ID
        axios.put(`${import.meta.env.VITE_BASE_URL}/all-classes/${id}?feedback=${feedback}`)
            .then((res) => {
                console.log(res.data);
            });
        setModal(false);
    };

    return (
        <>
            {
                modal &&  <dialog className="modal modal-bottom sm:modal-middle" open>
                <form onSubmit={handleSubmit} method="dialog" className="modal-box">
                    <h3 className="font-bold text-lg">Feedback</h3>
                    <div className="form-control mt-3">
                    <textarea placeholder="Feedback" name='feedback' className="textarea textarea-bordered textarea-md w-full focus:outline-none" ></textarea>
                    </div>
                    <div className="modal-action">
                        <button type='submit' className="btn">
                            submit
                        </button>
                    </div>
                </form>
            </dialog>
            }
            <div className='w-11/12 py-10 px-5 bg-base-300 shadow-2xl my-10'>
                <p className='text-3xl font-bold my-5 text-center'>All Classes: {allClasses.length}</p>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className='bg-slate-600 text-white'>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Class Name</th>
                                <th>Instructor Name</th>
                                <th>Instructor email</th>
                                <th>Price</th>
                                <th>Seats</th>
                                <th>Feedback</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allClasses.map((classes, index) =>
                                <tr key={classes._id} className='hover'>
                                    <th>{index + 1}</th>
                                    <td><img className='w-20' src={classes.image} alt="" /></td>
                                    <td>{classes.className}</td>
                                    <td>{classes.instructorName}</td>
                                    <td>{classes.instructorEmail}</td>
                                    <td>{classes.price}</td>
                                    <td>{classes.seats}</td>
                                    <td><button onClick={()=>handleModal(classes._id)} className='btn btn-primary'>Feedback</button></td>
                                    {
                                        classes.status === 'Pending' && <td><div className='text-sm p-3 rounded-full flex justify-center items-center border-2 border-yellow-600 font-semibold'>{classes.status}</div></td>
                                    }
                                    {
                                        classes.status === 'Approved' && <td><div className='text-sm p-3 rounded-full flex justify-center items-center border-2 border-green-700 font-semibold'>{classes.status}</div></td>
                                    }
                                    {
                                        classes.status === 'Denied' && <td><div className='text-sm p-3 rounded-full flex justify-center items-center border-2 border-red-800 font-semibold'>{classes.status}</div></td>
                                    }
                                    <td><div className='flex justify-between'><button disabled={classes.status === 'Approved' || classes.status == 'Denied'} onClick={() => handleUpdate(classes._id, 'approved')} className='btn btn-success'>Approve</button><button disabled={classes.status === 'Approved' || classes.status == 'Denied'} onClick={() => handleUpdate(classes._id, 'denied')} className='btn btn-error'>Denied</button></div></td>
                                </tr>)}

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default ManageClasses;