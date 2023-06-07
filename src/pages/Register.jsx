import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loader from './Shared/Loader';
import { AuthContext } from '../provider/AuthProvider';

const Register = () => {

    const { createUser, setUser, loading, setLoading } = useContext(AuthContext);
    const [error, setError] = useState('')
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const photoUrl = form.photoUrl.value;
        const email = form.email.value;
        const password = form.password.value;

        setError('')
        if (password.length < 6) {
            setError('Password at least 6 character long')
            return;
        } else {
            createUser(email, password)
                .then(result => {
                    const createdUser = result.user;
                    createdUser.displayName = name;
                    createdUser.photoUrl = photoUrl;
                    setUser(createdUser)
                    setLoading(false)
                    navigate(from, { replace: true })
                })
                .catch(error => {
                    const errorMessage = error.message;
                    if (errorMessage === 'Firebase: Error (auth/email-already-in-use).') {
                        setError('Account already exists. Please login')
                        setLoading(false)
                    }
                    console.log(errorMessage)
                })
        }
        // console.log(event.target.email.value)
    }

    return (
        <>
            {
                loading && <Loader />
            }
            <div className='mx-auto p-10 w-full sm:w-5/6 md:w-4/6 lg:w-3/6 xl:w-2/6'>
                <form onSubmit={handleSubmit} className='p-10 bg-base-200 rounded-xl border-2'>
                    <p className='text-xl font-bold text-black mb-5'>Register</p>
                    <div className="flex flex-col mb-4">
                        <label className="text-black font-semibold py-3" htmlFor="name">Name</label>
                        <input className="outline-none border-2 border-gray-300 rounded-md p-2 focus:border-gray-500" type="text" name="name" placeholder='Name' />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-black font-semibold py-3" htmlFor="photoUrl">Photo URL</label>
                        <input className="outline-none border-2 border-gray-300 rounded-md p-2 focus:border-gray-500" type="text" name="photoUrl" placeholder='Photo URL' />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-black font-semibold py-3" htmlFor="email">Email</label>
                        <input className="outline-none border-2 border-gray-300 rounded-md p-2 focus:border-gray-500" type="email" name="email" required placeholder='Email' />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-black font-semibold py-3" htmlFor="password">Password</label>
                        <input className="outline-none border-2 border-gray-300 rounded-md p-2 focus:border-gray-500" type="password" name="password" required placeholder='Password' />
                    </div>
                    <p className='text-red-700 mt-3'>{error}</p>
                    <button className='button'>Register</button>
                    <p className='text-center mt-3'>Already have an account? <Link to='/login'><span className='text-btn-color underline'>Login</span></Link></p>
                </form>
            </div>

        </>
    );
};

export default Register;