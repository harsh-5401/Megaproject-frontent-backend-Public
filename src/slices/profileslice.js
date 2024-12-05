import { createSlice } from "@reduxjs/toolkit";

const initialstate={
    
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading: false,
};

const profileslice = createSlice({
    name:"profile",
    initialState:initialstate,
    reducers: {
        setuser(state , value) {
            console.log("data of User in profile slice", value.payload);
            state.user=value.payload
            console.log("user in initail state is" , initialstate.user);
        },

        setLoading(state, value) {
            state.loading = value.payload;
        }
    }

})

export const {setuser , setLoading} =profileslice.actions;
export default profileslice.reducer;