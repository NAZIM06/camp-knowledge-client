import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from './Shared/Loader';
import { AuthContext } from '../provider/AuthProvider';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet";
import { FcGoogle } from 'react-icons/fc';

const Register = () => {
    const [show, setShow] = useState(false)
    const [showPass, setShowPass] = useState(false)
    const [error, setError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [photoUrl, setPhotoUrl] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user, createUser, setUser, loading, setLoading, updateUser,googleSignInUser } = useContext(AuthContext);

    const handleGoogleSignIn = () => {
        googleSignInUser()
            .then(result => {
                setUser(result.user)
                setLoading(false)
            })
            .catch(err => {
                console.log(err.message)
                setLoading(false)
            })
    }
    const onSubmit = async data => {
        if(data.password !== data.confirmPassword){
            setPasswordError('Password did not match. Try again')
            return;
        }
        setError('')
        const photo = new FormData()
        photo.append('image', data.photo[0])

        await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_API_KEY}`, {
            method: 'POST',
            body: photo
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setPhotoUrl(data.data.display_url)
                }
            })

        await createUser(data.email, data.password)
            .then((result) => {
                const user = result.user;
                updateUser(data.name, photoUrl)
                    .then(() => {
                        setLoading(false)
                     })
                    .catch((err) => {
                        const errorMessage = err.message;
                        setLoading(false)
                        console.log(errorMessage);
                    });
            })
            .catch((err) => {
                const errorMessage = err.message;
                if (errorMessage === 'Firebase: Error (auth/invalid-email).') {
                    setError('Please input a valid email address');
                    setLoading(false)
                } else if (errorMessage === 'Firebase: Error (auth/email-already-in-use).') {
                    setError('This email already exists. Please login');
                    setLoading(false)
                }
                console.log(errorMessage);
            });
    }
   

    return (
        <>
            {
                loading && <Loader />
            }
            <div className='mx-auto p-10 w-full sm:w-5/6 md:w-4/6 lg:w-3/6 xl:w-3/6'>
            <form className='p-10 bg-base-200 rounded-xl border-2' onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col mb-4">
                    <label className='text-xl font-semibold mb-3'>Name</label>
                    <input placeholder='Name' className='mb-5 p-3 focus:outline-none' {...register('name')} />
                    <label className='text-xl font-semibold mb-3'>Email</label>
                    <input placeholder='Email' className='mb-5 p-3 focus:outline-none' {...register('email', { required: true })} />
                    {errors?.email?.types === 'required' && <p className='text-red-800 mb-2'>Email is required</p>}</div>
                    <label className='text-xl font-semibold mb-3'>Password</label>
                    <div className='relative w-full'>
                        <input placeholder='Password' className='mb-5 w-full p-3 focus:outline-none' type={show ? 'text' : 'password'} {...register('password', { required: true, minLength: 6, pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/ })} />
                        <div onClick={() => setShow(!show)} className='absolute inset-y-0 right-3 top-3.5'>
                            {show ? <FaEye className='w-5 h-5' /> : <FaEyeSlash className='w-5 h-5' />}
                        </div>
                    </div>
                    {errors.password?.type === 'required' && <p className='text-red-800 -mt-2 mb-2'>Password is required</p>}
                    {errors.password?.type === 'minLength' && <p className='text-red-800 -mt-2 mb-2'>Password must be at least 6 characters</p>}
                    {errors.password?.type === 'pattern' && <p className='text-red-800 -mt-2 mb-2'>Password must have at least 1 capital letter and 1 special character</p>}
                    <label className='text-xl font-semibold mb-3'>Confirm Password</label>
                    <div className='relative w-full'>
                        <input placeholder='Password' className='mb-5 w-full p-3 focus:outline-none' type={showPass ? 'text' : 'password'} {...register('confirmPassword', { required: true, minLength: 6, pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/ })} />
                        <div onClick={() => setShowPass(!showPass)} className='absolute inset-y-0 right-3 top-3.5'>
                            {showPass ? <FaEye className='w-5 h-5' /> : <FaEyeSlash className='w-5 h-5' />}
                        </div>
                    </div>
                    {errors.confirmPassword?.type === 'required' && <p className='text-red-800 -mt-2 mb-2'>Password is required</p>}
                    {errors.confirmPassword?.type === 'minLength' && <p className='text-red-800 -mt-2 mb-2'>Password must be at least 6 characters</p>}
                    {errors.confirmPassword?.type === 'pattern' && <p className='text-red-800 -mt-2 mb-2'>Password must have at least 1 capital letter and 1 special character</p>}
                    {passwordError && <p className='text-red-800 -mt-2 mb-2'>{passwordError}</p>}
                    <label className='text-xl font-semibold mb-3'>Photo Url</label>
                    <input type="file" className="file-input file-input-bordered w-full mb-3" {...register('photo')} />
                    <p className='text-center p-3'>Already have an account? <Link to='/login'><span className='text-btn-color underline'>Login</span></Link></p>
                    <p className='text-red-800 py-3'>{error}</p>
                    <button type='submit' className='button mx-auto flex justify-center w-full'>Register</button>
                </form>
                <div onClick={handleGoogleSignIn} className='my-5 flex w-10/12 sm:w-full  mx-auto p-2 justify-between items-center hover:bg-black hover:text-white cursor-pointer border-2'>
                    <FcGoogle className='h-6 w-6' />
                    <p className='font-semibold mx-auto'>Continue with Google</p>
                </div>
            </div>

        </>
    );
};

export default Register;