import React, { useEffect, useState } from 'react'
import { getInstructorData } from '../../services/operations/profileAPI';
import { useSelector } from 'react-redux';
import { fetchInstructorCourses } from '../../services/operations/courseDetailsAPI';
import { Link } from 'react-router-dom';
// import course from '../../../server/models/course';
import InstructorChart from './InstructorChart';
import defaultimage from "../../assets/Images/aboutus2.webp"


function InstructorDashboard() {

    const [loading , setloading ] = useState(false);
    const [instructorData , setinstructorData ] = useState(null);
    const [courses , setcourses ] = useState([]);
    const {token} = useSelector((state)=>state.auth);
    const {user}= useSelector((state)=>state.profile)


    useEffect(()=> {
        async function getcourseDatawithstats() {
            setloading(true);
            const instrctrorapidata= await getInstructorData(token);
            console.log("INSTRTOR API DATA" , instrctrorapidata)
            const result= await fetchInstructorCourses(token);
            console.log("INSTRTOR API DATA" , instrctrorapidata)
            console.log("INSTRTOR courses API DATA" , result);
            setcourses(result);
            setinstructorData(instrctrorapidata);
            setloading(false)

        }
        getcourseDatawithstats()
    },[])

    const totalamount= instructorData?.reduce((acc, curr)=>acc+ curr.totalamountGenerated , 0 );
    const totalstudents= instructorData?.reduce((acc, curr)=>acc+ curr.totalstudentEnrolled , 0 );

  return (
    // <div className='text-brown-100 flex flex-col'>

    //   <div>
    //     <h1>{user?.firstname}</h1>
    //     <p>Lets start something New ..</p>
    //   </div>

    //   {
    //     loading ? (<div className='spinner'></div>) : (
    //         courses.length > 0 ?  (

    //         <div className='flex flex-col ' >

    //             <div className='flex-row'>
    //                 <InstructorChart courses={instructorData}></InstructorChart>
                    
    //                 <div>
    //                     <div>
                            
    //                         <p>Statistics</p>
                            
    //                         <div>
    //                             <p>Total Courses</p>
    //                             <p>{courses.length}</p>

    //                         </div>

    //                         <div>
    //                             <p>Total Students</p>
    //                             <p>{totalstudents}</p>

    //                         </div>

    //                         <div>
    //                             <p>Total Income</p>
    //                             <p>{totalamount}</p>

    //                         </div>

    //                     </div>
    //                 </div>

    //             </div>

    //             <div className='flex-col'>

    //                 {/* render 3 courses  */}

    //                 <div className='flex flex-row items-end'>
    //                     <p>Your courses</p>
    //                     <Link to="/dashboard/my-courses">
    //                         <p>view all</p>
    //                     </Link>
    //                 </div>

    //                 <div>
    //                     {
    //                         courses.slice(0,3).map((course)=> {
    //                             return <div key={course._id}>

    //                                 <img src={course.thumbnail || defaultimage } alt='thumbailimage'></img>

    //                                 <div>
    //                                     <p>{course.coursename}</p>
    //                                     <div className='flex'>
    //                                         <p>{course?.studentsenrolled?.length} Students</p>
    //                                         <p>|</p>
    //                                         <p>Rs {course?.price}</p>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         })
    //                     }
    //                 </div>
    //             </div>

    //         </div>
    //         ) : (
    //             <div>
    //                 <p>You have not created any course</p>
    //                 <Link to="/dashboard/add-course">
    //                     <div className='bg-yellow-50 p-5'>Create a course</div>
    //                 </Link>
    //             </div>
    //         )
    //     )
    //   }
    // </div>


    <div>
    <div className="space-y-2">
      <h1 className="text-2xl font-bold text-richblack-5">
        Hi {user?.firstname} 👋
      </h1>
      <p className="font-medium text-richblack-200">
        Let's start something new
      </p>
    </div>
    {
      loading ? (
      <div className="spinner"></div>
    ) : courses.length > 0 ? (
      <div>
        <div className="my-4 flex h-[450px] space-x-4">
          {/* Render chart / graph */}
          {totalamount > 0 || totalstudents > 0 ? (
            <InstructorChart courses={instructorData} />
          ) : (
            <div className="flex-1 rounded-md bg-richblack-800 p-6">
              <p className="text-lg font-bold text-richblack-5">Visualize</p>
              <p className="mt-4 text-xl font-medium text-richblack-50">
                Not Enough Data To Visualize
              </p>
            </div>
          )}
          {/* Total Statistics */}
          <div className="flex min-w-[250px] flex-col rounded-md bg-richblack-800 p-6">
            <p className="text-lg font-bold text-richblack-5">Statistics</p>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-lg text-richblack-200">Total Courses</p>
                <p className="text-3xl font-semibold text-richblack-50">
                  {courses.length}
                </p>
              </div>
              <div>
                <p className="text-lg text-richblack-200">Total Students</p>
                <p className="text-3xl font-semibold text-richblack-50">
                  {totalstudents}
                </p>
              </div>
              <div>
                <p className="text-lg text-richblack-200">Total Income</p>
                <p className="text-3xl font-semibold text-richblack-50">
                  Rs. {totalamount}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-md bg-richblack-800 p-6">
          {/* Render 3 courses */}
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold text-richblack-5">Your Courses</p>
            <Link to="/dashboard/my-courses">
              <p className="text-xs font-semibold text-yellow-50">View All</p>
            </Link>
          </div>
          <div className="my-4 flex items-start space-x-6">
            {courses.slice(0, 3).map((course) => (
              <div key={course._id} className="w-1/3">
                <img
                  src={course.thumbnail || defaultimage}
                  alt={course.coursename}
                  className="h-[201px] w-full rounded-md object-cover"
                />
                <div className="mt-3 w-full">
                  <p className="text-sm font-medium text-richblack-50">
                    {course.coursename}
                  </p>
                  <div className="mt-1 flex items-center space-x-2">
                    <p className="text-xs font-medium text-richblack-300">
                      {course.studentsenrolled.length} students
                    </p>
                    <p className="text-xs font-medium text-richblack-300">
                      |
                    </p>
                    <p className="text-xs font-medium text-richblack-300">
                      Rs. {course.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ) : (
      <div className="mt-20 rounded-md bg-richblack-800 p-6 py-20">
        <p className="text-center text-2xl font-bold text-richblack-5">
          You have not created any courses yet
        </p>
        <Link to="/dashboard/add-course">
          <p className="mt-1 text-center text-lg font-semibold text-yellow-50">
            Create a course
          </p>
        </Link>
      </div>
    )}
  </div>

  )
}

export default InstructorDashboard
