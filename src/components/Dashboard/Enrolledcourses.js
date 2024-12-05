import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {getUserEnrolledCourses} from "../../services/operations/profileAPI"
import ProgressBar from "@ramonak/react-progress-bar";
import defaultimage from "../../assets/Images/aboutus2.webp"
import { useNavigate } from 'react-router-dom';

function Enrolledcourses() {

    const {token} = useSelector((state)=>state.auth)

    const [enrolledcourses , setenrolledcourses] = useState(null);
    // console.log("enrolled courses are " , enrolledcourses);
    const navigate= useNavigate();

    async function getenrolledcourses() {
        try {

            const response=await getUserEnrolledCourses(token);
            setenrolledcourses(response);
            // console.log("enrolled courses response =" , response)
            

        } catch(error) {
            console.log("unable to get enrolled courses for user")
        }
    }

    useEffect(()=> {
        getenrolledcourses();
    } , [] )

  return (

    

    <>
        <div className="text-3xl text-richblack-50">Enrolled Courses</div>
        {!enrolledcourses ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
        </div>
        ) : !enrolledcourses.length ? (
        <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
            You have not enrolled in any course yet.
            {/* TODO: Modify this Empty State */}
        </p>
        ) : (
        <div className="my-8 text-richblack-5">
            {/* Headings */}
            <div className="flex rounded-t-lg bg-richblack-500 ">
            <p className="w-[45%] px-5 py-3">Course Name</p>
            <p className="w-1/4 px-2 py-3">Duration</p>
            <p className="flex-1 px-2 py-3">Progress</p>
            </div>
            {/* Course Names */}
            {enrolledcourses.map((course, i, arr) => (
            <div
                className={`flex items-center border border-richblack-700 ${
                i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
                }`}
                key={i}
            >
                <div
                className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                onClick={() => {
                    navigate(
                    `/view-course/${course?._id}/section/${course.coursecontent?.[0]?._id}/sub-section/${course.coursecontent?.[0]?.subsection?.[0]?._id}`
                    )
                }}
                >
                <img
                    src={course.thumbnail || defaultimage}
                    alt="course_img"
                    className="h-14 w-14 rounded-lg object-cover"
                />
                <div className="flex max-w-xs flex-col gap-2">
                    <p className="font-semibold">{course.coursename}</p>
                    <p className="text-xs text-richblack-300">
                    {course.coursedescription.length > 50
                        ? `${course.coursedescription.slice(0, 50)}...`
                        : course.coursedescription}
                    </p>
                </div>
                </div>
                <div className="w-1/4 px-2 py-3">{course?.totalduration}</div>
                <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                <p>Progress: {course.progressPercentage || 0}%</p>
                <ProgressBar
                    completed={course.progressPercentage || 0}
                    height="8px"
                    isLabelVisible={false}
                />
                </div>
            </div>
            ))}
        </div>
        )}
  </>
  )
}

export default Enrolledcourses
