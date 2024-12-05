import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import Highlighttext from '../components/Homepage/Highlighttext'
import CTAButton from '../components/Homepage/Button'
import Banner from "../assets/Images/banner.mp4"
import Codeblocks from '../components/Homepage/Codeblocks'
import Timelinesection from '../components/Homepage/Timelinesection'
import Languagelearningsection from '../components/Homepage/Languagelearningsection'
import Instructorsection from '../components/Homepage/Instructorsection'
import Exploremore from '../components/Homepage/Exploremore'
import Footer from "../components/common/Footer"
import Reviewslider from '../components/common/Reviewslider'


function Home() {
  return (
    // <div>
    //   {/* Section 1 */}

    //   <div className='relative mx-auto flex flex-col w-11/12 items-center text-white justify-between max-w-maxContent'>

    //       <Link to={"/signup"}>
    //           <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
    //           transition-all duration-200 hover:scale-95 w-fit'>
    //               <div className='flex flex-row items-center gap-2 rounded-full py-[5px] px-10 group-hover:bg-richblack-900'>
    //                   <p>Become an Instructor</p>
    //                   <FaArrowRight></FaArrowRight>
    //               </div>
    //           </div>
    //       </Link>

    //       <div className='text-center text-4xl font-semibold mt-7'>
    //         Empower Your Future with 
    //         <Highlighttext text={" Coding Skills"}></Highlighttext>
    //       </div>
        
    //       <div className='w-[90%] text-center text-lg mt-4 font-bold text-richblack-300 '>
    //         With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
    //       </div>

    //       <div className='flex flex-row gap-7 mt-8'>
    //         <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
    //         <CTAButton active={false} linkto={"/login"}>Book a Demo</CTAButton>
    //       </div>

    //     {/* video  */}
    //       <div className='mx-3 my-14 shadow-[10px_-5px_50px_-5px] shadow-blue-200'>
    //         <video muted loop autoPlay className='shadow-[20px_20px_rgba(255,255,255)]'>
    //             <source src={Banner} type='video/mp4'></source>
    //         </video>
    //       </div>


    //     {/* code section 1 */}

    //       <div className='-mt-3'>
    //         <Codeblocks position={"lg:flex-row"}
    //                     heading={
    //                       <div>
    //                         Unlock Your 
    //                         <Highlighttext text={" coding potential "}></Highlighttext>
    //                         with our online courses
    //                       </div>
    //                     }
    //                     subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
    //                     ctabtn1={
    //                       {
    //                         btntext: "try it yourself",
    //                         linkto: "/signup",
    //                         active:true
    //                       }
    //                     }
    //                     ctabtn2={
    //                       {
    //                         btntext:"Learn more",
    //                         linkto:"/login",
    //                         active:false
    //                       }
    //                     }

    //                     codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}

    //                     codecolor={'text-yellow-25'}
    //                     />

    //       </div>

    //       {/* code section 2 */}

    //       <div className='-mt-8'>
    //         <Codeblocks position={"lg:flex-row-reverse"}
    //                     heading={
    //                       <div>
    //                         Start  
    //                         <Highlighttext text={" coding in seconds"}></Highlighttext>
                            
    //                       </div>
    //                     }
    //                     subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
    //                     ctabtn1={
    //                       {
    //                         btntext: "Continue Lesson",
    //                         linkto: "/signup",
    //                         active:true
    //                       }
    //                     }
    //                     ctabtn2={
    //                       {
    //                         btntext:"Learn more",
    //                         linkto:"/login",
    //                         active:false
    //                       }
    //                     }

    //                     codeblock={`import React from "react";\nimport CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}

    //                     codecolor={'text-blue-25'}
    //                     />

    //       </div>

    //       <Exploremore></Exploremore>

    //   </div>




    //   {/* Section 2 */}
    //   <div className='bg-pure-greys-5 text-richblack-700'>
                    
    //                 {/* buttons and criss-cross background */}
    //                 <div className='homepage_bg h-[310px]'>
    //                     <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto'>
    //                         <div className='hidden lg:block h-[180px]'></div>
    //                         <div className=' mt-8 lg:mt-0 flex flex-row gap-7 text-white '>
    //                             <CTAButton active={true} linkto={"/signup"}>
    //                                 <div className='flex items-center gap-3' >
    //                                     Explore Full Catalog
    //                                     <FaArrowRight />
    //                                 </div>
                                    
    //                             </CTAButton>
    //                             <CTAButton active={false} linkto={"/signup"}>
    //                                 <div>
    //                                     Learn more
    //                                 </div>
    //                             </CTAButton>
    //                         </div>
        
    //                     </div>
    //                 </div>
        
    //                 {/* Section 2 header, timeline, learning */}
    //                 <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>
        
    //                     {/* Section 2 header */}
    //                     <div className='flex flex-col lg:flex-row justify-between gap-5 mb-10 -mt-20 lg:mt-[95px]'>
    //                         <div className='text-4xl font-semibold lg:w-[45%]'>
    //                           Get the Skills you need for a
    //                           <Highlighttext text={"Job that is in demand"} />
    //                         </div>
        
    //                         <div className='flex flex-col gap-10 lg:w-[40%] items-start'>
    //                             <div className='text-[16px]'>
    //                             The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
    //                             </div>
    //                             <CTAButton active={true} linkto={"/signup"}>
    //                                 <div>
    //                                     Learn more
    //                                 </div>
    //                             </CTAButton>
    //                         </div>

                            
        
    //                     </div>

    //                     <Timelinesection></Timelinesection>

    //                     <Languagelearningsection></Languagelearningsection>
                        
    //                 </div>    

                    


    //   </div>


    //   {/* Section 3 */}


    //   <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 bg-richblack-900 text-white first-letter:'>

    //     <Instructorsection></Instructorsection>

    //     <h2 className='text-center text-4xl font-semibold mt-10'>Reviews from other Learners</h2>

    //     {/* review slider */}
        
    //     <Reviewslider></Reviewslider>

    //   </div>


    //   {/* footer */}
    //   <Footer></Footer>

    // </div>

    <div>
        {/* Section1 */}
        <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center 
      text-white justify-between'>
            {/* Top Button */}   
            <Link to={"/signup"}>
                <div className=' group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
                transition-all duration-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] hover:scale-95 w-fit hover:drop-shadow-none'>
                    <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
                    transition-all duration-200 group-hover:bg-richblack-900'>
                        <p>Become an Instructor</p>
                        <FaArrowRight />
                    </div>
                </div>
            </Link>

            {/* Heading */}
            <div className='text-center text-4xl font-semibold mt-7'>
                Empower Your Future with
                <Highlighttext text={"Coding Skills"} />
            </div>

            {/* intro */}
            <div className=' mt-4 w-[90%] text-center text-lg font-bold text-richblack-300'>
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
            </div>

            {/* Buttons */}
            <div className='flex flex-row gap-7 mt-8'>
                <CTAButton active={true} linkto={"/signup"}> 
                    Learn More
                </CTAButton>

                <CTAButton active={false} linkto={"/login"}> 
                    Book a Demo
                </CTAButton>
            </div>

            {/* video */}
            <div className='mx-3 my-14 shadow-[10px_-5px_50px_-5px] shadow-blue-200'>
                <video className='shadow-[20px_20px_rgba(255,255,255)]'
                muted
                loop
                autoPlay
                >
                <source  src={Banner} type="video/mp4" />
                </video>
            </div>

            {/* codeblocks1 */}
            <div>
                <Codeblocks 
                    position={"lg:flex-row"}
                    heading={
                        <div className='text-4xl font-semibold'>
                            Unlock your
                            <Highlighttext text={"coding potential "}/>
                            with our online courses.
                        </div>
                    }
                    subheading = {
                        "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                    }
                    ctabtn1={
                        {
                          btntext: "try it yourself",
                          linkto: "/signup",
                          active:true
                        }
                    }
                    ctabtn2={
                        {
                          btntext:"Learn more",
                          linkto:"/login",
                          active:false
                        }
                    }

                    codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a></nav>\n</body>`}
                    codecolor={"text-yellow-25"}
                />
            </div>

            {/* codeblocks2 */}
            <div>
                <Codeblocks 
                    position={"lg:flex-row-reverse"}
                    heading={
                        <div className='w-[100%] text-4xl font-semibold lg:w-[50%]'>
                            Start 
                            <Highlighttext text={`coding in seconds`}/>
                        </div>
                    }
                    subheading = {
                        "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                    }
                    ctabtn1={
                        {
                            btntext: "Continue Lesson",
                            linkto: "/signup",
                            active: true,
                        }
                    }
                    ctabtn2={
                        {
                            btntext: "Learn More",
                            linkto: "/login",
                            active: false,
                        }
                    }

                    codeblock={`import React from "react";\nimport CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
                    codecolor={"text-blue-25"}
                />
            </div>

            <Exploremore />
        </div> 
    
        {/* Section2 */}
        <div className='bg-pure-greys-5 text-richblack-700'>
                    
            {/* buttons and criss-cross background */}
            <div className='homepage_bg h-[310px]'>
                <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto'>
                    <div className='hidden lg:block h-[180px]'></div>
                    <div className=' mt-8 lg:mt-0 flex flex-row gap-7 text-white '>
                        <CTAButton active={true} linkto={"/signup"}>
                            <div className='flex items-center gap-3' >
                                Explore Full Catalog
                                <FaArrowRight />
                            </div>
                            
                        </CTAButton>
                        <CTAButton active={false} linkto={"/signup"}>
                            <div>
                                Learn more
                            </div>
                        </CTAButton>
                    </div>

                </div>
            </div>

            {/* Section 2 header, timeline, learning */}
            <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>

                {/* Section 2 header */}
                <div className='flex flex-col lg:flex-row justify-between gap-5 mb-10 -mt-20 lg:mt-[95px]'>
                    <div className='text-4xl font-semibold lg:w-[45%]'>
                        Get the Skills you need for a
                        <Highlighttext text={"Job that is in demand"} />
                    </div>

                    <div className='flex flex-col gap-10 lg:w-[40%] items-start'>
                        <div className='text-[16px]'>
                        The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                        </div>
                        <CTAButton active={true} linkto={"/signup"}>
                            <div>
                                Learn more
                            </div>
                        </CTAButton>
                    </div>

                </div>
   
                {/* Timeline section */}
                <Timelinesection />

                <Languagelearningsection />

            </div>          
        </div>

        {/*Section 3 */}            
        <div className='w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 first-letter bg-richblack-900 text-white'>
            <Instructorsection />

            <h2 className='text-center text-4xl font-semobold mt-10'>Review From Other Learners</h2>
            {/* Review Slider here */}
            <Reviewslider />
        </div>

        {/*Footer */}
        <Footer />
    </div>

  )
}

export default Home