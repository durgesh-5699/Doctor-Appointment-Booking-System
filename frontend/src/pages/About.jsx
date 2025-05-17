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
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium minima magni, voluptas eveniet placeat repellat corrupti aperiam quam impedit esse? Consequuntur aliquid voluptate, sit nostrum ipsam ea officiis similique nesciunt totam accusantium vero minima quaerat.</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint sit porro velit ad, saepe illum aspernatur voluptatibus soluta odit eius perferendis, ab corrupti beatae fugiat unde non deserunt nemo commodi, sunt facere laboriosam? Eveniet blanditiis recusandae quos veniam non facilis quidem tenetur, sapiente dolorum voluptatem. Sapiente et voluptate aliquam atque?</p>
          <b className='text-gray-800'>Our Vision</b>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas laudantium similique sit expedita dicta, rerum praesentium optio delectus earum itaque deserunt incidunt natus consectetur tenetur ipsa consequatur magnam ut exercitationem.</p>
        </div>
      </div>

      <div className='text-xl my-4'>
        <p>WHY <span className='text-gray-700 font-semibold'> CHOOSE US</span></p>
      </div>

      <div className='flex flex-col  md:flex-row mb-20'>
         <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary  hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Efficiency : </b>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, architecto.</p>
         </div>

         <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary  hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Convenience : </b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, ipsum?</p>
         </div>

         <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary  hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Personalization : </b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, in!</p>
         </div>

      </div>
    </div>

  )
}

export default About