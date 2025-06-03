import { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorProfile = () => {
  const {dToken,backend_url,profile,setProfile,getProfileData} = useContext(DoctorContext)
  const {currency} = useContext(AppContext)

  const [isEdit ,setIsEdit] = useState(false)

  const updateProfile = async()=>{
    try{
      const updateData = {
        address:profile.address,
        fees:profile.fees,
        available:profile.available
      }

      const {data} = await axios.post(backend_url + '/api/doctor/update-profile',updateData,{headers:{dToken}})
      if(data.success){
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      }else{
        toast.error(data.message)
      }
    }catch(error){
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(dToken){
      getProfileData()
    }
  },[dToken])
  return profile && (
    <div>
      
      <div className='flex flex-col gap-4 m-5 '>
        <div>
          <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg' src={profile.image} alt="" />
        </div>

        <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>
          <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{profile.name}</p>
          <div className='flex items-center gap-2 mt-1 text-gray-600'>
            <p>{profile.degree}-{profile.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{profile.experience}</button>
          </div>

          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3'>About:</p>
            <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{profile.about}</p>
          </div>

          <p className='text-gray-600 font-medium mt-4'>Appointment Fee : <span className='text-gray-800'>{currency}{isEdit? <input type='number' onChange={(e)=>setProfile(prev=>({...prev,fees:e.target.value}))} value={profile.fees}/>  : profile.fees}</span></p>

          <div className='flex gap-2 py-2'>
            <p>Address</p>
            <p className='text-sm'>
              {isEdit ? <input type="text" onChange={(e)=>setProfile(prev=>({...prev,address:{...prev.address,line1:e.target.value}}))} value={profile.address?.line1}/> : profile.address?.line1}
              <br />
              {isEdit ? <input type="text" onChange={(e)=>setProfile(prev=>({...prev,address:{...prev.address,line2:e.target.value}}))} value={profile.address?.line2}/> : profile.address?.line2}
            </p>
          </div>

          <div className='flex pt-2 gap-1'>
            <input onChange={()=> isEdit && setProfile(prev=>({...prev,available:!prev.available}))} checked={profile.available || false} type="checkbox" name='' id=''/>
            <label htmlFor="">Available</label>
          </div>

          {
            isEdit
            ?<button onClick={updateProfile} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Save</button>
            :<button onClick={()=>setIsEdit(true)} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Edit</button>
          }

        </div>
      </div>

    </div>
  )
}

export default DoctorProfile