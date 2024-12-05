import React, { useState } from 'react'
import {  useDispatch,useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getpasswordresetToken } from '../services/operations/authAPI';
import { BiArrowBack } from "react-icons/bi"



// function Forgetpassword() {

//     const {loading} = useSelector((state) => state.auth)
//     const [email , setemail] = useState("");
//     const [emailsend , setemailsend] = useState(false);
//     const dispatch=useDispatch();

//     function handleonsubmit(e) {
//         e.preventDefault();
//         dispatch(getpasswordresetToken(email , setemailsend))
//     }

//   return (
//     <div className='flex justify-center items-center'>
//         <div className='text-richblack-50'>
//             {
//                 loading ? (
//                     <div>Loading...</div>
//                 ) : (
//                     <div>
//                         <h1 className='text-richblack-50'>
//                             {
//                                 !emailsend ? "Reset your Password" : "Check your email"
//                             }
//                         </h1>

//                         <p>
//                             {
//                                 !emailsend ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery" : 
//                                 `We have sent the reset email to ${email}`
//                             }
//                         </p>

//                         <form onSubmit={handleonsubmit}>
//                             {
//                                 !emailsend && (
//                                     <label>
//                                         <p>Email Address</p>
//                                         <input required type='email' name='email' value={email} placeholder='Enter your email Address'
//                                         onChange={(e) => setemail(e.target.value)} ></input>
//                                     </label>
//                                 )
//                             }

//                             <button type='submit'>
//                                 {
//                                     !emailsend? "Reset password" : "Resend email"
//                                 }
//                             </button>

//                             <div>
//                                 <Link to="/login">Back to login</Link>
//                             </div>

                            
//                         </form>
//                     </div>
//                 )
//             }
            
//         </div>

        
//     </div>
//   )
// }


function Forgetpassword() {

    const {loading} = useSelector((state) => state.auth)
    const [email , setemail] = useState("");
    const [emailsend , setemailsend] = useState(false);
    const dispatch=useDispatch();

    function handleonsubmit(e) {
        e.preventDefault();
        dispatch(getpasswordresetToken(email , setemailsend))
    }

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            {!emailsend ? "Reset your password" : "Check email"}
          </h1>
          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
            {!emailsend
              ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
              : `We have sent the reset email to ${email}`}
          </p>
          <form onSubmit={handleonsubmit}>
            {!emailsend && (
              <label className="w-full">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  Email Address <sup className="text-pink-200">*</sup>
                </p>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  placeholder="Enter email address"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                />
              </label>
            )}
            <button
              type="submit"
              className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
            >
              {!emailsend ? "Sumbit" : "Resend Email"}
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <Link to="/login">
              <p className="flex items-center gap-x-2 text-richblack-5">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default Forgetpassword