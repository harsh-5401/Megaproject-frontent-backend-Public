import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Iconbutton from '../common/Iconbutton'
import { RiEditBoxLine } from 'react-icons/ri'
import {formattedDate} from "../../utils/dateFormatter"

function Myprofile() {
    const {user} = useSelector((state)=>state.profile)
    const navigate=useNavigate()
  return (

    // <div>
    //   <h1 className='text-white'>My Profile</h1>

    // {/* section 1 */}
    //   <div className='text-white'>

    //     <div>
    //         <img src={user?.image} alt={`profile-${user?.firstname}`} className='aspect-square w-[78px] rounded-full object-cover'></img>

    //         <div>
    //             <p>{user?.firstname + " " + user?.lastname}</p>
    //             <p>{user.email}</p> 
    //         </div>
    //     </div>

    //     <Iconbutton text={"Edit"} onclick={()=>{
    //         navigate("/dashboard/settings")
    //     }}></Iconbutton>

    //   </div>

    //   {/* section 2 */}
    //   <div className='text-white'>
    //     <div>
    //       <p>About</p>
    //       <Iconbutton text={"Edit"} onclick={()=>{
    //         navigate("/dashboard/settings")
    //       }}></Iconbutton>
    //     </div>
    //     <p>{user?.additionalDetails?.About ?? "Write something about yourself"}</p>
    //   </div>

    //   {/* section 3 */}
    //       <div>
    //         <div>
    //           <p>Personal Details</p>
    //           <Iconbutton text={"Edit"} onclick={()=>{
    //           navigate("/dashboard/settings")
    //           }}></Iconbutton>
    //         </div>

    //         <div className='text-white'>
    //           <div>
    //             <p>First Name</p>
    //             <p>{user?.firstname}</p>
    //           </div>

    //           <div>
    //             <p>Email</p>
    //             <p>{user?.email}</p>
    //           </div>

    //           <div>
    //             <p>Gender</p>
    //             <p>{user?.additionalDetails?.gender ?? "Add gender"}</p>
    //           </div> 

    //           <div>
    //             <p>Last Name</p>
    //             <p>{user?.lastname}</p>
    //           </div>

    //           <div>
    //             <p>Phone number</p>
    //             <p>{user?.additionalDetails.number ?? "Add contact number"}</p>
    //           </div>

    //           <div>
    //             <p>Date of Birth</p>
    //             <p>{user?.additionalDetails?.dateofbirth ?? "Add date of birth"}</p>
    //           </div>

    //         </div>
    //       </div>

    // </div>

    <>
    <h1 className="mb-14 text-3xl font-medium text-richblack-5">
      My Profile
    </h1>
    <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
      <div className="flex items-center gap-x-4">
        <img
          src={user?.image}
          alt={`profile-${user?.firstname}`}
          className="aspect-square w-[78px] rounded-full object-cover"
        />
        <div className="space-y-1">
          <p className="text-lg font-semibold text-richblack-5">
            {user?.firstname + " " + user?.lastname}
          </p>
          <p className="text-sm text-richblack-300">{user?.email}</p>
        </div>
      </div>
      <Iconbutton
        text="Edit"
        onclick={() => {
          navigate("/dashboard/settings")
        }}
      >
        <RiEditBoxLine />
      </Iconbutton>
    </div>
    <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
      <div className="flex w-full items-center justify-between">
        <p className="text-lg font-semibold text-richblack-5">About</p>
        <Iconbutton
          text="Edit"
          onclick={() => {
            navigate("/dashboard/settings")
          }}
        >
          <RiEditBoxLine />
        </Iconbutton>
      </div>
      <p
        className={`${
          user?.additionalDetails?.About
            ? "text-richblack-5"
            : "text-richblack-400"
        } text-sm font-medium`}
      >
        {user?.additionalDetails?.About ?? "Write Something About Yourself"}
      </p>
    </div>
    <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
      <div className="flex w-full items-center justify-between">
        <p className="text-lg font-semibold text-richblack-5">
          Personal Details
        </p>
        <Iconbutton
          text="Edit"
          onclick={() => {
            navigate("/dashboard/settings")
          }}
        >
          <RiEditBoxLine />
        </Iconbutton>
      </div>
      <div className="flex max-w-[500px] justify-between">
        <div className="flex flex-col gap-y-5">
          <div>
            <p className="mb-2 text-sm text-richblack-600">First Name</p>
            <p className="text-sm font-medium text-richblack-5">
              {user?.firstname}
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm text-richblack-600">Email</p>
            <p className="text-sm font-medium text-richblack-5">
              {user?.email}
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm text-richblack-600">Gender</p>
            <p className="text-sm font-medium text-richblack-5">
              {user?.additionalDetails?.gender ?? "Add Gender"}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-y-5">
          <div>
            <p className="mb-2 text-sm text-richblack-600">Last Name</p>
            <p className="text-sm font-medium text-richblack-5">
              {user?.lastname}
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
            <p className="text-sm font-medium text-richblack-5">
              {user?.additionalDetails?.number ?? "Add Contact Number"}
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
            <p className="text-sm font-medium text-richblack-5">
              {formattedDate(user?.additionalDetails?.dateofbirth) ??
                "Add Date Of Birth"}
            </p>
          </div>
        </div>
      </div>
    </div>
  </>

  )
}

export default Myprofile
