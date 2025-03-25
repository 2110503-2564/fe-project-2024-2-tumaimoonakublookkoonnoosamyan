"use client";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { updateBooking } from "@/redux/features/bookSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LocalizationProvider, DatePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

export default function UpdateBooking() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const searchParams = useSearchParams();

    const shop = searchParams.get("shop");
    const existingItem = useAppSelector((state: any) =>
        state.bookSlice.bookItems.find((item: BookingItem) => item.shop === shop)
    );

    const [updatedData, setUpdatedData] = useState<BookingItem | null>(existingItem || null);
    const [reserveDate, setReserveDate] = useState<Dayjs | null>(
        existingItem ? dayjs(existingItem.bookDate, "YYYY/MM/DD HH:mm") : null
    );
    const [reserveTime, setReserveTime] = useState<Dayjs | null>(
        existingItem ? dayjs(existingItem.bookDate, "YYYY/MM/DD HH:mm") : null
    );

    const handleSaveUpdate = () => {
        if (updatedData && reserveDate && reserveTime) {
            const updatedDateTime = dayjs(reserveDate)
                .hour(reserveTime.hour())
                .minute(reserveTime.minute());

            dispatch(updateBooking({ ...updatedData, bookDate: updatedDateTime.format("YYYY/MM/DD HH:mm") }));
            router.push("/mybooking");
        }
    };

    if (!existingItem) {
        return <div className="text-center text-red-600 font-bold text-lg mt-4">Booking not found!</div>;
    }

    return (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-300 mt-8">
            <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">Update Booking</h2>

            <div className="space-y-4">
                <input
                    type="text"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={updatedData?.nameLastname || ""}
                    onChange={(e) => setUpdatedData(prev => prev ? { ...prev, nameLastname: e.target.value } : null)}
                    placeholder="Enter Name"
                />
                <input
                    type="text"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={updatedData?.tel || ""}
                    onChange={(e) => setUpdatedData(prev => prev ? { ...prev, tel: e.target.value } : null)}
                    placeholder="Enter Contact Number"
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        className="w-full"
                        value={reserveDate}
                        onChange={setReserveDate}
                    />
                    <TimePicker
                        className="w-full"
                        value={reserveTime}
                        onChange={setReserveTime}
                    />
                </LocalizationProvider>
            </div>

            <button
                className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md font-semibold text-lg shadow-md hover:bg-blue-700 transition-all duration-200"
                onClick={handleSaveUpdate}
            >
                Save Changes
            </button>
        </div>
    );
}