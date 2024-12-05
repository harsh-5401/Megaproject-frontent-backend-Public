import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import ReactStars from "react-rating-stars-component";
import Iconbutton from '../common/Iconbutton';
import { createRating } from '../../services/operations/courseDetailsAPI';

function CoursereviewModal({setreviewmodal}) {


const {user} = useSelector((state)=>state.profile);
const {token} = useSelector((state)=>state.auth);

  const {
    courseSectionData,
    courseEntireData,
    completedLectures,
    totalNoOfLectures,
  } = useSelector((state)=>state.viewcourse);

  const {
    register,
    setValue, 
    getValues,
    formState: {errors},
    handleSubmit
  } = useForm();

  async function onSubmit(data) {
    const response= await createRating ( 
      {
        courseid:courseEntireData._id,
        rating:data.courserating,
        review:data.courseexperience
      },
      token
    )
    console.log("Rating response= " , response);
    setreviewmodal(false)
  }

  function ratingChanged(newrating) {
    setValue("courserating" , newrating)

  }

  useEffect(()=> {
    setValue("courseexperience" , "");
    setValue("courserating" , 0);

  }, [])

  return (
    <div className='text-white'>
      <div>

        <div>
          <p>Add Review</p>
          <button onClick={() => setreviewmodal(false)}>
            Close
          </button>
        </div>

        {/* modal body  */}

        <div>

          <div>

            <img src={user?.image} alt='user image' className='aspect-square w-[50px] rounded-full object-cover' ></img>
            <div>
              <p>{user.firstname} {user.lastname}</p>
              <p>Posting Publicly</p>
            </div>

          </div>

          <form onSubmit={handleSubmit(onSubmit)} className='mt-6 flex-col  items-center' >

          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={24}
            activeColor="#ffd700"
          />

          <div>
            <label htmlFor='courseexperience'>
              Add your Expereince
            </label>
            <textarea id='courseexperience' name='courseexperience' placeholder='Add your Expereince' {...register("courseexperience" , {required:true})} className='form-style min-h-[130px] w-full'></textarea>

            {
              errors.courseexperience && (
                <span>
                  Please Add your Expereince
                </span>
              )
            }

          </div>

          <div>

            <button onClick={()=> setreviewmodal(false)}> Cancel</button>

            <Iconbutton text="Save"></Iconbutton>

          </div>

          </form>



        </div>

      </div>
      
    </div>
  )
}

export default CoursereviewModal
