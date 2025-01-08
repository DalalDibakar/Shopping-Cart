import { createSlice } from '@reduxjs/toolkit'
import { useEffect } from 'react'
import toast from 'react-hot-toast';

// cart =[
//   {
//     id:
//     name:
//     image:
//     price:
//     quantity:
//   },
//   ...
// ]

const initialState = {
  cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
  total: localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) : 0,
  totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
  onlyids: localStorage.getItem("onlyids") ? JSON.parse(localStorage.getItem("onlyids")) : [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log(state.cart)
      const found = state.onlyids.includes(action.payload.id)
      if(found){
        toast.error("Item Found in Cart")
        return
      }
      const new_cart = [
        ...state.cart,
        action.payload
      ]
      state.cart = new_cart
      toast.success('Item Added to Cart!')
      state.total = state.cart.length
      state.totalItems = state.cart.map( item => item.quantity ).reduce((accumulator, currentValue) => accumulator + currentValue,0)
      state.onlyids = state.cart.map( item => item.id )
      localStorage.setItem("cart",JSON.stringify(state.cart))
      localStorage.setItem("total", JSON.stringify(state.total))
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
      localStorage.setItem("onlyids", JSON.stringify(state.onlyids))
    },

    removeFromCart: (state, action) => {
      const found = state.onlyids.includes(action.payload)
      if(!found){
        toast.error("Item Didn't Found in Cart")
        return
      }
      const new_cart = state.cart.filter( item => item.id !== action.payload)
      state.cart = new_cart
      toast.success('Item removed from Cart!')
      state.total = state.cart.length
      state.totalItems = state.cart.map( item => item.quantity).reduce((accumulator, currentValue) => accumulator + currentValue,0)
      state.onlyids = state.cart.map( item => item.id )
      localStorage.setItem("cart",JSON.stringify(state.cart))
      localStorage.setItem("total", JSON.stringify(state.total))
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
      localStorage.setItem("onlyids", JSON.stringify(state.onlyids))
    },

    increaseInQuantity: (state, action) => {
      const found = state.onlyids.includes(action.payload)
      if(!found){
        toast.error("Item Didn't Found in Cart")
        return
      }
      const target_item = state.cart.filter(item => item.id === action.payload)[0]
      const updated_item = {
        ...target_item,
        quantity: target_item.quantity += 1
      }
      const filtered_items = state.cart.filter(item => item.id !== action.payload)
      state.cart = [
        ...filtered_items,
        updated_item
      ]
      toast.success('Quantity increased by one for selected item in Cart!')
      state.total = state.cart.length
      state.totalItems = state.cart.map( item => item.quantity ).reduce((accumulator, currentValue) => accumulator + currentValue,0)
      localStorage.setItem("cart",JSON.stringify(state.cart))
      localStorage.setItem("total", JSON.stringify(state.total))
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
    },

    decreaseInQuantity: (state, action) => {
      const found = state.onlyids.includes(action.payload)
      if(!found){
        toast.error("Item Didn't Found in Cart")
        return
      }
      const target_item = state.cart.filter(item => item.id === action.payload)[0]
      if(target_item.quantity === 1){
        const new_cart = state.cart.filter( item => item.id !== action.payload)
        state.cart = new_cart
        toast.success('Item removed from Cart!')
        state.onlyids = state.cart.map( item => item.id )
        localStorage.setItem("onlyids", JSON.stringify(state.onlyids))
      }
      else{
        const updated_item = {
          ...target_item,
          quantity: target_item.quantity -= 1
        }
        const filtered_items = state.cart.filter(item => item.id !== action.payload)
        state.cart = [
          ...filtered_items,
          updated_item
        ]
        toast.success('Quantity decreased by one for selected item from Cart!')
      }
      
      state.total = state.cart.length
      state.totalItems = state.cart.map( item => item.quantity ).reduce((accumulator, currentValue) => accumulator + currentValue,0)
      localStorage.setItem("cart",JSON.stringify(state.cart))
      localStorage.setItem("total", JSON.stringify(state.total))
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
      localStorage.setItem("onlyids", JSON.stringify(state.onlyids))
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, increaseInQuantity, decreaseInQuantity } = cartSlice.actions

export default cartSlice.reducer