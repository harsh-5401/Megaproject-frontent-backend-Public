import React from 'react'
import instructor from "../../assets/Images/Instructor.png"
import Highlighttext from './Highlighttext'
import CTAButton from '../Homepage/Button'
import { FaArrowRight } from 'react-icons/fa'


function Instructorsection() {
  return (
    <div className='mt-14'>

        <div className='flex flex-row gap-20 items-center'>

            <div className='w-[50%]'>
                <img src={instructor} alt='instructor '></img>
            </div>

            <div className='w-[50%] flex flex-col gap-7'>
                <div className='text-4xl font-semibold w-[50%]'>
                    Become an
                    <Highlighttext text={" Instructor"}></Highlighttext>
                </div>

                <p className='font-medium text-[16px] text-richblack-300  w-[80%]'>
                    Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                </p>

                <div className='w-fit'>
                    <CTAButton active={true} linkto={"/signup"}>
                        <div className='flex flex-row gap-2 items-center '>
                            Start Learning Today
                            <FaArrowRight></FaArrowRight>
                        </div>
                    </CTAButton>
                </div>

                
            </div>

       
        </div>
    </div>
    
  )
}

export default Instructorsection
