// import React, { useEffect, useState } from 'react'

import React, { useEffect, useState } from "react"
import { apiconnector } from "../../services/apiconnector"
import { ratingsEndpoints } from "../../services/apis"
import ReactStars from "react-rating-stars-component"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import 'swiper/css/navigation';
import "swiper/css/pagination"
import "../../App.css"
// Icons
import { FaStar } from "react-icons/fa"
// Import required modules
import { Autoplay, FreeMode, Pagination, Navigation } from "swiper/modules"





function Reviewslider() {
  const [reviews , setreviews] = useState([]);
  const truncateWords=15;

  useEffect(()=> {
    async function fetchAllreviews() {
     const {data}= await apiconnector("GET" , ratingsEndpoints.REVIEWS_DETAILS_API)
     console.log("review data is " , data);

    //  const {AllRatingandReviews}= response;
     if(data?.success) {
      setreviews(data?.AllRatingandReviews);
     }

     console.log("PRINTING REVIEWS=" , reviews)
     
    }
    fetchAllreviews();
  },[])

  return (
    // <div className='text-white'>

    //   <div className='h-[190px] max-w-maxContent'>
    //     <Swiper slidesPerView={4} spaceBetween={24} loop={true} autoplay={{delay:2500}} modules={[FreeMode , Pagination , Autoplay]}>


    //         {
    //           reviews.map((review , index) => {
    //            return <SwiperSlide key={index}>
    //               <img src={review.user.image || `https://api.dicebear.com/5.x/initials/svg?seed=${review.user.firstname}-${review.user.lastname}`} alt='userImage' className='h-9 w-9 object-cover rounded-full'></img>
    //               <p>{review.course.coursename}</p>
    //               <p>{review.user.firstname} {review.user.lastname}</p>
    //               <p>{review?.review}</p>
    //               <p>{review?.rating.toFixed(1)}</p>
    //               <Reactstars count={5} value={review?.rating} size={20} edit={false} fullIcon={<FaStar></FaStar>} emptyIcon={<FaStar></FaStar>} activeColor="" ></Reactstars>
    //             </SwiperSlide>
    //           })
    //         }

    //     </Swiper> 
    //   </div>
      
    // </div>

    <div className="text-white w-full">
      <div className="my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent">
        <Swiper
          slidesPerView={4}
          spaceBetween={25}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          
          modules={[FreeMode, Pagination, Autoplay]}
          className="w-full "
        >
          {reviews.map((review, i) => {
            return (
              <SwiperSlide key={i}>
                <div className=" flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25">
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        review?.user?.image
                          ? review?.user?.image
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                      }
                      alt=""
                      className="h-9 w-9 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <h1 className="font-semibold text-richblack-5">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                      <h2 className="text-[12px] font-medium text-richblack-500">
                        {review?.course?.courseName}
                      </h2>
                    </div>
                  </div>
                  <p className="font-medium text-richblack-25">
                    {review?.review.split(" ").length > truncateWords
                      ? `${review?.review
                          .split(" ")
                          .slice(0, truncateWords)
                          .join(" ")} ...`
                      : `${review?.review}`}
                  </p>
                  <div className="flex items-center gap-2 ">
                    <h3 className="font-semibold text-yellow-100">
                      {review.rating.toFixed(1)}
                    </h3>
                    <ReactStars
                      count={5}
                      value={review.rating}
                      size={20}
                      edit={false}
                      activeColor="#ffd700"
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                    />
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
          {/* <SwiperSlide>Slide 1</SwiperSlide> */}
        </Swiper>
      </div>
    </div>

  )
}

export default Reviewslider
