import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from '../provider/AuthProvider';
import Loader from './Shared/Loader';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet";
import axios from 'axios';
import Swal from 'sweetalert2';

const Login = () => {
    const { signInUser, loading, setLoading, googleSignInUser, setUser } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [show, setShow] = useState(false); // Updated initial state to false
    const { register, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation()
    const navigate = useNavigate();
    const from = location.state?.form?.pathname || '/'

    const onSubmit = data => {

        setError('')

        signInUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                Swal.fire({
                    icon: 'success',
                    text: 'Login Successfully',
                })
                navigate(from, { replace: true });
                setLoading(false)
                reset()
            })
            .catch(err => {
                const errorMessage = err.message
                if (errorMessage === 'Firebase: Error (auth/invalid-email).') {
                    setError('Please Input a valid email address')
                    setLoading(false)
                } else if (errorMessage === 'Firebase: Error (auth/wrong-password).') {
                    setError('wrong password. Please try again')
                    setLoading(false)
                }
                console.log(errorMessage)
            })
    }
    const handleGoogleSignIn = () => {
        googleSignInUser()
            .then(result => {
                const user = result.user
                const savedUser = { name: user.displayName, email: user.email, image: user.photoURL, role: 'student' }
                axios.post(`${import.meta.env.VITE_BASE_URL}/all-users`, savedUser)
                setUser(user)
                setLoading(false)
                Swal.fire({
                    icon: 'success',
                    text: 'Login Successfully',
                })
                navigate(from, { replace: true });
            })
            .catch(err => {
                if (err.message === 'Firebase: Error (auth/popup-closed-by-user).') {
                    setLoading(false)
                }
                console.log(err.message)
                setLoading(false)
            })
    }

    return (
        <>
            {
                loading && <Loader />
            }
            <div className='mx-auto p-10 w-full sm:w-5/6 md:w-4/6 lg:w-3/6 xl:w-2/6'>
                <form className='p-10 bg-base-200 rounded-xl border-2' onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col mb-4"> <label className='text-xl font-semibold mb-3'>Email</label>
                        <input placeholder='Email' className='mb-5 p-3 focus:outline-none' {...register('email', { required: true })} />
                        {errors?.email?.type === 'required' && <p className='text-red-800 mb-2'>This field is required</p>}</div>

                    <label className='text-xl font-semibold mb-3'>Password</label>
                    <div className='relative w-full'>
                        <input placeholder='Password' className='mb-5 w-full p-3 focus:outline-none' type={show ? 'text' : 'password'} {...register('password', { required: true })} />
                        <div onClick={() => setShow(!show)} className='absolute inset-y-0 right-3 top-3.5'>
                            {show ? <FaEye className='w-5 h-5' /> : <FaEyeSlash className='w-5 h-5' />}
                        </div>
                    </div>
                    {errors?.password?.type === 'required' && <p className='text-red-800 mb-2'>This field is required</p>}
                    <p className='text-center p-3'>Don't have an account? <Link to='/register'><span className='text-btn-color text-blue-800 underline'>Register</span></Link></p>
                    <p className='text-red-800 py-3'>{error}</p>
                    <button type='submit' className='button mx-auto flex justify-center w-full'>Login</button>
                </form>
                <div onClick={handleGoogleSignIn} className='my-5 flex w-10/12 sm:w-full rounded-3xl mx-auto p-2 justify-between items-center hover:bg-black hover:text-white cursor-pointer border-2'>
                    <FcGoogle className='h-6 w-6' />
                    <p className='font-semibold mx-auto'>Continue with Google</p>
                </div>
            </div>

        </>
    )
};

export default Login;