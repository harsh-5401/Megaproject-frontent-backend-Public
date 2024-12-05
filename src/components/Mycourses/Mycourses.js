import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchInstructorCourses } from '../../services/operations/courseDetailsAPI';
import Iconbutton from '../common/Iconbutton';
import CoursesTable from './CoursesTable';
import { useNavigate } from 'react-router-dom';
import { VscAdd } from "react-icons/vsc"



function Mycourses() {
    const {token} = useSelector((state)=> state.auth);
    const navigate = useNavigate();
    const [courses , setcourses] = useState([])

    async function fetchcourses() {
        const result= await fetchInstructorCourses(token);
        console.log("instructor all courses data is " , result)
        if(result) {
            setcourses(result);
        }
    }

    useEffect(()=> {
        fetchcourses();
    },[])

  return (
    

    <div>
      <div className="mb-14 flex items-center justify-between">
        <h1 className=' text-3xl font-medium text-richblack-5'>My Courses</h1>
        <Iconbutton text="Add Course" 
        onclick={() => navigate("/dashboard/add-course")}>
          <VscAdd/>
        </Iconbutton>
      </div>
      {courses && <CoursesTable courses={courses} setCourses={setcourses}/>}
    </div>
  )
}

export default Mycourses
