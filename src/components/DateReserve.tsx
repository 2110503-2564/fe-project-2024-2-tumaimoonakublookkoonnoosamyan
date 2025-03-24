"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Select, MenuItem, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { addBooking } from "@/redux/features/bookSlice";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { useSession } from "next-auth/react";
import createAppointment from "@/libs/createAppointment";

export default function LocationDateReserve({ massageJson }: { massageJson: MassageJson }) {
    const { data: session } = useSession();
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const searchParams = useSearchParams();

    const shopFromURL = searchParams.get("shop") || "";
    const bookingList = useSelector((state: RootState) => state.bookSlice.bookItems);

    const [nameLastname, setNameLastname] = useState<string>(session?.user?.name ?? "");
    const [tel, setTel] = useState<string>(session?.user?.tel ?? "");
    const [reserveDate, setReserveDate] = useState<Dayjs | null>(null);
    const [reserveTime, setReserveTime] = useState<Dayjs | null>(null);
    const [location, setLocation] = useState(shopFromURL || "baansaifon");
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        if (shopFromURL) {
            setLocation(shopFromURL);
        }
    }, [shopFromURL]);

    const makeReservation = () => {
        if (nameLastname && tel && reserveDate && reserveTime && location) {
            const reserveDateTime = dayjs(reserveDate)
                .hour(reserveTime.hour())
                .minute(reserveTime.minute());

            const newBooking: BookingItem = {
                token:session?.user?.token??'',
                nameLastname:nameLastname,
                tel:tel,
                shop: location,
                bookDate: reserveDateTime.format("YYYY/MM/DD HH:mm"),
            };

            // เช็คว่ามีการจองซ้ำหรือไม่
            const isDuplicate = bookingList.some(
                (item) => item.shop === newBooking.shop && item.bookDate === newBooking.bookDate
            );

            if (isDuplicate) {
                setErrorMessage("เวลานี้ถูกจองไปแล้ว กรุณาเลือกเวลาอื่น!");
            } else {
                dispatch(addBooking(newBooking));
                const shop = massageJson.data.find((item) => item.name === newBooking.shop)
                if (shop) {
                    createAppointment(newBooking.token, shop._id, reserveDate.format('YYYY/MM/DD'), reserveTime.format('HH:mm'))
                    router.push("/mybooking");
                }
            }
        }
    };

    return (
        <main className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Massage Shop Booking</h2>

                {/* แจ้งเตือนเมื่อมีการจองซ้ำ */}
                {errorMessage && (
                    <div className="bg-red-500 text-white text-center p-3 rounded-lg mb-4">
                        {errorMessage}
                        <button
                            className="ml-2 text-black font-bold"
                            onClick={() => setErrorMessage("")}
                        >
                            ✖
                        </button>
                    </div>
                )}

                <form className="space-y-5">
                    <div className="flex flex-col space-y-4">
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="Name-Lastname"
                            value={nameLastname}
                            onChange={(e) => setNameLastname(e.target.value)}
                            className="bg-white rounded-md"
                        />
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="Contact-Number"
                            value={tel}
                            onChange={(e) => setTel(e.target.value)}
                            className="bg-white rounded-md"
                        />
                    </div>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <div className="flex flex-col space-y-4">
                            <Select
                                variant="outlined"
                                fullWidth
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="bg-white rounded-md"
                            >
                                {massageJson.data.map((shop) => (
                                    <MenuItem key={shop.name} value={shop.name}>
                                        {shop.name}
                                    </MenuItem>
                                ))}
                            </Select>

                            <DatePicker
                                className="bg-white rounded-md"
                                value={reserveDate}
                                onChange={(value) => setReserveDate(value)}
                            />
                            <TimePicker
                                className="bg-white rounded-md"
                                value={reserveTime}
                                onChange={(value) => setReserveTime(value)}
                            />
                        </div>
                    </LocalizationProvider>
                </form>

                <button
                    className="mt-6 w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:from-indigo-600 hover:to-blue-500 transition-transform transform hover:scale-105"
                    onClick={makeReservation}
                >
                    Book Massage Shop
                </button>
            </div>
        </main>
    );
}