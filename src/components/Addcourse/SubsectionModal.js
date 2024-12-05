import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { createSubSection, updateSubSection } from '../../services/operations/courseDetailsAPI'
import { RxCross1 } from 'react-icons/rx'
import Iconbutton from '../common/Iconbutton'
import Upload from './Upload'
import { setcourse } from '../../slices/courseSlice'
import { RxCross2 } from 'react-icons/rx'


function SubsectionModal({modaldata , setmodaldata , add=false , view=false , edit=false}) {

    const {
        register ,
        handleSubmit,
        setValue,
        getValues,
        formState:{errors}
    } = useForm()

    const dispatch=useDispatch();
    const {course} = useSelector((state)=>state.course);
    const {token} = useSelector((state)=>state.auth);
    const [loading , setloading] = useState(false);

    useEffect(()=> {
        console.log("modaldata is " , modaldata)
        if(view||edit) {
            setValue("lecturetitle" , modaldata.title);
            setValue("lecturedescription" , modaldata.description);
            setValue("lecturevideo" , modaldata.videourl)
        }
    }, [])

    // tell us that is form is being updated or not later on if yes return true 
    function isformupdated() {
        const currentValues = getValues();
        if(
            currentValues.lecturetitle !== modaldata.title ||
            currentValues.lecturedescription !== modaldata.description ||
            currentValues.lecturevideo !== modaldata.videourl
        ){
            return true
        }
        return false

    }

    async function handleEditsubsection(){

        const currentValues = getValues()
        console.log("changes after editing form values:", currentValues)
        const formData = new FormData()
        console.log("Values After Editing form values:", currentValues)
        
        formData.append("courseid", course._id)
        formData.append("sectionid", modaldata.sectionid)      
        formData.append("subsectionid", modaldata._id)
        if (currentValues.lecturetitle !== modaldata.title) {
        formData.append("title", currentValues.lecturetitle)
        }
        if (currentValues.lecturedescription !== modaldata.description) {
        formData.append("description", currentValues.lecturedescription)
        }
        if (currentValues.lecturevideo !== modaldata.videourl) {
        formData.append("video", currentValues.lecturevideo)
        }

        //api call
        setloading(true);
        const result = await updateSubSection(formData, token)
        // if (result) {
        // console.log("result after api call", result)
        // // update the structure of course
        // const updatedCourseContent = course.courseContent.map((section) =>
        //     section._id === modaldata.sectionid ? result : section
        // )
        // const updatedCourse = { ...course, courseContent: updatedCourseContent }
        // console.log("upper set course");
        // dispatch(setcourse(updatedCourse));
        // }

        if (result) {
            console.log("result after api call", result)
            // update the structure of course
            dispatch(setcourse(result));
            }
        setmodaldata(null)
        setloading(false)
    }

    async function onSubmit(data){
        if(view) {
            return;
        }

        if(edit){
            // you have made changes in any subsection 
            if(!isformupdated) {
                toast.error("No changes made to the form")
            } else{
                handleEditsubsection();
            }

            return 
        } 

        // ADD sub section 

        const formData = new FormData()
        formData.append("courseid", course._id)
        formData.append("sectionid", modaldata)
        formData.append("title", data.lecturetitle)
        formData.append("description", data.lecturedescription)
        formData.append("video", data.lecturevideo)
        console.log("formdata here is" , formData)
        setloading(true)
        const result = await createSubSection(formData, token)
        // if (result) {
        // // update the structure of course
        // const updatedCourseContent = course.courseContent.map((section) =>
        //     section._id === modaldata ? result : section
        // )
        // const updatedCourse = { ...course, courseContent: updatedCourseContent }
        // dispatch(setcourse(updatedCourse))
        // }

        if (result) {
            // update the structure of course
            console.log("result is " , result);
            dispatch(setcourse(result))
        
        }
        setmodaldata(null)
        setloading(false)

        
    }


  return (
    
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
          </p>
          <button onClick={() => (!loading ? setmodaldata(null) : {})}>
            <RxCross2 className="text-2xl text-richblack-5" />
          </button>
        </div>
        {/* Modal Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 px-8 py-10"
        >
          {/* Lecture Video Upload */}
          <Upload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modaldata.videoUrl : null}
            editData={edit ? modaldata.videoUrl : null}
          />
          {/* Lecture Title */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="lecturetitle">
              Lecture Title {!view && <sup className="text-pink-200">*</sup>}
            </label>
            <input
              disabled={view || loading}
              id="lecturetitle"
              placeholder="Enter Lecture Title"
              {...register("lecturetitle", { required: true })}
              className="form-style w-full"
            />
            {errors.lecturetitle && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture title is required
              </span>
            )}
          </div>
          {/* Lecture Description */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="lecturedescription">
              Lecture Description{" "}
              {!view && <sup className="text-pink-200">*</sup>}
            </label>
            <textarea
              disabled={view || loading}
              id="lecturedescription"
              placeholder="Enter Lecture Description"
              {...register("lecturedescription", { required: true })}
              className="form-style resize-x-none min-h-[130px] w-full"
            />
            {errors.lecturedescription && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture Description is required
              </span>
            )}
          </div>
          {!view && (
            <div className="flex justify-end">
              <Iconbutton
                disabled={loading}
                text={loading ? "Loading.." : edit ? "Save Changes" : "Save"}
              />
            </div>
          )}
        </form>
      </div>
    </div>

  )
}

export default SubsectionModal
