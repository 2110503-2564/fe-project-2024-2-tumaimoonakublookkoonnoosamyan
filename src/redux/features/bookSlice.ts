import createAppointment from "@/libs/createAppointment"
import getUserProfile from "@/libs/getUserProfile"
import { createSlice , PayloadAction } from "@reduxjs/toolkit"
import { useSession } from "next-auth/react"

type BookState = {
    bookItems:BookingItem[]
}

const initialState:BookState = {bookItems:[]}

export const bookSlice = createSlice({
    name:"booking",
    initialState,
    reducers:{
        addBooking:(state,action:PayloadAction<BookingItem>)=>{
            const remainItems = state.bookItems.filter(obj => {
                return ((obj.shop !== action.payload.shop)||
                (obj.bookDate!==action.payload.bookDate))
            })
            state.bookItems = remainItems
            state.bookItems.push(action.payload)
        },
        removeBooking:(state,action:PayloadAction<BookingItem>)=>{
            const remainItems = state.bookItems.filter(obj => {
                return ((obj.shop !== action.payload.shop)||
                (obj.nameLastname !== action.payload.nameLastname)||
                (obj.tel !== action.payload.tel)||
                (obj.bookDate!==action.payload.bookDate))
            })
            state.bookItems = remainItems
        }
    }
})

export const {addBooking,removeBooking} = bookSlice.actions
export default bookSlice.reducer