import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import {fetchCourseCategories} from "../../services/operations/courseDetailsAPI"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import Requirementfields from './Requirementfields';
import { setstep } from '../../slices/courseSlice';
import Iconbutton from "../common/Iconbutton"
import toast from 'react-hot-toast';
import { editCourseDetails } from '../../services/operations/courseDetailsAPI';
import { setcourse } from '../../slices/courseSlice';
import { addCourseDetails } from '../../services/operations/courseDetailsAPI';
import { MdNavigateNext } from "react-icons/md"
import {COURSE_STATUS} from "../../utils/constants"
import Upload from './Upload';
import ChipInput from './ChipInput';



function Courseinformationform() {
    

    const {
        register,
        setValue, 
        getValues,
        formState: {errors},
        handleSubmit
    } = useForm();

    const dispatch = useDispatch();
    const [loading , setloading] = useState(false);
    const [coursecategories , setcoursecategories] = useState([])
    const {course , editCourse} = useSelector((state)=>state.course)
    const {token} = useSelector((state)=>state.auth)
    const {step} = useSelector((state)=>state.course)


    async function getcategories() {
        setloading(true);
            const categories= await fetchCourseCategories();
            // console.log("all categroies are " , categories)
            if(categories.length > 0) {
                setcoursecategories(categories);
            }
            setloading(false)
            // console.log(" course categories data is " , coursecategories)
    }

    // useeffect to fetch all categories on first render

    useEffect(()=> {
        getcategories();
    }, [])


    /// if edit course funcitonaliy avaliable make sure on first render that useformhook data is up to data with course inside local storage 

    useEffect(()=>{
        console.log("course data is " , course)
        // console.log("cpurse.category is " , course.category)
        
        if (editCourse) {
            // console.log("data populated", editCourse)
            setValue("coursetitle", course.coursename)
            setValue("courseshortdescription", course.coursedescription)
            setValue("courseprice", course.price)
            setValue("coursetags", course.tag)
            setValue("coursebenefits", course.whatwillyoulearn)
            setValue("coursecategory", course.category)
            setValue("courserequirements", course.instructions)
            setValue("courseimage", course.thumbnail)
          }
        // getcategories();
        // console.log("course information")
        
        
    } , [])

    function isformupdated() {
        const currentValues=getValues();
        console.log("current values are .. " , currentValues);
        // if some changes are made in form return true
        if(
            currentValues.coursetitle !== course.coursename ||
            currentValues.courseshortdescription !== course.coursedescription ||
            currentValues.courseprice !== course.price ||
            // currentValues.coursetags.toString() !== course.tags.toString() ||
            currentValues.coursebenefits !== course.whatwillyoulearn ||
            currentValues.coursecategory._id !== course.category._id ||
            currentValues.courserequirements.toString() !== course.instructions.toString() ||
            currentValues.courseimage !== course.thumbnail
        ) {
            return true;
        }

        return false;
        

    }

    // handle next button click

    async function onSubmit(data) {
        console.log("data is .... " , data)
        if(editCourse){
            // NOTE: if course is editable check that is form is being updated or not if yes call update course controller from db 
            // else it is a new course create course 
            if(isformupdated()){
                const currentValues = getValues()
                const formData = new FormData()
                console.log(data)
                // if course is updated we are appending courseid so that we can update course in db
                formData.append("courseid", course._id)
                if (currentValues.coursetitle !== course.coursename) {
                formData.append("coursename", data.coursetitle)
                }
                if (currentValues.courseshortdescription !== course.coursedescription) {
                formData.append("coursedescription", data.courseshortdescription)
                }
                if (currentValues.courseprice !== course.price) {
                formData.append("price", data.courseprice)
                } 
                // TODO:tags
                // if (currentValues.courseTags.toString() !== course.tags.toString()) {
                // formData.append("tags", JSON.stringify(data.courseTags))
                // }
                if (currentValues.coursebenefits !== course.whatwillyoulearn) {
                formData.append("whatwillyoulearn", data.coursebenefits)
                }
                // TODO:look here  how ?  currentValues.coursecategory._id !== course.category._id
                if (currentValues.coursecategory._id !== course.category._id) {
                formData.append("category", data.coursecategory)
                }
                if (
                currentValues.courserequirements.toString() !==
                course.instructions.toString()
                ) {
                formData.append(
                    "instructions",
                    JSON.stringify(data.courserequirements)
                )
                }
                // if (currentValues.courseImage !== course.thumbnail) {
                // formData.append("thumbnail", data.courseImage)
                // }
                console.log("Edit Form data: ", formData)
                setloading(true)
                const result = await editCourseDetails(formData, token)
                setloading(false)
                if (result) {
                dispatch(setstep(2))
                dispatch(setcourse(result))
                }
            }
            else{
                toast.error("No changes made to the form")
            }
            return
        }

        //creat new course
        const formData = new FormData();
        formData.append("coursename", data.coursetitle)
        formData.append("coursedescription", data.courseshortdescription)
        formData.append("price", data.courseprice)
        // formData.append("tags", JSON.stringify(data.courseTags))
        formData.append("whatwillyoulearn", data.coursebenefits)
        formData.append("category", data.coursecategory)
        formData.append("status", COURSE_STATUS.DRAFT)
        formData.append("instructions", JSON.stringify(data.courserequirements))  
        // formData.append("thumbnailImage", data.courseimage)

        setloading(true);

        // console.log("formdata is ....." , formData)

        const result = await addCourseDetails(formData, token);
        console.log("result is ..=" , result)
        if (result) {
            dispatch(setstep(2));
            dispatch(setcourse(result)) 
        }
        setloading(false)

    }

    // useEffect(()=> {
    //     console.log("currently step is " , step)
    //     console.log("course is " , course)
    // } , [step , course])

  return (
    
    //   <form onSubmit={handleSubmit(onSubmit)} className='rounded-md border-richblack-700 bg-richblack-800 space-y-8'>

    //     {/* title  */}
    //     <div>
    //         <label htmlFor='coursetitle'>Course title <sup>*</sup></label>
    //         <input id='coursetitle' placeholder='Enter course Title' name='coursetitle' className='w-full' {...register("coursetitle" , {required:true} )}></input>
    //         {
    //             errors.coursetitle && (
    //                 <span>Course Title is Required</span>
    //             )
    //         }
    //     </div>

    //         {/* description  */}
    //     <div>
    //         <label htmlFor='courseshortdescription'>Course short description <sup>*</sup></label>
    //         <textarea id='courseshortdescription'
    //         name='courseshortdescription'
    //         className='min-h-[140px] w-full'
    //         {...register("courseshortdescription" , {required:true})}
    //         placeholder='Enter description'>

    //         </textarea>

    //         {
    //             errors.courseshortdescription && (
    //                 <span>Course description is required</span>
    //             )
    //         }
    //     </div>

    //             {/* price  */}
    //     <div className='relative'>
    //         <label htmlFor='courseprice'>Course Price <sup>*</sup></label>
    //         <input id='courseprice'
    //         name='courseprice'
    //         className=' w-full'
    //         {...register("courseprice" , {required:true , valueAsNumber:true})} 
    //         placeholder='Enter course Price'>

    //         </input>

    //         <HiOutlineCurrencyRupee className='absolute top-1/2 text-richblack-400'></HiOutlineCurrencyRupee>
    //         {
    //             errors.courseprice && (
    //                 <span>Course Price is required</span>
    //             )
    //         }
    //     </div>

    //     {/* category  */}

    //     {/* <div className='relative'>
    //         <label htmlFor='coursecategory'>Course category <sup>*</sup></label>
    //         <select id='coursecategory'
    //         name='coursecategory'
    //         defaultValue=""
    //         {...register("coursecategory" ,  {required:true} )}>

    //             {/* by default we will see this option  */}
    //             {/* <option value="" disabled className='text-yellow-50'>Choose a category</option>
    //             {
    //                 !loading && coursecategories.map((category , index)=> {
    //                     return <option key={index} value={category?._id} className='text-yellow-50'>
    //                         {category?.name}
    //                     </option>
    //                 })
    //             }

    //         </select>

    //         {
    //             errors.coursecategory && (
    //                 <span>Course category is required</span>
    //             )
    //         }
    //     </div> */}


    //     {/* category new */}

    //     <div className="flex flex-col space-y-2">
    //         <label htmlFor='coursecategory' className="text-sm text-richblack-5">
    //             Category <sup className="text-pink-200">*</sup>
    //         </label>

    //         <select 
    //         id='coursecategory'
    //         defaultValue=""
    //         {...register("coursecategory", {required:true})}
    //         className='form-style w-full'>
    //             <option value="" disabled>Choose a category</option>
    //             {
    //                 !loading && 
    //                 coursecategories.map((category, index) => (
    //                     <option value={category?._id} key={index}>
    //                         {category?.name}
    //                     </option>
    //                 ))
    //             }
    //         </select>
    //         {errors.coursecategory && (
    //             <span className="ml-2 text-xs tracking-wide text-pink-200">
    //             Course Category is required
    //             </span>
    //         )}
    //     </div>


    //     {/* // creat componnent for tag   Todo */}

    //     {/* <Chipinput label="Tags" name="coursetags" placeholder="Enter tag and press enter"
    //     register={register}
    //     errors={errors}
    //     setValue={setValue}
    //     getValues={getValues}></Chipinput> */}



    //     {/* creat a compnent for uploading and showing preview of media */}

    //     {/* <Upload 
    //     name=
    //     label=
    //     register={register}
    //     errors={errors}></Upload> */}


    //     {/* benefits of course  */}
        
    //     <div>
    //         <label htmlFor='coursebenefits'>Benefits of the Course <sup>*</sup></label>
    //         <textarea id='coursebenefits'
    //         placeholder='Enter benefits of course'
    //         name='coursebenefits'
    //         {...register("coursebenefits" , {required:true})}
    //         className='min-h-[130px] w-full'></textarea>

    //         {
    //             errors.coursebenefits && (
    //                 <span>Benefits of course are Required</span>
    //             )
    //         }
    //     </div>

    //     <Requirementfields
    //     name="courserequirements" 
    //     errors={errors}
    //     register={register}
    //     setValue={setValue}
    //     getValues={getValues}
    //     label="Requirements/Instructions"></Requirementfields>

    //     <div>
    //         {
    //             editCourse && (
    //                 <button disabled={loading} onClick={()=>dispatch(setstep(2))}>
    //                     Contnue without saving
    //                 </button>
    //             )
    //         }

    //         <Iconbutton disabled={loading} text={!editCourse ? "Next" : "Save Changes"} ><MdNavigateNext/></Iconbutton>
    //     </div>

    //   </form>






    <form onSubmit={handleSubmit(onSubmit)}
    className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6" 
    >
        {/* Course Title */}
        <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="coursetitle">
            Course Title <sup className="text-pink-200">*</sup>
            </label>
            <input 
                id='coursetitle'
                placeholder='Enter Course Title'
                {...register("coursetitle", {required: true})}
                className='form-style w-full'
            />
            {
                errors.coursetitle && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                Course title is required
            </span>
                )
            }
        </div>
        
        {/* Course Description */}
        <div className='flex flex-col space-y-2'>
            <label htmlFor='courseshortdescription' className=' text-sm text-richblack-5'>
                Course Short Description <sup className=' text-pink-200'>*</sup>
            </label>
            <textarea id='courseshortdescription' placeholder='Enter Description'
                {...register("courseshortdescription",{required:true})}
                className=' form-style resize-x-none min-h-[130px] w-full'
            />
            {errors.courseshortdescription && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
                Course Description is required
            </span>
            )}
        </div>

        {/* Course Price */}
        <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseprice">
          Course Price <sup className="text-pink-200">*</sup>
        </label>
        <div className="relative">
          <input
            id="courseprice"
            placeholder="Enter Course Price"
            {...register("courseprice", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
            className="form-style w-full !pl-12"
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
        </div>
        {errors.courseprice && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Price is required
          </span>
        )}
        </div>
        
        {/* Course Category DropDown */}
        <div className="flex flex-col space-y-2">
            <label htmlFor='coursecategory' className="text-sm text-richblack-5">
                Category <sup className="text-pink-200">*</sup>
            </label>

            <select 
            id='coursecategory'
            defaultValue=""
            {...register("coursecategory", {required:true})}
            className='form-style w-full'>
                <option value="" disabled>Choose a category</option>
                {
                    !loading && 
                    coursecategories.map((category, index) => (
                        <option value={category?._id} key={index}>
                            {category?.name}
                        </option>
                    ))
                }
            </select>
            {errors.coursecategory && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                Course Category is required
                </span>
            )}
        </div>

        {/* Tags component */}
        {/* <ChipInput
            label="Tags"
            name="courseTags"
            placeholder="Enter Tags and Press Enter"
            register={register}
            setValue={setValue}
            getValues={getValues}
            errors={errors}
        /> */}


        {/* Upload Component */}
        {/* <Upload 
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
        /> */}

        {/* Benefits of the course */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="coursebenefits">
          Benefits of the course <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="coursebenefits"
          placeholder="Enter benefits of the course"
          {...register("coursebenefits", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full"
        />
        {errors.coursebenefits && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Benefits of the course is required
          </span>
        )}
      </div>
      {/* Requirements/Instructions */}

      <Requirementfields
        name="courserequirements"
        label="Requirements/Instructions"
        register={register}
        setValue={setValue}
        errors={errors}
        getValues={getValues}
      />

      <div className='flex justify-end gap-2'>
        {editCourse && (
            <button 
            onClick={()=> dispatch(setstep(2))}
            disabled={loading}
            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
            >
                Continue Without Saving
            </button>
        )}
        <Iconbutton 
        disabled={loading}
        text={editCourse ? "Save Changes" : "Next"}
        >
            <MdNavigateNext/>
        </Iconbutton>
      </div>

    </form>
    
  )
}

export default Courseinformationform
