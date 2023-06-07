/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from '../provider/AuthProvider';
import Loader from './Shared/Loader';


const Login = () => {
    const { signInUser, loading, setLoading, googleSignInUser, setUser } = useContext(AuthContext);
    const [error, setError] = useState('')
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        setError('')
        if (password.length < 6) {
            setError('Password at least 6 character long')
            return;
        } else {
            signInUser(email, password)
                .then(result => {
                    const loggedUser = result.user;
                    setLoading(false)
                    navigate(from, { replace: true })
                    console.log(loggedUser)
                })
                .catch(error => {
                    const errorMessage = error.message;
                    if (errorMessage === 'Firebase: Error (auth/wrong-password).') {
                        setError('Password or Email invalid')
                        setLoading(false)
                    }
                    console.log(errorMessage)
                })
        }
        // console.log(event.target.email.value)
    }

    const handleGoogleSignIn = () => {
        googleSignInUser()
            .then(result => {
                const loggedUser = result.user;
                setUser(loggedUser)
                setLoading(false)
                navigate(from, { replace: true })
            })
            .catch(error => {
                const errorMessage = error.message;
                console.log(errorMessage)
            })
    }

    return (
        <>
            {
                loading && <Loader />
            }
            <div className='mx-auto p-10 w-full sm:w-5/6 md:w-4/6 lg:w-3/6 xl:w-2/6'>
                <form onSubmit={handleSubmit} className='p-10 bg-base-200 rounded-xl border-2'>
                    <p className='text-xl font-bold text-black mb-7'>Login</p>
                    <div className="flex flex-col mb-4">
                        <label className="text-black font-semibold py-3" htmlFor="email">Username or Email</label>
                        <input className="outline-none border-2 border-gray-300 rounded-md p-2 focus:border-gray-500" type="email" name="email" required placeholder='Username or Email' />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-black font-semibold py-3" htmlFor="email">Password</label>
                        <input className="outline-none border-2 border-gray-300 rounded-md p-2 focus:border-gray-500" type="password" name="password" required placeholder='Password' />
                    </div>
                    <p className='text-red-700 mt-3'>{error}</p>
                    <button className='button'>Login</button>
                    <p className='text-center p-3'>Don't have an account? <Link to='/register'><span className='text-btn-color underline'>Create Account</span></Link></p>
                </form>
                <div onClick={handleGoogleSignIn} className='my-5 flex w-10/12 sm:w-full rounded-3xl mx-auto p-2 justify-between items-center hover:bg-[#121212] hover:text-white cursor-pointer border-2'>
                    <FcGoogle className='h-6 w-6' />
                    <p className='font-semibold mx-auto'>Continue with Google</p>
                </div>
            </div>

        </>
    )
};

export default Login;