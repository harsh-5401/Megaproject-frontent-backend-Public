import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import defaultimage from "../../assets/Images/aboutus2.webp"
import defaultThumbnail from "../../assets/Images/aboutus2.webp"
import GetAvgRating from "../../utils/avgRating"
import RatingStars from "../../components/common/RatingStars"

function CourseCard({course , height}) {

    const [averagereviewcount , setaveragereviewcount] = useState(0)


    useEffect(()=> {
        const count= GetAvgRating(course.ratingAndreviews);
        setaveragereviewcount(count);
    },[course])


  return (

   

    <div>
        <Link to={`/courses/${course._id}`}>
            <div>
                <div className="rounded-lg">
                    <img 
                        src={course?.thumbnail || defaultimage}
                        alt='course ka thumbnail'
                        className={`${height} w-full rounded-xl object-cover `}
                    />
                </div>
                <div className="flex flex-col gap-2 px-1 py-3">
                    <p className="text-xl text-richblack-5">{course?.coursename}</p>
                    <p className="text-sm text-richblack-50">{course?.instructor?.firstname} {course?.instructor?.lastname} </p>
                    <div className="flex items-center gap-2">
                        <span className="text-yellow-5">{averagereviewcount || 0}</span>
                        <RatingStars Review_Count={averagereviewcount} />
                        <span className="text-richblack-400">{course?.ratingAndreviews?.length} Ratings</span>
                    </div>
                    <p className="text-xl text-richblack-5">{course?.price}</p>
                </div>
            </div>
        </Link>

      
    </div>

  )
}

export default CourseCard
