import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Rendersteps from '../Addcourse/Rendersteps';
import { getFullDetailsOfCourse } from '../../services/operations/courseDetailsAPI';
import { seteditcourse , setcourse } from '../../slices/courseSlice';

function EditCourse() {

    const[loading , setloading] = useState(false);
    const dispatch= useDispatch();
    const {course} = useSelector((state)=> state.course)
    const {token} = useSelector((state)=> state.auth)
    const { courseid } = useParams()

    

   

    useEffect(() => {
        ;(async () => {
          setloading(true)
          const result = await getFullDetailsOfCourse(courseid, token)
          console.log("course to be ediited info" , result)
          if (result?.courseDetails) {
            dispatch(seteditcourse(true))
            dispatch(setcourse(result?.courseDetails))
          }
          setloading(false)
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

    if(loading) {
        return <div className='text-yellow-50'>
            Loading ...
        </div>
    }

  return (
    <div>
      <p>Edit Course</p>

      {
        course ? (<Rendersteps></Rendersteps>) : (<p>Course not found</p>)
      }
    </div>
  )
}

export default EditCourse
