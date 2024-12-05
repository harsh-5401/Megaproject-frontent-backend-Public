import React from 'react'
import { useSelector } from 'react-redux'
import Iconbutton from '../../common/Iconbutton'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import{buyCourse} from "../../../services/operations/studentFeaturesAPI"

function Rendertotalamount() {
    const {total , cart} = useSelector((state)=>state.cart);
    const {token} = useSelector((state)=>state.auth);
    const {user , loading} = useSelector((state)=>state.profile);
    const navigate= useNavigate()
    const dispatch= useDispatch();

   async function handlebuycourse() {
        // payment gateway  Api integrate remain
        const courses= cart.map((course)=> course._id);
        console.log("Bought these coursez" , courses)
        await buyCourse(token , courses , user , navigate , dispatch);
    }

  return (

    
    

    <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
      <p className="mb-6 text-3xl font-medium text-yellow-100">₹ {total}</p>
      <Iconbutton
        text="Buy Now"
        onclick={handlebuycourse}
        customClasses="w-full justify-center"
      />
    </div>

  )
}

export default Rendertotalamount
