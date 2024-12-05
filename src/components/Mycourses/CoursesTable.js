import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { COURSE_STATUS } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../common/ConfirmationModal';
import { deleteCourse, fetchInstructorCourses } from '../../services/operations/courseDetailsAPI';
import defaultimage from "../../assets/Images/aboutus2.webp"
import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { formatDate } from '../../services/formatDate';
import { RiDeleteBin6Line } from 'react-icons/ri';


function CoursesTable({courses , setcourses}) {


    const {token} = useSelector((state)=> state.auth);
    const[loading , setloading] = useState(false)
    const dispatch= useDispatch();
    const navigate= useNavigate();
    const[confirmationModal , setconfirmationModal]=useState(null)
    const TRUNCATE_LENGTH = 30


    async function handleCourseDelete(courseid) {
        setloading(true);
        const deletedCourse= await deleteCourse({courseid:courseid} , token);
        console.log("deleted course is " , deletedCourse);
        const result= await fetchInstructorCourses(token);
        console.log("updated instructor courses after deletion " , result);
        if(result) {
            setcourses(result);
        }
        setconfirmationModal(null)
        setloading(false)

    }


  return (
    // <div>
    //   <Table className='text-richblack-25'>
    //     <Thead>
    //         <Tr className='flex justify-between'>
    //             <Th>
    //                 Courses
    //             </Th>
    //             <Th>
    //                 Duration
    //             </Th>
    //             <Th>
    //                 Price
    //             </Th>
    //             <Th>
    //                 Actions
    //             </Th>
    //         </Tr>
    //     </Thead>

    //     <Tbody className='flex flex-col gap-y-4 mt-4'>
    //         {
    //             courses.length===0 ? (<Tr>
    //                 <Td>
    //                     No Courses found
    //                 </Td>
    //             </Tr>) : (
    //                 courses.map ((course)=> {
    //                     return <Tr key={course._id} className='flex justify-between'>

    //                         <Td className='flex'>
    //                             <img src={course?.thumbnail || defaultimage} alt='Thumbnail not found' className='h-[150px] w-[220px] rounded-lg object-cover'></img>
    //                             <div className='flex flex-col gap-y-2'>
    //                                 <p>{course.coursename}</p>
    //                                 <p>{course.coursedescription}</p>
    //                                 <p>Created at : </p>
    //                                 {
    //                                     course.state === COURSE_STATUS.DRAFT ? (
    //                                         <p className='text-pink-50'>DRAFTED</p>
    //                                     ) : (
    //                                         <p className='text-yellow-50'>PUBLISHED</p>
    //                                     )
    //                                 }
    //                             </div>
    //                         </Td>

    //                         <Td>
    //                             2hr 30min
    //                         </Td>

    //                         <Td>
    //                             {course.price}
    //                         </Td>

    //                                 {/* edit and delete course button  */}
    //                         <Td className='flex flex-col gap-y-1'>
    //                             <button disabled={loading} 
    //                             onClick={ ()=> {navigate(`/dashboard/edit-course/${course._id}`)}}
    //                             >
    //                                 Edit
    //                             </button>

    //                             <button disabled={loading} onClick={()=> {
    //                                 setconfirmationModal(
    //                                     {
    //                                         text1:"Do you want to delete this Course",
    //                                         text2:"All the Data related to this Course will be deleted",
    //                                         btn1text:"Delete",
    //                                         btn2text:"Cancel",
    //                                         btn1Handler:!loading ? ()=>handleCourseDelete(course._id) : ()=> {},
    //                                         btn2Handler:!loading ? ()=>setconfirmationModal(null) : ()=> {}
                                            
    //                                     }
    //                                 )
    //                             }}>
    //                                 Delete
    //                             </button>
    //                         </Td>
    //                     </Tr>
    //                 })
    //             )
    //         }
    //     </Tbody>
    //   </Table>

    //   {
    //     confirmationModal && (<ConfirmationModal modaldata={confirmationModal}></ConfirmationModal>)
    //   }
    // </div>

    <>
      <Table className="rounded-xl border border-richblack-800 ">
        <Thead>
          <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
            <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
              Courses
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Duration
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Price
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Actions
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {courses?.length === 0 ? (
            <Tr>
              <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                No courses found
                {/* TODO: Need to change this state */}
              </Td>
            </Tr>
          ) : (
            courses?.map((course) => (
              <Tr
                key={course._id}
                className="flex gap-x-10 border-b border-richblack-800 px-6 py-8"
              >
                <Td className="flex flex-1 gap-x-4">
                  <img
                    src={course?.thumbnail || defaultimage}
                    alt={course?.coursename}
                    className="h-[148px] w-[220px] rounded-lg object-cover"
                  />
                  <div className="flex flex-col justify-between">
                    <p className="text-lg font-semibold text-richblack-5">
                      {course.coursename}
                    </p>
                    <p className="text-xs text-richblack-300">
                      {course.coursedescription.split(" ").length >
                      TRUNCATE_LENGTH
                        ? course.coursedescription
                            .split(" ")
                            .slice(0, TRUNCATE_LENGTH)
                            .join(" ") + "..."
                        : course.coursedescription}
                    </p>
                    <p className="text-[12px] text-white">
                      Created: {formatDate(course.createdAt)}
                    </p>
                    {course.status === COURSE_STATUS.DRAFT ? (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                        <HiClock size={14} />
                        Drafted
                      </p>
                    ) : (
                      <div className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                        <p className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                          <FaCheck size={8} />
                        </p>
                        Published
                      </div>
                    )}
                  </div>
                </Td>
                <Td className="text-sm font-medium text-richblack-100">
                  {/* {getDuration(course)} */}
                </Td>
                <Td className="text-sm font-medium text-richblack-100">
                  ₹{course.price}
                </Td>
                <Td className="text-sm font-medium text-richblack-100 ">
                  <button
                    disabled={loading}
                    onClick={() => {
                      navigate(`/dashboard/edit-course/${course._id}`)
                    }}
                    title="Edit"
                    className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                  >
                    <FiEdit2 size={20} />
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => {
                        setconfirmationModal({
                        text1: "Do you want to delete this course?",
                        text2:
                          "All the data related to this course will be deleted",
                        btn1text: !loading ? "Delete" : "Loading...  ",
                        btn2text: "Cancel",
                        btn1Handler: !loading
                          ? () => handleCourseDelete(course._id)
                          : () => {},
                        btn2Handler: !loading
                          ? () => setconfirmationModal(null)
                          : () => {},
                      })
                    }}
                    title="Delete"
                    className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>

  )
}

export default CoursesTable
