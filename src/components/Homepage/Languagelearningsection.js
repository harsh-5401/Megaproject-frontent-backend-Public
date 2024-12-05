import React from 'react'
import Highlighttext from './Highlighttext'
import know_your_progress from "../../assets/Images/Know_your_progress.png"
import compare_with_others from "../../assets/Images/Compare_with_others.png"
import plan_your_lesson from "../../assets/Images/Plan_your_lessons.png"
import CTAButton from "./Button"

function Languagelearningsection() {
  return (
    <div>

      <div className='flex flex-col gap-5  mt-[140px]'>

        <div className='text-4xl font-semibold text-center'>
          Your Swiss Knife for 
          <Highlighttext text={" learning any language"}></Highlighttext>
        </div>

        <div className='text-center text-richblack-600 mx-auto mt-3 text-base w-[70%]'>
          Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
        </div>

        <div className='flex flex-row items-center justify-center mt-5'>
            <img src={know_your_progress} className='object-contain -mr-32' alt='knowyourprogress'></img>
            <img src={compare_with_others} className='object-contain' alt='knowyourprogress'></img>
            <img src={plan_your_lesson} className='object-contain -ml-36' alt='knowyourprogress'></img>
        </div>

        <div className='flex flex-row justify-center items-center mb-5'>
          <CTAButton active={true}  linkto={"/signup"}>
            <div>
              Learn more
            </div>
          </CTAButton>
        </div>

      </div>

    </div>
  )
}

export default Languagelearningsection
