import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLoaderData, useLocation, useNavigate, useParams } from 'react-router-dom';
import Iconbutton from '../common/Iconbutton';

function VideoDetailsSidebar({setreviewmodal}) {

  // tell which section is active  using id
    const [activeStatus , setactiveStatus] = useState("")
    // tell us which video is active using id
    const[videobaractive , setvideobaractive] = useState("");
    const location= useLocation();

    const navigate= useNavigate();
    const {sectionid , subsectionid} = useParams();

    const {
      courseSectionData,
      courseEntireData,
      completedLectures,
      totalNoOfLectures,
    } = useSelector((state)=>state.viewcourse);


    function setActiveSectionAndSubsection () {
      if(courseSectionData?.length===0) {
        return ;
      }

      // find section and subsection index from courseid and subsectionid provided in url 
      const currentsectionindex= courseSectionData.findIndex((data)=> data._id===sectionid);

      const currentsubsectionindex= courseSectionData[currentsectionindex]?.subsection?.findIndex((data)=> data._id===subsectionid);

      // id of subsection which is active 
      const activeSubsectionid= courseSectionData[currentsectionindex]?.subsection?.[currentsubsectionindex]._id;

      // setcurrent section here 
      setactiveStatus(courseSectionData?.[currentsectionindex]?._id);

      // setcurrentsubsection here 
      setvideobaractive(activeSubsectionid);

    }

    useEffect(()=> {
      setActiveSectionAndSubsection();
    },[courseSectionData , courseEntireData , location.pathname])


  return (
    <div className='text-white w-[20%]'>

      <div>
        {/* for button and heading  */}
        <div>

          {/* for buttons  */}
          <div>

              <div onClick={()=> navigate("/dasboard/enrolled-courses")}>
                Back
              </div>

              <div>
                <Iconbutton text="Add review" onclick={()=>setreviewmodal(true)}></Iconbutton>
              </div>

          </div>

            {/* for heading and title  */}
          <div>
            <p>{courseEntireData?.coursename}</p>
            <p>{completedLectures?.length} / {totalNoOfLectures}</p>
          </div>

        </div>

        {/* for sections and subsections  */}

        <div>

            {
              courseSectionData?.map((section , index)=> {
               return <div key={index} onClick={()=> setactiveStatus(section?._id)} >

                    {/* section  */}

                    <div>

                      <div>
                        {section.sectionname}
                      </div>

                      {/* ADD ARROW ICON AND HANDLE ROTATE LOGIC- hw */}


                    </div>

                    {/* subsections  */}

                    <div>

                      {
                        activeStatus === section._id  && (
                          <div>
                            {
                              section.subsection.map((topic , index)=> {
                      return <div key={index} className={`flex gap-3 p-5 ${videobaractive === topic._id ? "bg-yellow-200 text-richblack-900" : "bg-richblack-800 text-white"}`}
                                onClick={() => {
                                  navigate(
                                    `/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic._id}`
                                  );
                                  // set this subsection as active
                                  setvideobaractive(topic._id)
                                  }}>
                                    <input type='checkbox' checked={completedLectures.includes(topic?._id)} onChange={() => {}}>
                                        {/* {topic.title} */}
                                    </input>

                                    
                                    <span>{topic.title}</span>
                                    
                                </div>
                              })
                            }
                          </div>
                        ) 
                      }

                    </div>

                </div>
              })
            }

        </div>

      </div>

    </div>
  )
}

export default VideoDetailsSidebar
