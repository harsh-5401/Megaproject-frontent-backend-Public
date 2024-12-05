import React, { useEffect, useState } from 'react'
import VideoDetailsSidebar from './VideoDetailsSidebar'
import { Outlet, useParams } from 'react-router-dom'
import CoursereviewModal from './CoursereviewModal'
import { useDispatch, useSelector } from 'react-redux';
import { getFullDetailsOfCourse } from '../../services/operations/courseDetailsAPI';
import { setCourseSectionData , setEntireCourseData , setTotalNoOfLectures , setCompletedLectures , updateCompletedLectures } from '../../slices/viewCourseSlice';

function Viewcourse() {

    const[reviewmodal , setreviewmodal] = useState(false);
    const {courseid} = useParams();
    console.log("course ID IN PARAMS" , courseid);
    const {token} = useSelector((state)=>state.auth);
    const dispatch= useDispatch();
 
    const setcourseSpecificDetails= async () => {
      const courseData= await getFullDetailsOfCourse(courseid , token);

      // setcourseide(courseid);
      console.log("Full COURSE DATA IS =" , courseData);
      dispatch(setCourseSectionData(courseData?.courseDetails?.coursecontent));

      dispatch(setEntireCourseData(courseData?.courseDetails));

      dispatch(setCompletedLectures(courseData?.completedVideos));
      
      let lectures = 0;
      courseData?.courseDetails?.coursecontent.forEach((sec) => {
          lectures += sec.subsection.length
      } )
      // console.log("total lectures here is " , lectures);
      dispatch(setTotalNoOfLectures(lectures))
     
  }

    useEffect(()=> {    
      // console.log("NEW COURSE ID IS ......." , courseid)
      setcourseSpecificDetails();    
    },[courseid])


  return (
    <div>

      <div className='flex flex-row'>

        <VideoDetailsSidebar setreviewmodal={setreviewmodal}></VideoDetailsSidebar>

        <div className='w-[100%] border-white border-[2px] border-solid h-[100%]'>
            <Outlet></Outlet>
         </div>
      </div>

      {reviewmodal && <CoursereviewModal setreviewmodal={setreviewmodal}></CoursereviewModal>}
    </div>
  )
}

export default Viewcourse
  