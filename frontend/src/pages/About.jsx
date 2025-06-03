import React from 'react'
import {assets} from '../assets/assets.js'

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600 '>
          <p>We are dedicated to connecting patients with trusted healthcare professionals through our innovative platform. Our mission is to make quality medical care accessible, convenient, and reliable for everyone in our community.</p>
          <p>Founded with the vision of transforming healthcare delivery, we bridge the gap between patients and doctors through technology. Our experienced team of healthcare professionals and tech experts work tirelessly to ensure seamless appointment scheduling, personalized care, and exceptional medical service experiences.</p>
          <b className='text-gray-800'>Our Vision</b>
          <p>To revolutionize healthcare accessibility by creating a seamless digital ecosystem where patients and healthcare providers connect effortlessly, ensuring quality medical care is available to everyone, everywhere, anytime.</p>
        </div>
      </div>

      <div className='text-xl my-4'>
        <p>WHY <span className='text-gray-700 font-semibold'> CHOOSE US</span></p>
      </div>

      <div className='flex flex-col  md:flex-row mb-20'>
         <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary  hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Efficiency : </b>
          <p>Streamlined booking eliminates waiting times. Quick appointments, instant confirmations, and efficient healthcare delivery ensure timely care without unnecessary delays or complications.</p>
         </div>

         <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary  hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Convenience : </b>
          <p>Access healthcare anywhere, anytime through our user-friendly platform. Easy doctor selection, flexible scheduling, and seamless communication make healthcare management effortless.</p>
         </div>

         <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary  hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Personalization : </b>
          <p>Tailored healthcare solutions based on your individual needs. Customized treatment plans, relevant doctor recommendations, and personalized care that adapts to you.</p>
         </div>

      </div>
    </div>

  )
}

export default About