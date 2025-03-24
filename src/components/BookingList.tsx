"use client";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { removeBooking } from "@/redux/features/bookSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

export default function BookingList() {
    const bookItems = useAppSelector((state: any) => state.bookSlice.bookItems);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    return (
        <>
  {bookItems.length === 0 ? (
    "No Shop Booking"
  ) : (
    bookItems.map((bookItem: BookingItem) => (
      <div className="bg-slate-200 rounded-lg px-5 mx-5 py-4 my-3 shadow-md" key={bookItem.shop}>
        <div className="text-xl font-semibold text-gray-800">Name: {bookItem.nameLastname}</div>
        <div className="text-sm text-gray-600">Tel: {bookItem.tel}</div>
        <div className="text-sm text-gray-600">Location: {bookItem.shop}</div>
        <div className="text-md font-medium text-gray-700">Date: {bookItem.bookDate}</div>

        {/* ปุ่ม Update และ Remove อยู่ข้างกัน */}
        <div className="flex justify-start items-center gap-2 mt-3">
          {/* ปุ่ม Update (ซ้ายสุด) */}
          <button
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300"
            onClick={() => router.push(`/update-booking?shop=${encodeURIComponent(bookItem.shop)}`)}
          >
            Update
          </button>

          {/* ปุ่ม Remove */}
          <button
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300"
            onClick={() => dispatch(removeBooking(bookItem))}
          >
            Remove
          </button>
        </div>
      </div>
    ))
  )}
</>

    );
}