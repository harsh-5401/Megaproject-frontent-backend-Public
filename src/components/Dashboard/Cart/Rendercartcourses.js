import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component";
import { GiNinjaStar } from 'react-icons/gi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { removefromcart } from '../../../slices/cartslice';
import defaultimage from "../../../assets/Images/aboutus1.webp"
import { FaStar } from 'react-icons/fa';


function Rendercartcourses() {
    const dispatch= useDispatch();
    const {cart} = useSelector((state)=>state.cart)
  return (
    // <div>
    //   {
    //     cart.map((course , index)=> {
    //     return <div key={index}>
    //             <div>
    //                 <img src={course?.thumbnail || defaultimage} alt='course thumbnail'></img>
    //                 <div>
    //                     <p>{course?.coursename}</p>
    //                     <p>{course?.category?.name}</p>
    //                 </div>
    //                 <div>
    //                     {/* rating */}
    //                     <span>4.8</span>

    //                     <ReactStars count={5} size={20} edit={false} activeColor="#ffd700" emptyIcon={<GiNinjaStar></GiNinjaStar>} fullIcon={<GiNinjaStar></GiNinjaStar>}  ></ReactStars>

    //                     <span>{course?.ratingAndreviews?.length}</span>
    //                 </div>
    //             </div>
    //             <div>
    //                 <button onClick={()=>dispatch(removefromcart(course._id))}>
    //                     <RiDeleteBin6Line></RiDeleteBin6Line>
    //                     <span>Remove</span>
                    
    //                 </button>

    //                 <p>{course?.price}</p>
    //             </div>
    //         </div>
    //     })
    //   }
    // </div>


    <div className="flex flex-1 flex-col">
    {cart.map((course, indx) => (
      <div
        key={course._id}
        className={`flex w-full flex-wrap items-start justify-between gap-6 ${
          indx !== cart.length - 1 && "border-b border-b-richblack-400 pb-6"
        } ${indx !== 0 && "mt-6"} `}
      >
        <div className="flex flex-1 flex-col gap-4 xl:flex-row">
          <img
            src={course?.thumbnail || defaultimage}
            alt={course?.coursename}
            className="h-[148px] w-[220px] rounded-lg object-cover"
          />
          <div className="flex flex-col space-y-1">
            <p className="text-lg font-medium text-richblack-5">
              {course?.coursename}
            </p>
            <p className="text-sm text-richblack-300">
              {course?.category?.name}
            </p>
            <div className="flex items-center gap-2">
            {/* {getRating(course)} */}
              <span className="text-yellow-5">4.5</span>
              <ReactStars
                count={5}
                value={course?.ratingAndReviews?.length || 0}  
                size={20}
                edit={false}
                activeColor="#ffd700"
                emptyIcon={<FaStar />}
                fullIcon={<FaStar />}
              />
              <span className="text-richblack-400">
                {course?.ratingAndreviews?.length} Ratings
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <button
            onClick={() => dispatch(removefromcart(course._id))}
            className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200"
          >
            <RiDeleteBin6Line />
            <span>Remove</span>
          </button>
          <p className="mb-6 text-3xl font-medium text-yellow-100">
            ₹ {course?.price}
          </p>
        </div>
      </div>
    ))}
  </div>

  )
}

export default Rendercartcourses