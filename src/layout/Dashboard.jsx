import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaHome, FaUniversity, FaUsers, FaUsersCog, FaWallet, } from 'react-icons/fa';
import { GiTeacher } from 'react-icons/gi';
import { IoMdSchool } from 'react-icons/io';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { useAuth } from '../components/Hooks/useAuth';

const Dashboard = () => {
    const { user } = useAuth();
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/current-user?email=${user?.email}`)
            .then(res => {
                setCurrentUser(res.data)
            })
    }, [])

    const theme = localStorage.getItem('theme')

    return (
        <div className="drawer lg:drawer-open mt-6">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center">
                <Outlet />
                <label htmlFor="my-drawer-2" className="button drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side rounded-sm ">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                {
                    currentUser.role === 'instructor' && (
                        <ul id='active-route' className={`menu p-4 w-80 h-full text-base-content bg-blue-500 ${theme && 'text-white'}`}>
                            {/* Sidebar content here */}
                            <li><NavLink className={`font-bold text-base flex items-center ${({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""}`} to='/dashboard/add-class'><AddBusinessIcon className='mr-2' />Add Class</NavLink></li>
                            <li><NavLink className='font-bold text-base flex items-center' to='/dashboard/my-classes'><FaUniversity className='w-5 h-5 mr-3' />My Classes</NavLink></li>
                            <div className='w-full px-3 border my-10'></div>
                            <li><NavLink className='font-bold text-base flex items-center' to='/'><FaHome className='w-5 h-5 mr-3' />Home</NavLink></li>
                            <li><NavLink className='font-bold text-base flex items-center' to='/instructors'><GiTeacher className='mr-3' />Instructors</NavLink></li>
                            <li><NavLink className='font-bold text-base flex items-center' to='/classes'><IoMdSchool className='w-5 h-5 mr-2' />Classes</NavLink></li>
                        </ul>
                    )
                }
                {
                    currentUser.role === 'admin' && (
                        <ul className={`menu p-4 w-80 h-full text-base-content bg-blue-500 ${theme && 'text-white'}`}>
                            {/* Sidebar content here */}
                            <li><NavLink className='font-bold text-base flex items-center' to='/dashboard/manage-classes'><FaUsersCog className='w-5 h-5 mr-3' />Manage Classes</NavLink></li>
                            <li><NavLink className='font-bold text-base flex items-center' to='/dashboard/manage-users'><FaUsers className='w-5 h-5 mr-3' /> Manage Users</NavLink></li>
                            <div className='w-full px-3 border my-10'></div>
                            <li><NavLink className='font-bold text-base flex items-center' to='/'><FaHome className='w-5 h-5 mr-3' />Home</NavLink></li>
                            <li><NavLink className='font-bold text-base flex items-center' to='/instructors'><GiTeacher className='mr-3' />Instructors</NavLink></li>
                            <li><NavLink className='font-bold text-base flex items-center' to='/classes'><IoMdSchool className='w-5 h-5 mr-2' />Classes</NavLink></li>
                        </ul>
                    )
                }
                {
                    currentUser.role === 'student' && (
                        <ul className={`menu p-4 w-80 h-full text-base-content bg-blue-500 ${theme && 'text-white'}`}>
                            {/* Sidebar content here */}
                            <li><NavLink className='font-bold text-base flex items-center' to='/dashboard/my-selected-classes'><ChecklistIcon className='mr-3' />My Selected Classes</NavLink></li>
                            <li><NavLink className='font-bold text-base flex items-center' to='/dashboard/my-enrolled-classes'><FaUniversity className='w-5 h-5 mr-3' />My Enrolled Classes</NavLink></li>
                            <li><NavLink className='font-bold text-base flex items-center' to='/dashboard/payment-history'><FaWallet className='w-5 h-5 mr-3' />Payment History</NavLink></li>
                            <div className='w-full px-3 border my-10'></div>
                            <li><NavLink className='font-bold text-base flex items-center' to='/'><FaHome className='w-5 h-5 mr-3' />Home</NavLink></li>
                            <li><NavLink className='font-bold text-base flex items-center' to='/instructors'><GiTeacher className='mr-3' />Instructors</NavLink></li>
                            <li><NavLink className='font-bold text-base flex items-center' to='/classes'><IoMdSchool className='w-5 h-5 mr-2' />Classes</NavLink></li>
                        </ul>
                    )
                }
            </div>
        </div>
    );
};

export default Dashboard;