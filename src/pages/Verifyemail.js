import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OTPInput from 'react-otp-input';
import { Link, useNavigate } from 'react-router-dom';
import { sendOtp , signUp } from '../services/operations/authAPI';
import { BiArrowBack } from "react-icons/bi"
import { RxCountdownTimer } from 'react-icons/rx';


// function Verifyemail() {
//     const {loading , signupData} =useSelector((state) => state.auth);
//     const [otp , setotp] = useState("")
//     const dispatch=useDispatch()
//     const navigate=useNavigate();

//     // what if we dont have any data in signupdata

//     useEffect(()=> {
//         if(!signupData) {
//             navigate("/signup")
//         }
//     })

//     function handleonsubmit(e) {
//         e.preventDefault();

//         console.log("signupdata =" , signupData)

//         const  {
//             firstname , 
//             lastname , 
//             accounttype , 
//             password  , 
//             confirmpassword,
//             email , 
            
//         } =signupData

//         dispatch(signUp(accounttype , firstname , lastname , password, confirmpassword , otp , email , navigate));

//     }
//   return (
//     <div>
//       {
//         loading ? (<div>Loading..</div>) : (
//             <div className='text-yellow-25 flex flex-col justify-center items-center'>
//                 <p>Verify Email</p>
//                 <p>A verification code is send to you. Enter the code below</p>
//                 <form onSubmit={handleonsubmit} className='text-richblack-400' >
//                     <OTPInput value={otp} onChange={setotp} numInputs={6} renderSeparator={<span>-</span>} renderInput={(props) => <input className='text-richblack-800 ' {...props} />} >

//                     </OTPInput>

//                     <button type='submit' className='text-yellow-25'>Verify Email</button>

//                 </form>

//                 <div>
//                     <div>
//                         <Link to="/login">Back to login</Link>
//                     </div>

//                     <button onClick={()=> dispatch(sendOtp(signupData.email , navigate))}>Resend it</button>

//                 </div>

                
//             </div>
//         )
//       }
//     </div>
//   )
// }


function Verifyemail() {
    const {loading , signupData} =useSelector((state) => state.auth);
    const [otp , setotp] = useState("")
    const dispatch=useDispatch()
    const navigate=useNavigate();

    // what if we dont have any data in signupdata

    useEffect(()=> {
        if(!signupData) {
            navigate("/signup")
        }
    })

    function handleonsubmit(e) {
        e.preventDefault();

        console.log("signupdata =" , signupData)

        const  {
            firstname , 
            lastname , 
            accounttype , 
            password  , 
            confirmpassword,
            email , 
            
        } =signupData

        dispatch(signUp(accounttype , firstname , lastname , password, confirmpassword , otp , email , navigate));

    }
  return (
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
      {loading ? (
        <div>
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
            Verify Email
          </h1>
          <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
            A verification code has been sent to you. Enter the code below
          </p>
          <form onSubmit={handleonsubmit}>
            <OTPInput
              value={otp}
              onChange={setotp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />
            <button
              type="submit"
              className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
            >
              Verify Email
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <Link to="/signup">
              <p className="text-richblack-5 flex items-center gap-x-2">
                <BiArrowBack /> Back To Signup
              </p>
            </Link>
            <button
              className="flex items-center text-blue-100 gap-x-2"
              onClick={() => dispatch(sendOtp(signupData.email))}
            >
              <RxCountdownTimer />
              Resend it
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Verifyemail