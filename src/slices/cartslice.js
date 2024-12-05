import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
import toast from "react-hot-toast";

const initialstate={
    totalitems:localStorage.getItem("totalitems") ? JSON.parse.parse(localStorage.getItem("totalitems")) : 0,
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")):[],
    total: localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")):0,
}


const cartslice=createSlice({
    name:"cart",
    initialState:initialstate,
    reducers:{
        
        settotalitems(state , value) {
            state.totalitems=value.payload;
        },

        //add to cart

        addtocart : (state,action)=>{
            const course = action.payload;
            console.log("course is cartsllice" , course)
            const index = state.cart.findIndex((item)=> item._id === course._id)

            if(index>=0){
                toast.error("Course present in cart");
                return
            }

            state.cart.push(course);
            state.totalitems++;
            state.total += JSON.parse(course.price);

            localStorage.setItem("cart", JSON.stringify(state.cart))
        localStorage.setItem("total", JSON.stringify(state.total))
        localStorage.setItem("totalItems", JSON.stringify(state.totalitems))
        // show toast
        toast.success("Course added to cart")

        },

        // remove cart

        removefromcart: (state, action) => {
            const courseId = action.payload
            const index = state.cart.findIndex((item) => item._id === courseId)
      
            if (index >= 0) {
              // If the course is found in the cart, remove it
              state.totalitems--
              state.total -= state.cart[index].price
              state.cart.splice(index, 1)
              // Update to localstorage
              localStorage.setItem("cart", JSON.stringify(state.cart))
              localStorage.setItem("total", JSON.stringify(state.total))
              localStorage.setItem("totalItems", JSON.stringify(state.totalitems))
              // show toast
              toast.success("Course removed from cart")
            }
          },

        //reset cart

        resetcart: (state) => {
            state.cart = []
            state.total = 0
            state.totalitems = 0
            // Update to localstorage
            localStorage.removeItem("cart")
            localStorage.removeItem("total")
            localStorage.removeItem("totalItems")
          }
    }
})

export const {settotalitems , removefromcart , resetcart , addtocart} = cartslice.actions;
export default cartslice.reducer;