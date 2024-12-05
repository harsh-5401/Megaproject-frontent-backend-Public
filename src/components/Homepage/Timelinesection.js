import React from 'react'
import logo1 from "../../assets/TimeLineLogo/Logo1.svg"
import logo2 from "../../assets/TimeLineLogo/Logo2.svg"
import logo3 from "../../assets/TimeLineLogo/Logo3.svg"
import logo4 from "../../assets/TimeLineLogo/Logo4.svg"
import timelineimage from "../../assets/Images/TimelineImage.png"

function Timelinesection() {

    const timeline=[
        {
            Logo:logo1,
            heading:"Leadership",
            Description:"Fully comitted to the success company"
        },

        {
            Logo:logo2,
            heading:"Leadership",
            Description:"Fully comitted to the success company"
        },

        {
            Logo:logo3,
            heading:"Leadership",
            Description:"Fully comitted to the success company"
        },

        {
            Logo:logo4,
            heading:"Leadership",
            Description:"Fully comitted to the success company"
        }

    ]

  return (
    <div>
      <div className='flex flex-row gap-15 items-center'>

        <div className='w-[45%] flex flex-col'>

                {
                    timeline.map((element , index) => {
                        return(
                            <div className='flex flex-row gap-6 ' key={index}>
                                <div className='w-[50px] h-[50px] flex items-center'>
                                    <img src={element.Logo} alt='element logo'></img>
                                </div>

                                <div>
                                    <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                                    <p className='text-base'>{element.Description}</p>
                                </div>
                        </div>
                        )
                    })
                }
                        
        </div>

        <div className='relative shadow-blue-200 '>
            <img src={timelineimage} alt='timelineimage' className='shadow-white object-cover h-fit'></img>

            <div className='absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-6  left-[50%] -translate-x-[50%] -translate-y-[50%]'>
                <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-400 px-7'>
                    <p className='text-3xl font-bold'>10</p>
                    <h1 className='text-caribbeangreen-300 text-sm'>Years of Expereience</h1>
                </div>

                <div className='flex gap-5 items-center px-7 '>
                <p className='text-3xl font-bold'>250</p>
                <h1 className='text-caribbeangreen-300 text-sm'>Types of courses</h1> 
                </div>

            </div>
        </div>


      </div>
    </div>
  )
}

export default Timelinesection
