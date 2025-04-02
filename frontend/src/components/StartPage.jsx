import React from 'react';
import { Link } from 'react-router-dom'

const StartPage = () => {
  return (
    <div className='font-[Roboto] font-medium w-screen h-screen grid grid-rows-2 md:grid-cols-2'>
      <div className='w-full h-full bg-white text-black flex flex-col justify-center items-center text-4xl md:h-screen'>
        <div className='flex flex-col items-center'>
          <p className='text-5xl'>ARE YOU A NEW USER?</p>
          <Link to='/signup'>
          <button
            className='mt-10 p-10 h-30 w-90 relative h-12 w-90 overflow-hidden border border-indigo-600 text-indigo-600 shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-indigo-600 before:duration-300 before:ease-out hover:text-white hover:shadow-indigo-600 hover:before:h-40 hover:before:w-90 hover:before:opacity-80'
          ><span class="relative z-10">Sign Up Now</span></button></Link>
        </div>
      </div>

      <div className='w-full h-full bg-gradient-to-b from-gray-800 to-gray-500 text-white flex flex-col justify-center items-center text-4xl md:h-screen'>
      <p className='text-5xl'>ALREADY A USER</p>
        <div className='flex flex-col items-center'>
        <Link to='/login'>
          <button
            className='mt-10 p-10 h-30 w-90 text-red hover:before:bg-red border-red-500 relative overflow-hidden border border-red-500 bg-white px-3 text-red-500 shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-red-500 before:transition-all before:duration-500 hover:text-white hover:shadow-red-500 hover:before:left-0 hover:before:w-full'
          ><span class="relative z-10">
            Login
            </span>
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StartPage;