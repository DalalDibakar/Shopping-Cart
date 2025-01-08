import { combineReducers } from "@reduxjs/toolkit"
import cartReducer from "../Slices/CartSlice"

const rootReducer = combineReducers({
  cart: cartReducer,
})

export default rootReducer
