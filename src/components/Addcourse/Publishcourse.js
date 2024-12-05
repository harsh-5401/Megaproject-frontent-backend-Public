import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Iconbutton from '../common/Iconbutton';
import { setstep } from '../../slices/courseSlice';
import {COURSE_STATUS} from "../../../src/utils/constants"
import { editCourseDetails } from '../../services/operations/courseDetailsAPI';
import { useNavigate } from 'react-router-dom';
import { resetcourseState } from '../../slices/courseSlice';

// import Coursebuilderfrom from "./Coursebuilderform"
// import Courseinformationform from "./Courseinformationform"
 

function Publishcourse() {

  const dispatch= useDispatch();
  const{course} = useSelector((state)=>state.course);
  const {token} = useSelector((state)=>state.auth);
  const [loading , setloading] = useState(false);
  const navigate = useNavigate();

  function goback() {
    dispatch(setstep(2));
  }

  function gotoCourses() {
    dispatch(resetcourseState())
    // navigate("/dashboard/add-course")
    navigate("/dashboard/my-courses")
  }

  async function handlecoursePublic() {
    if((course?.status ===COURSE_STATUS.PUBLISHED && getValues("public")===true) || (course?.status===COURSE_STATUS.DRAFT && getValues("public")===false)) {
      // no updates in form 
      // course is not been updated
      // no need to make api call
      gotoCourses();
      return ;
    }

    // if form is upateded
    // creat new formdata and make api call
    const formData = new FormData()
    formData.append("courseid", course._id)
    const courseStatus = getValues("public")
      ? COURSE_STATUS.PUBLISHED
      : COURSE_STATUS.DRAFT
    formData.append("status", courseStatus)
    setloading(true)
    const result = await editCourseDetails(formData, token)
    if (result) {
      console.log("result is after being pusblished is" , result)
      // dispatch(setcourse(result));
      // dispatch(setcourse(null))
      gotoCourses()
    }
    setloading(false)
  }

  function onSubmit(data) {
    console.log("PUblish course onsubmit data " , data)
    handlecoursePublic();
  }


  const {
    register,
    setValue, 
    getValues,
    formState: {errors},
    handleSubmit
  } = useForm();

  return (
  


    <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="text-2xl font-semibold text-richblack-5">
        Publish Settings
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Checkbox */}
        <div className="my-6 mb-8">
          <label htmlFor="public" className="inline-flex items-center text-lg">
            <input
              type="checkbox"
              id="public"
              {...register("public")}
              className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
            />
            <span className="ml-2 text-richblack-400">
              Make this course as public
            </span>
          </label>
        </div>

        {/* Next Prev Button */}
        <div className="ml-auto flex max-w-max items-center gap-x-4">
          <button
            disabled={loading}
            type="button"
            onClick={goback}
            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
          >
            Back
          </button>
          <Iconbutton disabled={loading} text="Save Changes" />
        </div>
      </form>
    </div>
  )
}

export default Publishcourse
