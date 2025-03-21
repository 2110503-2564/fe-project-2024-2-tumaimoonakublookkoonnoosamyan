'use client'
import { AppDispatch , useAppSelector } from "@/redux/store";
import { removeBooking } from "@/redux/features/bookSlice";
import { useDispatch, UseDispatch } from "react-redux";
import App from "next/app";

export default function BookingList(){
    const bookItems = useAppSelector((state: any) => state.bookSlice.bookItems)

    const dispatch = useDispatch<AppDispatch>()

    return (
        <>
            {
                bookItems.length ==0?
                "No Venue Booking":
                bookItems.map((bookItem:BookingItem)=>(
                    <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-2"
                    key={bookItem.nameLastname}>
                        <div className="text-xl">Name: {bookItem.nameLastname}</div>
                        <div className="text-sm">Tel: {bookItem.tel}</div>
                        <div className="text-sm">Location: {bookItem.venue}</div>
                        <div className="text-md">Date: {bookItem.bookDate}</div>
                        <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm"
                                onClick={()=>dispatch(removeBooking(bookItem))}>
                                Remove
                        </button>
                    </div>
                ))
            }
        </>
    )
}