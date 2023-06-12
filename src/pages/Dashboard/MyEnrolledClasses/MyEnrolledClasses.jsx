import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '../../../components/Hooks/useAuth';


const MyEnrolledClasses = () => {
    const { user } = useAuth()
    const { data: enrolledClasses = [], refetch } = useQuery({
        queryKey: ['selected-classes'],
        queryFn: async () => {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/enrolled-classes/${user?.email}`)
            return response.data
        }
    })
    return (
        <>
            <div className='w-11/12 py-10 px-5 bg-base-300 shadow-2xl my-10'>
                <p className='text-3xl font-bold my-5 text-center'>My Enrolled Classes : {enrolledClasses.length}</p>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className='bg-red-600 text-white'>
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
                                    <td><img className='w-20' src={classes?.singleClass?.image} alt="" /></td>
                                    <td>{classes?.singleClass?.className}</td>
                                    <td>{classes?.singleClass?.instructorName}</td>
                                    <td>{classes?.singleClass?.instructorEmail}</td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default MyEnrolledClasses;