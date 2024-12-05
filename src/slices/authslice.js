import { createSlice } from "@reduxjs/toolkit";

const initialstate={
    token:localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    loading:false,
    signupData: null,
};

const authslice = createSlice({
    name:"auth",
    initialState:initialstate,
    reducers: {
        settoken(state , value) {
            console.log("token in slics is" , value.payload)
            state.token = value.payload
        },
        setSignupData: (state,value) =>{
            state.signupData = value.payload;
        },
        setloading(state, value) {
            state.loading = value.payload;
          },
    }

})

export const {settoken , setSignupData , setloading} =authslice.actions;
export default authslice.reducer;