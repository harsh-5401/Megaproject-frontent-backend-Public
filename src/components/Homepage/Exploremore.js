import React, { useState } from 'react'
import  {HomePageExplore}  from "../../data/homepage-explore"
import Coursecard from './Coursecard'
import Highlighttext from "../../components/Homepage/Highlighttext"

const tabsname=[
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
]

function Exploremore() {

    const [currenttab , setcurrenttab] = useState(tabsname[0]);
    const [courses , setcourses] = useState(HomePageExplore[0].courses);
    const [currentcard , setcurrentcard] = useState(HomePageExplore[0].courses[0].heading);

    function setmycards(value) {
      setcurrenttab(value);
      // find new for given new value
      const result=HomePageExplore.filter( (course) => {
        return course.tag===value
      });
      // set courses basis on new vallue
      setcourses(result[0].courses);

      // update current card
      // which card to highlight depend on currrent card
      setcurrentcard(result[0].courses[0].heading);
    }

  return (
    <div>
        <div className='text-4xl font-semibold text-center'>
          Unlock the 
          <Highlighttext text={" Power of Code"}></Highlighttext>
        </div>

        <p className='text-center text-richblack-300 text-lg font-bold mt-3'>Learn to build anything you can imagine</p>

          {/* tab component  */}
        <div className='flex flex-row rounded-full  bg-richblack-800 mb-5 border-richblack-100 mt-5 px-1 py-1 '>

          {
            tabsname.map( (element , index) => {
              return (
                <div key={index} className={`text-[16px] flex flex-row items-center gap-2 
                  ${currenttab===element ? "bg-richblack-900 text-richblack-5 font-medium ": "text-richblack-200 "} rounded-full 
                  transition-all duration-200  cursor-pointer hover:richblack-900 hover:text-richblack-5 px-7 py-2 `}
                  onClick={()=> setmycards(element)}>

                  {element}

                </div>
              )
            })
          
          }

        </div>

        <div className='lg:h-[150px]'></div>

        {/* course card group  */}

        <div className='absolute flex flex-row gap-10 justify-between w-full'>

          {

            courses.map( (element , index) => {
              return <Coursecard key={index} carddata={element} currentcard={currentcard} setcurrentcard={setcurrentcard}></Coursecard>
            })
            
          }

        </div>

    </div>
  )
}

export default Exploremore
