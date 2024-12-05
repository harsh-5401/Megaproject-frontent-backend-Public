import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { resetpassword } from '../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEyeInvisible ,AiOutlineEye } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';


// function Updatepassword() {

//     const {loading} = useSelector((state)=> state.auth);
//     const [showpassword , setshowpassword] = useState(false);
//     const [showconfirmpassword , setshowconfirmpassword] = useState(false);
//     const dispatch=useDispatch();
//     const location=useLocation();
//     const navigate=useNavigate();

    

//     const [formdata , setformdata] = useState({
//         password: '',
//         confirmpassword:''
//     });

//     const{password , confirmpassword} = formdata;

//     function handleonchange(e) {
//         setformdata( (prevdata) => {
//            return  {
//                 ...prevdata,
//                 [e.target.name] : e.target.value
//             }
//         });
//     }

//     function handleonsubmit(e) {
//         e.preventDefault();
//         const token=location.pathname.split('/').at(-1);
//         console.log("url token is =" , token)
//         dispatch(resetpassword(password , confirmpassword , token , navigate));

//     }

//   return (
//     <div className='text-richblack-25'>
//         {
//             loading? (
//                 <div>loading..</div>
//             ) : (
//                 <div>
//                     <h1 className='text-yellow-25'>Choose new password</h1>
//                     <p>Almost done. Enter your new password and ypu are all set.</p>
//                     <form onSubmit={handleonsubmit}>
//                         <label>
//                             <p>New password <sup>*</sup></p>
//                             <input
//                             required
//                             type={showpassword ? 'text' : 'password'}
//                             name='password'
//                             onChange={handleonchange}
//                             value={formdata.password}
//                             placeholder='Password'
//                             ></input>
//                             <span onClick={()=> {
//                                 setshowpassword((prev)=> !prev)
//                             }}>
//                                 {
//                                     showpassword ? (<AiFillEyeInvisible fontSize={24}></AiFillEyeInvisible>) : ( <AiFillEye></AiFillEye>)
//                                 }
//                             </span>
//                         </label>

//                         <label>
//                             <p>Confirm New password <sup>*</sup></p>
//                             <input
//                             required
//                             type={showconfirmpassword ? 'text' : 'password'}
//                             name='confirmpassword'
//                             onChange={handleonchange}
//                             value={formdata.confirmpassword}
//                             placeholder='Confirm Password'
//                             ></input>
//                             <span onClick={()=> {
//                                 setshowconfirmpassword((prev)=> !prev)
//                             }}>
//                                 {
//                                     showconfirmpassword ? (<AiFillEyeInvisible fontSize={24}></AiFillEyeInvisible>) : ( <AiFillEye></AiFillEye>)
//                                 }
//                             </span>
//                         </label>

//                         <button type='submit'>Reset password</button>

//                         <div>
//                                 <Link to="/login">Back to login</Link>
//                         </div>
//                     </form>
//                 </div>
//             )
//         }
      
//     </div>
//   )
// }


function Updatepassword() {

    const {loading} = useSelector((state)=> state.auth);
    const [showpassword , setshowpassword] = useState(false);
    const [showconfirmpassword , setshowconfirmpassword] = useState(false);
    const dispatch=useDispatch();
    const location=useLocation();
    const navigate=useNavigate();

    

    const [formdata , setformdata] = useState({
        password: '',
        confirmpassword:''
    });

    const{password , confirmpassword} = formdata;

    function handleonchange(e) {
        setformdata( (prevdata) => {
           return  {
                ...prevdata,
                [e.target.name] : e.target.value
            }
        });
    }

    function handleonsubmit(e) {
        e.preventDefault();
        const token=location.pathname.split('/').at(-1);
        console.log("url token is =" , token)
        dispatch(resetpassword(password , confirmpassword , token , navigate));

    }

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            Choose new password
          </h1>
          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
            Almost done. Enter your new password and youre all set.
          </p>
          <form onSubmit={handleonsubmit}>
            <label className="relative">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                New Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type={showpassword ? "text" : "password"}
                name="password"
                value={formdata.password}
                onChange={handleonchange}
                placeholder="Enter Password"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
              />
              <span
                onClick={() => setshowpassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showpassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>
            <label className="relative mt-3 block">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Confirm New Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type={showconfirmpassword ? "text" : "password"}
                name="confirmPassword"
                value={formdata.confirmpassword}
                onChange={handleonchange}
                placeholder="Confirm Password"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
              />
              <span
                onClick={() => setshowconfirmpassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showconfirmpassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>

            <button
              type="submit"
              className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
            >
              Reset Password
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

export default Updatepassword
