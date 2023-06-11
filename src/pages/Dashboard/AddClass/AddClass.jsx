import React from 'react';
import { useAuth } from '../../../components/Hooks/useAuth';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddClass = () => {
    const {user} = useAuth()

    const handleSubmit = async event =>{
        event.preventDefault()
        const form = event.target;
        const className = form.className.value;
        const classImage = form.classImage.files[0];
        const seats = parseInt(form.availableSeats.value);
        const price = parseFloat(form.price.value)

        const classPhoto = new FormData()
        classPhoto.append('image', classImage)

        const response = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_API_KEY}`, classPhoto)
        const image = response.data.data.display_url;

        const classes = {className, image: image, instructorEmail: user?.email, instructorName: user?.displayName, seats, price, status: 'Pending', enrolledStudents: 0}

        await axios.post(`${import.meta.env.VITE_BASE_URL}/all-classes`, classes)
        .then(res => {
            if (res.data.acknowledged) {
                Swal.fire({
                    icon: 'success',
                    text: 'Class added successfully',
                  })
            }
            console.log(res.data)
        })
        // console.log(response.data.data.display_url)

        // console.log(classImage.files[0])
    }
    return (
        <form onSubmit={handleSubmit} className='w-4/6 bg-base-300 shadow-2xl p-10 my-10'>
            <p className='text-3xl font-bold text-center my-5'>Add Class</p>
            <div className='flex justify-between w-full space-x-5'>
                <div className="form-control w-full">
                    <label htmlFor="" className='font-semibold mb-2'>Class name</label>
                    <input type="text" name="className" placeholder='Class Name' className='input input-bordered focus:outline-none' />
                </div>
                <div className="form-control w-full">
                    <label htmlFor="" className='font-semibold mb-2'>Class Image</label>
                    <input type="file" name='classImage' className="file-input file-input-bordered w-full" />
                </div>
            </div>
            <div className='flex justify-between w-full space-x-5 mt-5'>
                <div className="form-control w-full">
                    <label htmlFor="" className='font-semibold mb-2'>Instructor name</label>
                    <input type="text" name="instructorName" value={user?.displayName} placeholder='Instructor Name' className='input input-bordered focus:outline-none' />
                </div>
                <div className="form-control w-full">
                    <label htmlFor="" className='font-semibold mb-2'>Instructor Email</label>
                    <input type="text" name="instructorEmail" value={user?.email} placeholder='Instructor email' className='input input-bordered focus:outline-none' />
                </div>
            </div>
            <div className='flex justify-between w-full space-x-5 mt-5'>
                <div className="form-control w-full">
                    <label htmlFor="" className='font-semibold mb-2'>Available Seats</label>
                    <input type="text" name="availableSeats" placeholder='Available Seats' className='input input-bordered focus:outline-none' />
                </div>
                <div className="form-control w-full">
                    <label htmlFor="" className='font-semibold mb-2'>Price</label>
                    <input type="text" name="price" placeholder='price' className='input input-bordered focus:outline-none' />
                </div>
            </div>
            <button type='submit' className='btn btn-primary mt-5 w-full font-bold text-xl'>Add Class</button>
        </form>
    );
};

export default AddClass;