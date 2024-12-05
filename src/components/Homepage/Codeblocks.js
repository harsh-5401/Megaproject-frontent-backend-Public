import React from 'react'
import CTAButoon from "../Homepage/Button";
import { FaArrowRight } from 'react-icons/fa';
// import Highlighttext from './Highlighttext';
import { TypeAnimation } from 'react-type-animation';


function Codeblocks({position , heading , subheading , ctabtn1 , ctabtn2 , codeblock , backgroundGradient , codecolor }) {
  // const codecolor=props.codecolor
  return (
    <div className={`flex ${position} my-20 justify-between gap-10 `}>

      {/* section 1 */}
      <div className='w-[100%] lg:w-[50%] flex flex-col gap-8'> 
        <div className='text-5xl'>
          {heading}
        </div>
        

        <div className='text-richblack-300 text-base font-bold w-[85%] -mt-3 '>
          {subheading}
        </div>

        <div className='flex gap-7 mt-7'>
          <CTAButoon active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className='flex gap-2 items-center'>
              {ctabtn1.btntext}
              <FaArrowRight></FaArrowRight>
            </div>
          </CTAButoon>

          <CTAButoon active={ctabtn2.active} linkto={ctabtn2.linkto}>
              {ctabtn2.btntext}            
          </CTAButoon>

        </div>

      </div>


      {/* section 2 */}

      <div className='h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px]'>

      <div className='absolute gradient-custom w-[373px] h-[257px] rounded-full blur-2xl opacity-20 -left-2 -top-2'></div>

        {/* HW -> BG gradient */}

        <div className='text-center flex select-none flex-col w-[10%] text-richblack-400 font-inter font-bold '>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
          <p>12</p>
        </div>

        <div className={`w-[90%] flex flex-col gap-2 font-mono pr-2 ${codecolor}`}>
          {/* after type animation is completed take 2sec pause and then repeat  */}
            <TypeAnimation sequence={[codeblock , 2000 , ""]} repeat={Infinity} cursor={true} omitDeletionAnimation={false} 
            style={
              {
                whiteSpace:"pre-line",
                display:"block"
              }
            }>

            </TypeAnimation>
        </div>

      </div>
      
    </div> 
  )
}

export default Codeblocks
