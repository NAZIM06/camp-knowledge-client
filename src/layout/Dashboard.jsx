import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';

const Dashboard = () => {
    const {user, loading} = useAuth();
    const [currentUser, setCurrentUser] = useState({})
    
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_BASE_URL}/current-user?email=${user?.email}`)
        .then(res => {
            setCurrentUser(res.data)
        })
    },[])
    // console.log(currentUser)

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center">
                <Outlet/>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side ">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                {
                    currentUser.role === 'instructor' && (
                        <ul className="menu p-4 w-80 h-full text-base-content bg-slate-500">
                        {/* Sidebar content here */}
                        <li><Link to='/dashboard/add-class'><p className='font-bold text-base'>Add Class</p></Link></li>
                        <li><Link to='/dashboard/my-classes'><p className='font-bold text-base'>My Classes</p></Link></li>
                        <div className='w-full px-3 border my-10'></div>
                        <li><Link to='/'><p className='font-bold text-base'>Home</p></Link></li>
                    </ul>
                    )
                }
                {
                    currentUser.role === 'admin' && (
                        <ul className="menu p-4 w-80 h-full text-base-content bg-slate-500">
                        {/* Sidebar content here */}
                        <li><Link to='/dashboard/manage-classes'><p className='font-bold text-base'>Manage Classes</p></Link></li>
                        <li><Link to='/dashboard/manage-users'><p className='font-bold text-base'>Manage Users</p></Link></li>
                        <div className='w-full px-3 border my-10'></div>
                        <li><Link to='/'><p className='font-bold text-base'>Home</p></Link></li>
                    </ul>
                    )
                }
                {
                    currentUser.role === 'student' && (
                        <ul className="menu p-4 w-80 h-full text-base-content bg-slate-500">
                        {/* Sidebar content here */}
                        <li><Link to='/dashboard/my-selected-classes'><p className='font-bold text-base'>My Selected Classes</p></Link></li>
                        <li><Link to='/dashboard/my-enrolled-classes'><p className='font-bold text-base'>My Enrolled Classes</p></Link></li> 
                        <li><Link to='/dashboard/payment'><p className='font-bold text-base'>payment</p></Link></li> 
                        <li><Link to='/dashboard/payment-history'><p className='font-bold text-base'>Payment History</p></Link></li> 
                        <div className='w-full px-3 border my-10'></div>
                        <li><Link to='/'><p className='font-bold text-base'>Home</p></Link></li>
                    </ul>
                    )
                }

            </div>
        </div>
    );
};

export default Dashboard;