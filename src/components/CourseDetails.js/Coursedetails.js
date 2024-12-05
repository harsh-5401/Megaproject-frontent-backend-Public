import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { buyCourse } from '../../services/operations/studentFeaturesAPI';
import { addtocart } from '../../slices/cartslice';
import { fetchCourseDetails } from '../../services/operations/courseDetailsAPI';
import GetAvgRating from '../../utils/avgRating';
import Error from '../../pages/Error';
import ConfirmationModal from '../common/ConfirmationModal';
import RatingStars from '../common/RatingStars';
import { formatDate } from '../../services/formatDate';
import CourseDetailsCard from '../Course/CourseDetailsCard';
import defaultimage from "../../assets/Images/aboutus2.webp"
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { BsGlobe } from 'react-icons/bs';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { BiVideo } from 'react-icons/bi';
import Footer from '../common/Footer';


 
function Coursedetails() {

    const {courseid} = useParams();
    const {token} = useSelector((state)=>state.auth);
    const {user , loading} = useSelector((state)=>state.profile);
    const dispatch= useDispatch();
    const navigate = useNavigate();
    const {cart , total , totalitems} = useSelector((state)=>state.cart);
    const {paymentLoading} = useSelector((state)=>state.course);

  

    const [courseData , setcourseData] = useState(null);
    const [averagereviewCount , setaveragereviewCount] = useState(0);
    const [totalnumberOfLectures , settotalnumberOfLectures ] = useState(0);
    const [confirmationmodal , setconfirmationmodal] = useState(null)
    const[isactive , setisactive] = useState([]);


  
      async function handlebuycourse() {
      
        // if(token) {
        //   await buyCourse(token , [courseid] , user , navigate , dispatch);
        //   return; 
        // }

        if(token) {
          await buyCourse(token , [courseid] , user , navigate , dispatch);
          return; 
        }

        setconfirmationmodal({
          text1:"You are not logged in",
          text2:"please login to purchase course",
          btn1text:"Login",
          btn2text:"Cancel",
          btn1Handler:()=>navigate("/login"),
          btn2Handler:()=>setconfirmationmodal(null)
        })
    }
    

    async function getcoursefullDetails() {
      try{
        const result= await fetchCourseDetails(courseid);
        console.log("COURSE DATA IS " , result);
        setcourseData(result);

      } catch(error){
        console.log("could not fetch course details");
      }
    }

    async function getAverageRating(data) {
      const count=GetAvgRating(data);
      setaveragereviewCount(count);      
    }

    useEffect(()=> {
      getcoursefullDetails();
    }, [courseid])

    useEffect(()=> {
      getAverageRating(courseData?.coursedata?.ratingAndreviews);
    }, [courseData])

    useEffect(()=> {
      let lecture=0;
      courseData?.coursedata?.coursecontent?.forEach((sec)=>{
        lecture= lecture + sec.subsection.length || 0
      })
      settotalnumberOfLectures(lecture);
    }, [courseData]);


    if(loading || !courseData) {
      return (
        <div>
          loading ...
        </div>
      )
    }

    if(!courseData.success) {
      return (

        <div>
          <Error></Error>
        </div>
      )
    }

    const {
      _id:course_id,
      coursename,
      coursedescription,
      thumbanil,
      price,
      whatwillyoulearn,
      coursecontent,
      ratingAndreviews,
      instructor,
      studentsenrolled,
      thumbnail,
      createdAt
    } = courseData?.coursedata

    function handleActive(id) {
      setisactive(
        !isactive.includes(id) ? isactive.concat(id) : isactive.filter((e)=>e!==id)
      )
    }

  return (
    

    // <div className='flex flex-col items-center text-white'>

    //   <div className='relative flex-col justify-start'>
    //     <p>{coursename}</p>
    //     <p>{coursedescription}</p>
    //     <div className='flex gap-x-2'>
    //       <span>{averagereviewCount}</span>
    //       <RatingStars Review_Count={averagereviewCount}></RatingStars>
    //       <span>{`(${ratingAndreviews.length} reviews)`}</span>
    //       <span>{`(${studentsenrolled.length} students enrolled)`}</span>
    //     </div>

    //     <div>
    //       <p>Created by {instructor.firstname}</p>
    //     </div>

    //     <div>
    //       <p>Created at {formatDate(createdAt)}</p>
    //     </div>

    //     <div>
    //       <CourseDetailsCard 
    //        course={courseData.coursedata}
    //        setconfirmationmodal={setconfirmationmodal}
    //        handlebuycourse={handlebuycourse}
    //        ></CourseDetailsCard>
    //     </div>
    //   </div>

    //   <div>
    //     <p>What you will Learn</p>
    //     <div>
    //       {whatwillyoulearn}
    //     </div>
    //   </div>

    //   <div className='flex gap-x-3'>
    //     <span>
    //       {coursecontent.length} sections(s)
    //     </span>
    //     <span>
    //       {totalnumberOfLectures} lectures
    //     </span>
    //     <span>
    //       {courseData.totalduration} Total length
    //     </span>
    //   </div>

    //   <div>
    //     <button onClick={()=>setisactive([])}>
    //       Collapse all sections
    //     </button>
    //   </div>



    //   {
    //     confirmationmodal && (<ConfirmationModal modaldata={confirmationmodal}></ConfirmationModal>)
    //   }
      
    // </div>




    <>
        {/* Details and Course Buy Card */}
        <div className='relative w-full bg-richblack-800'>
            <div className='mx-auto box-content px-4 lg:w-[1260px] 2xl:relative '>
                <div className='mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]'>
                   
                   <div className='relative block max-h-[30rem] lg:hidden'>
                        <div className='absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]'>
                        </div>
                        <img src={defaultimage || thumbnail} alt='imagehere' className='aspect-auto w-full'/>
                   </div>

                   <div className='z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5'>
                        <p className='text-4xl font-bold text-richblack-5 sm:text-[42px]'>{coursename}</p>
                        <p className='text-richblack-200'>{coursedescription}</p>
                        
                        <div className='text-md flex flex-wrap items-center gap-2'>
                            <span className='text-yellow-25'>{averagereviewCount}</span>
                            <RatingStars Review_Count={averagereviewCount} Star_Size={24} />
                            <span>{`(${ratingAndreviews.length} reviews) `}</span>
                            <span>{`(${studentsenrolled.length} students enrolled)`}</span>
                        </div>

                        <div>
                            <p>Created By {`${instructor.firstname}`}</p>
                        </div>

                        <div className='flex flex-wrap gap-5 text-lg'>
                            <p className='flex items-center gap-2'>
                            <i className=' text-white'><IoIosInformationCircleOutline/></i>
                                Created At {formatDate(createdAt)}
                            </p>
                            <p className='flex items-center gap-2'>
                            <BsGlobe/>
                                {" "} English
                            </p>
                        </div>
                   </div>
                   
                   <div className='flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden'>
                        <p className='space-x-3 pb-4 text-3xl font-semibold text-richblack-5'>
                            Rs. {price}
                        </p>
                        

                        <button className='yellowButton'>Buy Now</button>
                        <button className='blackButton'>Add to Cart</button>
                        
                   </div>
                    
                </div>
                
                <div className='right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block'>
                  <CourseDetailsCard 
                    course={courseData.coursedata}
                    setconfirmationmodal={setconfirmationmodal}
                    handlebuycourse={handlebuycourse}
                  ></CourseDetailsCard>
                </div>
            </div>
        </div>

        {/* What will you learn, Course Content, Sections dropdown, Author */}
        <div className='mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]'>
            <div className='mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]'>
                <div className='my-8 border border-richblack-600 p-8'>
                <p className='text-3xl font-semibold'> What You WIll learn</p>
                <div className='mt-5'>
                    {whatwillyoulearn}
                </div>
                </div>
            
                <div className='max-w-[830px] '>

                    <div className='flex flex-col gap-3'>
                        <p className='text-[28px] font-semibold'>Course Content:</p>
                        
                            <div className='flex flex-wrap justify-between gap-2'>
                                <div className='flex gap-2'>
                                <span>{coursecontent.length} section(s)</span>

                                
                                <span>
                                        {totalnumberOfLectures} lectures
                                    </span>
                                    <span>
                                        {courseData.totalduration} total length
                                    </span>
                                </div>
                                <div>
                                    <button
                                        className='text-yellow-25'
                                        onClick={() => setisactive([])}>
                                        Collapse all Sections
                                    </button>
                                </div>
                            </div>
                        
                    </div>



                    <div className='py-4'>
                        {
                            coursecontent.map((section) => (
                                <div key={section._id} className='overflow-hidden border border-solid border-richblack-600 bg-richblack-700 text-richblack-5 last:mb-0'>
                                    {/* Section */}
                                    <div onClick={()=> handleActive(section._id)}>
                                        <div className='flex cursor-pointer items-start justify-between bg-opacity-20 px-7  py-6 transition-[0.3s]'>
                                            <div className='flex items-center gap-2'>
                                                {isactive.includes(section._id)? (<i className=' -rotate-90'><MdOutlineArrowForwardIos/></i>) : (<i className=' rotate-90'><MdOutlineArrowForwardIos/></i>)}
                                                <p>{section.sectionname}</p>
                                            </div>

                                            <div className=' space-x-4'>
                                                <span className=' text-yellow-25'> {`${section.subsection.length} lecture(s)`} </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* SubSections */}
                                    <div className={` ${isactive.includes(section._id) ? 'h-[88px]' : ''} relative h-0 overflow-hidden bg-richblack-900 transition-[height] duration-[0.35s] ease-[ease]`}>
                                        {section.subsection.map((subSection)=> (
                                                <div key={subSection._id} className='text-textHead flex flex-col gap-2 px-7 py-6 font-semibold'>
                                                    <div className='py-2 flex justify-start items-center gap-2'>
                                                        <span>
                                                            <BiVideo/>
                                                        </span>
                                                        <p>
                                                            {subSection.title}
                                                        </p>
                                                    </div>
                                                </div>
                                        ))}
                                    </div>
                                    
                                </div>
                            ) )
                        }
                    </div>

                    <div className='mb-12 py-4'>
                        <p className="text-[28px] font-semibold">Author</p>
                        <div className=' flex items-center gap-4 py-4'>
                            <img className='h-14 w-14 rounded-full object-cover' src={instructor.image}/>
                            <p className='text-lg'>{instructor.firstname} {instructor.lastname}  </p>
                        </div>
                        <p className='text-lg'>
                                {instructor.additionalDetails.About}
                            </p>
                    </div>
                </div>
            </div>
        </div>
        
        <Footer/>

        {
          confirmationmodal && (<ConfirmationModal modaldata={confirmationmodal}></ConfirmationModal>)
        }

    </>


  )
}

export default Coursedetails
