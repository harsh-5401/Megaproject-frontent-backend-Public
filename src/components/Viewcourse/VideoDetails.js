import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { markLectureAsComplete } from '../../services/operations/courseDetailsAPI';
import { updateCompletedLectures } from '../../slices/viewCourseSlice';
import { useParams } from 'react-router-dom';
import { Player , BigPlayButton } from 'video-react';
import Iconbutton from '../common/Iconbutton';

import 'video-react/dist/video-react.css'; // import css




function VideoDetails() {

  const {courseid , sectionid , subsectionid} = useParams();
  const dispatch= useDispatch();
  const navigate= useNavigate();
  const location= useLocation();
  const playerref= useRef();
  const {token} = useSelector((state)=>state.auth);

  const {
    courseSectionData,
    courseEntireData,
    completedLectures,
    totalNoOfLectures,
  } = useSelector((state)=>state.viewcourse);
  
  console.log("COURSE SECTION DATA" , courseSectionData)

  const[videodata , setvideodata] = useState([]);
  const [videoended , setvideoended] = useState(false);
  const [loading , setloading] = useState(false);
  

   useEffect(() => {
    async function setVideoSpecificDetails () {
        // console.log("In VideoDetails, courseSectionData",courseSectionData)
        if(!courseSectionData?.length){
          return ;
        }
        if(!courseid && !sectionid && !subsectionid) {
            navigate("/dashboard/enrolled-courses");
        } else { 
            //let's assume k all 3 fields are present

            const filteredData = courseSectionData?.filter(
                (course) => {
                  return course._id === sectionid
                }
            )
            // console.log("filter data is ..." , filteredData);

            const filteredVideoData = filteredData?.[0]?.subsection?.filter( 
                (data) => {
                  return data._id === subsectionid
                }
            )
            // console.log("data is after" , filteredVideoData)
            setvideodata(filteredVideoData?.[0]);
            // setPreviewSource(courseEntireData.thumbnail)
            setvideoended(false);

        }
    }
    
    setVideoSpecificDetails();
  }, [courseSectionData, courseEntireData, location.pathname])

  
  function isfirstVideo() {
    const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionid
    )

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subsection.findIndex(
        (data) => data._id === subsectionid
    );

    if(currentSectionIndex === 0 && currentSubSectionIndex === 0) {
      return true;
    }
    else {
      return false;
    }

  }

  function islastVideo () {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionid
  )

  const noOfSubSections = courseSectionData[currentSectionIndex].subsection.length;

  const currentSubSectionIndex = courseSectionData[currentSectionIndex].subsection.findIndex(
      (data) => data._id === subsectionid
  )

  if(currentSectionIndex === courseSectionData.length - 1 &&
      currentSubSectionIndex === noOfSubSections - 1) {
          return true;
      }
  else {
      return false;
  }

  }

  function gotonextVideo() {

    const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionid)

    const noOfSubSections = courseSectionData[currentSectionIndex].subsection.length;

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subsection.findIndex((data) => data._id === subsectionid);

    if(currentSubSectionIndex!== noOfSubSections -1) {
      // same section ki next video me jao
      const nextsubsectionid= courseSectionData[currentSectionIndex.subsection].subsection[currentSubSectionIndex + 1]._id
      navigate(`/view-course/${courseid}/section/${sectionid}/sub-section/${nextsubsectionid}`)
    }

    else{
      // different section ki first video 
      const nextsectionid=courseSectionData[currentSectionIndex+1]._id;
      const nextsubsectionid = courseSectionData[currentSectionIndex+1].subsection[0]._id
      navigate(`/view-course/${courseid}/section/${nextsectionid}/sub-section/${nextsubsectionid}`)

    }

  }

  function gotopreviousVideo() {

    const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionid)

    const noOfSubSections = courseSectionData[currentSectionIndex].subsection.length;

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subsection.findIndex((data) => data._id === subsectionid);

    if(currentSubSectionIndex !== 0) {
      // same section ki prev video me jao
      const prevsubsectionid= courseSectionData[currentSectionIndex].subsection[currentSubSectionIndex - 1]._id
      navigate(`/view-course/${courseid}/section/${sectionid}/sub-section/${prevsubsectionid}`)
    }

    else{
      // different section ki last video video 
      const prevsectionid=courseSectionData[currentSectionIndex - 1]._id;
      const prevsubsectionlength=courseSectionData[currentSectionIndex - 1].subsection.length;
      const prevsubsectionid = courseSectionData[currentSectionIndex-1].subsection[prevsubsectionlength-1]._id
      console.log("id is " , prevsubsectionid)
      navigate(`/view-course/${courseid}/section/${prevsectionid}/sub-section/${prevsubsectionid}`)

    }

  } 

  async function handleLectureCompletion() {
    setloading(true)

    const response=await markLectureAsComplete({courseid:courseid , subsectionid:subsectionid , sectionid:sectionid } , token);
    console.log("reponse of mark as completed" , response);
    if(response) {
      dispatch(updateCompletedLectures(subsectionid))
    }

    setloading(false)

  }

  return (


    <div className='text-yellow-100'>
      {
        !videodata ? (<div> No data found </div>): (

          <Player ref={playerref} aspectRatio="16:9" onEnded={()=>setvideoended(true)} playsInline  src={videodata?.videourl}>
            

            <BigPlayButton position="center" />   

            {
              videoended && (
                <div>
                  {
                    !completedLectures.includes(subsectionid) && (
                      <Iconbutton disabled={loading} onclick={()=>handleLectureCompletion()} text={!loading ? "Mark as Completed" : "Loading.."}></Iconbutton>

                    )
                  }

                  <Iconbutton disabled={loading} onclick={()=> {
                    if(playerref?.current) {
                      playerref?.current?.seek(0);
                      setvideoended(false);
                    }
                  }} text="Rewatch" customclasses="text-xl max-w-max px-4 mx-auto mt-2"></Iconbutton>

                  <div className='mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl'>
                    {
                      ! isfirstVideo() && (
                        <button disabled={loading} onClick={gotopreviousVideo} className='blackbutton' >Previous</button>
                      )
                    }

                    {
                      ! islastVideo() && (
                        <button disabled={loading} onClick={gotonextVideo} className='blackbutton' >next</button>
                      )
                    }
                  </div>


                </div>
              )
            }
          </Player>
        )
      }
    </div>
  )
}

export default VideoDetails
