import React from 'react'
import "swiper/css"
import {Swiper , SwiperSlide} from "swiper/react"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Navigation, Pagination, Scrollbar, A11y , FreeMode } from 'swiper/modules';
// import course from '../../../server/models/course'
import CourseCard from './CourseCard'

function CourseSlider({courses}) {
  return (

    // <div>
    //   {
    //     courses?.length ? (
    //       <Swiper loop={true} slidesPerView={1} spaceBetween={100} modules={Pagination}  Pagination={true}>
    //         {
    //           courses?.map((course)=> {
    //             return <SwiperSlide key={course._id}>
    //               <CourseCard course={course} height={"h-[250px]"}></CourseCard>
    //             </SwiperSlide>
    //           })
    //         }
    //       </Swiper>
    //     ) : (<div> No coures are found</div>)
    //   }
    // </div>

    <>
        {
            courses?.length ? (
                <Swiper
                    slidesPerView={1}
                    spaceBetween={25}
                    loop={true}
                    navigation={true} 
                    modules={[FreeMode, Pagination, Navigation]}
                    breakpoints={{
                        1024: {
                        slidesPerView: 3,
                        },
                    }}
                    className="max-h-[30rem] mySwiper"
                >
                    {
                        courses?.map((course, index)=> (
                            <SwiperSlide key={index}>
                                <CourseCard course={course} Height={"h-[250px]"} />
                            </SwiperSlide>
                        ))
                    }   
                </Swiper>
            ) : (
                <p className="text-xl text-richblack-5">No Course Found</p>
            )

        }
    </>


  )
}

export default CourseSlider
