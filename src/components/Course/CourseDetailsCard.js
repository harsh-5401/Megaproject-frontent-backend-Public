import React from 'react'
import defaultimage from "../../assets/Images/aboutus2.webp"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import { ACCOUNT_TYPE } from '../../utils/constants';
import { addtocart } from '../../slices/cartslice';
import { BiSolidRightArrow } from 'react-icons/bi';


function CourseDetailsCard({course , setconfirmationmodal , handlebuycourse}) {
    const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector((state)=>state.auth)
    const navigate = useNavigate();
    const dispatch= useDispatch();
    
    function handleAddtoCart() {
        if(user && user.accounttype===ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("You are a Instructor you cant buy a course")
        }

        if(token) {
            dispatch(addtocart(course));
            return 
        }

        setconfirmationmodal({
            text1:"You are not logged in",
            text2:"please login to add to cart",
            btn1text:"Login",
            btn2text:"Cancel",
            btn1Handler:()=>navigate("/login"),
            btn2Handler:()=>setconfirmationmodal(null)
          })
    }

    function handleshare() {
        copy(window.location.href);
        toast.success("copied to clipboard")
    }
    

    const {instructions} = course
    

    return (

    // <div>

    //   <div>
    //     <img src={course.thumbail || defaultimage} alt='thumbnail' className='max-h-[300px] w-[400px] min-h-[180px]' ></img>
    //   </div>

    //   <div>
    //    Rs. {course.price}
    //   </div>
    //   <div className='flex flex-col gap-y-6'>
    //     <button className='bg-yellow-50 w-fit text-richblack-700' onClick= { user && course?.studentsenrolled?.includes(user?._id) ? ()=> navigate("/dashboard/enrolled-courses") : ()=>handlebuycourse()}>
    //         {
    //             user && course?.studentsenrolled?.includes(user?._id) ? "Go to Course" : "Buy now"
    //         }
    //     </button>

    //     {
    //         (!course?.studentsenrolled?.includes(user?._id)) && (
    //             <button className='bg-yellow-50 w-fit text-richblack-700' onClick={handleAddtoCart}>
    //                 Add to Cart
    //             </button>
    //         )
    //     }
    //   </div>

    //   <div>

    //     <p>
    //         30 days MoneyBack Gaurantee
    //     </p>
    //     <p>This Course Incldes :</p>

    //     <div className='flex flex-col gap-y-3'>
    //         {
    //             JSON.parse(instructions).map((item , index)=> (
    //                 <p key={index}>
    //                     <span>{item}</span>
    //                 </p>
    //             ))
    //         }
    //     </div>

    //     <div>
    //         <button className='mx-auto items-center gap-2 p-6 text-yellow-50' onClick={handleshare}>
    //             Share
    //         </button>
    //     </div>

    //   </div>

        

    // </div>

    <div className='flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5'>
    <img 
        src={course.thumbnail || defaultimage}
        alt='Thumbnail Image'
        className='max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full'
    />
    <div className='px-4'>
    <div className='space-x-3 pb-4 text-3xl font-semibold'>
        Rs. {course.price}
    </div>
    <div className='flex flex-col gap-y-6'>
        <button className='yellowButton'
            onClick={
                user && course?.studentsenrolled.includes(user?._id)
                ? ()=> navigate("/dashboard/enrolled-courses")
                : ()=> handlebuycourse()
            }
        >
            {
                user && course?.studentsenrolled.includes(user?._id) ? "Go to Course ": "Buy Now"
            }
        </button>

    {
        (!course?.studentsenrolled.includes(user?._id)) && (
            <button onClick={handleAddtoCart} className='blackButton'>
                Add to Cart
            </button>
        )
    }
    </div>

    <div>
        <p className='pb-3 pt-6 text-center text-sm text-richblack-25'>
            30-Day Money-Back Guarantee
        </p> 
    </div>
    <div>
        <p className='my-2 text-xl font-semibold '>
            This Course Includes:
        </p>
        <div className='flex flex-col gap-3 text-sm text-caribbeangreen-100'>
            {
                JSON.parse(course?.instructions).map((item, index)=> (
                    <p key={index} className='flex gap-2'>
                       <BiSolidRightArrow/>
                        <span>{item}</span>
                    </p>
                ))
            }
        </div>
    </div>
    <div className='text-center'>
        <button
        className='mx-auto flex items-center gap-2 py-6 text-yellow-100 '
        onClick={handleshare}
        >
            Share
        </button>
    </div>
    </div>
</div>

  )
}

export default CourseDetailsCard
