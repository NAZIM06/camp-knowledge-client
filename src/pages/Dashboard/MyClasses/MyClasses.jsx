import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FaPencilAlt } from 'react-icons/fa';
import { useAuth } from '../../../components/Hooks/useAuth';
import { Helmet } from 'react-helmet';

const MyClasses = () => {
    const { user } = useAuth()
    const { data: allClasses = [] } = useQuery({
        queryKey: ['my-classes'],
        queryFn: async () => {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/all-classes/${user?.email}`)
            return response.data
        }
    })

    return (
        <>
        <Helmet>
                <title>Camp Knowledge || My Classes</title>
            </Helmet>
        <div className='w-11/12 py-10 px-5 bg-base-300 shadow-2xl my-10'>
            <p className='text-3xl font-bold my-5 text-center'>My Classes : {allClasses.length}</p>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className='bg-red-600 text-white'>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Class Name</th>
                            <th>Price</th>
                            <th>Seats</th>
                            <th>Total Enrolled Students</th>
                            <th>Feedback</th>
                            <th>Status</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allClasses.map((classes, index) =>
                            <tr key={classes._id} className='hover'>
                                <th>{index + 1}</th>
                                <td><img className='w-20' src={classes.image} alt="" /></td>
                                <td>{classes.className}</td>
                                <td>{classes.price}</td>
                                <td>{classes.seats}</td>
                                <td>{classes.enrolledStudents}</td>
                                <td>{classes.status === 'Denied' ? classes.feedback : 'No feedback'}</td>
                                {
                                    classes.status === 'Pending' && <td><div className='text-sm p-3 rounded-full flex justify-center items-center border-2 border-yellow-600 font-semibold'>{classes.status}</div></td>
                                }
                                {
                                    classes.status === 'Approved' && <td><div className='text-sm p-3 rounded-full flex justify-center items-center border-2 border-green-700 font-semibold'>{classes.status}</div></td>
                                }
                                {
                                    classes.status === 'Denied' && <td><div className='text-sm p-3 rounded-full flex justify-center items-center border-2 border-red-800 font-semibold'>{classes.status}</div></td>
                                }
                                <td><div className='button cursor-pointer'><FaPencilAlt className='w-5 h-5' /></div></td>
                            </tr>)}

                    </tbody>
                </table>
            </div>
        </div>
        </>
    );
};

export default MyClasses;