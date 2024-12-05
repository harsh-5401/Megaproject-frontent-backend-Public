import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  step: 1,
  course: null,
  editCourse: false,
  paymentLoading: false,
}

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setstep: (state, action) => {
      state.step = action.payload
    },
    setcourse: (state, action) => {
      state.course = action.payload
    },
    seteditcourse: (state, action) => {
      state.editCourse = action.payload
    },
    setpaymentloading: (state, action) => {
      state.paymentLoading = action.payload
    },
    resetcourseState: (state) => {
      state.step = 1
      state.course = null
      state.editCourse = false
    },
  },
})

export const {
  setstep,
  setcourse,
  seteditcourse,
  setpaymentloading,
  resetcourseState,
} = courseSlice.actions

export default courseSlice.reducer