import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Iconbutton from '../common/Iconbutton';
import { MdAddCircleOutline, MdToken } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import Nestedview from './Nestedview';
import {BiRightArrow} from "react-icons/bi"
import { setcourse, seteditcourse, setstep } from '../../slices/courseSlice';
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../services/operations/courseDetailsAPI';



function Coursebuilderform() {

  const {
    register,
    setValue, 
    getValues,
    formState: {errors},
    handleSubmit
  } = useForm();


  const[editsectionname , seteditsectionname] = useState(null);
  const {course} = useSelector((state)=>state.course);
  const {token} = useSelector((state)=>state.auth);
  const dispatch= useDispatch();
  const[loading , setloading] = useState(false)

  function canceledit() {
    seteditsectionname(null)
    // when you cancel the edit as you are using form again set value of section name empty
    setValue("sectionname" , "")
  }

  function goBack(){
    // now if i go back to step 1 i am not creating course i am ediiting alrrady creadted course by me
    // so i need to mark setedit as true 
    // so now we are calling edit course api not create course api
    dispatch(setstep(1))
    dispatch(seteditcourse(true))
  }

  function gotoNext() {
    if(course.coursecontent.length===0) {
      toast.error("please add atleast one section");
      return 
    }
    if(course.coursecontent.some((section)=> section.subsection.length===0)){
      toast.error("please add atleast one lecture in each section");
      return 
    }

    // if everyththing is good move to next step
    dispatch(setstep(3))
  }


  function handleChangeEditSectionName (sectionid , sectionname) {
    if(editsectionname === sectionid){
      canceledit();
      return;
    }
    seteditsectionname(sectionid)
    setValue("sectionname" , sectionname)
  }

  

  const onsubmit = async (data) => {
    setloading(true)
    let result

    if (editsectionname) {
      result = await updateSection({
        sectionname: data.sectionname,
        sectionid: editsectionname,
        courseid: course._id
      },
      token)
    }else{
      result = await createSection({
        sectionname: data.sectionname,
        courseid:course._id
      },
      token)
    }

    if(result) {
      dispatch(setcourse(result))
      seteditsectionname(null);
      setValue("sectionname", "")
    }
    setloading(false)
  }

  

  useEffect(()=>{
    // console.log("coursedata is " , course)
    console.log("edit section name flag" , editsectionname)
  },[editsectionname])


  return (
    
    // <div>
    //   <p>Course Builder</p>

    //   <form onSubmit={handleSubmit(onsubmit)}>
    //     <div>
    //       <label htmlFor='sectionname'>Section Name <sup>*</sup></label>
    //       <input id='sectionname' name='sectionname' placeholder='Add Section name' {...register("sectionname" , {required:true})} className='w-full text-richblue-800'></input>
    //       {
    //         errors.sectionname && (
    //           <span>Section Name is Required</span>
    //         )
    //       }
    //     </div>

    //     <div className='flex gap-5'>
    //       <Iconbutton type="Submit" text={editsectionname ? "Edit section Name" : "Create Section"} outline={true}  customclasses={"text-white"}>
            
    //         <MdAddCircleOutline size={20} className='text-yellow-50'/>

    //       </Iconbutton>  

    //       {
    //         editsectionname && (
    //           <button type='button' onClick={canceledit} className='text-sm text-richblack-300 underline' >Cancel Edit</button>
    //         )
    //       }
    //     </div>
        
    //   </form>

    //   {
    //     course.coursecontent.length > 0 && (
    //       <Nestedview handleChangeEditSectionName={handleChangeEditSectionName}></Nestedview>
    //     )
    //   }

    //   <div className='flex justify-end gap-x-3 mt-10'>
    //     <button onClick={goBack} className='rounded-md cursor-pointer flex items-center text-richblack-50 bg-caribbeangreen-400 px-6 ' >Back</button>
    //     <Iconbutton text={"Next"} onclick={gotoNext}>
    //       <BiRightArrow></BiRightArrow>
    //     </Iconbutton>

    //   </div>
      
    // </div>

    // after adding tailwind 

    <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>
      <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor='sectionname' 
          className="text-sm text-richblack-5">Section Name <sup className="text-pink-200">*</sup> </label>

          <input
            id='sectionname'
            placeholder='Add a section to build the course'
            disabled={loading}
            {...register("sectionname", {required:true})}
            className='form-style w-full'
          />

            {errors.sectionname && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Section name is required
              </span>
            )}
        </div>

        <div>
          <Iconbutton
          type="submit"
          disabled={loading}
          text={editsectionname ? "Edit Section Name" : "Create Section"}
          outline={true}>
            <MdAddCircleOutline size={20} className="text-yellow-50" />
          </Iconbutton>
          {editsectionname && (
            <button
              type="button"
              onClick={canceledit}
              className="text-sm text-richblack-300 underline"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
      {course.coursecontent.length > 0 && (
        <Nestedview handleChangeEditSectionName={handleChangeEditSectionName} />
      )}
      {/* Next Prev Button */}
      <div className="flex justify-end gap-x-3">
        <button
          onClick={goBack}
          className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
        >
          Back
        </button>
        <Iconbutton disabled={loading} text="Next" onclick={gotoNext}>
          <BiRightArrow />
        </Iconbutton>
      </div>
    </div>

  )
}

export default Coursebuilderform
