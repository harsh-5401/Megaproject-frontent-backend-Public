import { combineReducers } from "@reduxjs/toolkit";
import authreducer from "../slices/authslice"
import profilereducer from "../slices/profileslice";
import cartreducer from "../slices/cartslice"
import coursereducer from "../slices/courseSlice"
import viewcoursereducer from "../slices/viewCourseSlice"


const rootReducer=combineReducers({
    auth:authreducer,
    profile:profilereducer,
    cart:cartreducer,
    course:coursereducer,
    viewcourse:viewcoursereducer,


})

export default rootReducer