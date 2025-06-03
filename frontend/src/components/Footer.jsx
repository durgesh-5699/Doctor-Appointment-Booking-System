import React from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'


const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            {/*left section*/}
            <div>
                <img className='mb-5 w-40' src={assets.logo} alt="" />
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>Prescripto connects you with trusted healthcare professionals for seamless medical care. Your health journey starts here with reliable, accessible, and personalized healthcare solutions.</p>
            </div>

            {/*center section*/}
            <div>
                <p className='text-xl font-medium mb-5'>Company</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <NavLink to={'/'}><li>Home</li></NavLink>
                    <NavLink to={'/about'}><li>About Us</li></NavLink>
                    <NavLink to={'/contact'}><li>Contact Us</li></NavLink>
                    <NavLink to={'/'}><li>Privacy Policy</li></NavLink>
                </ul>
            </div>

            {/*right section*/}
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+91 7009027997</li>
                    <li>durgeshbhatt5699@gmail.com</li>
                </ul>
            </div>
        </div>

        {/*Copyright text*/}
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2025@ Prescripto - All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer