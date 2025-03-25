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
import getUserProfile from "@/libs/getUserProfile";

export default function LocationDateReserve({ massageJson }: { massageJson: MassageJson }) {
    const { data: session } = useSession();
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const searchParams = useSearchParams();

    const shopFromURL = searchParams.get("shop") || "";
    const bookingList = useSelector((state: RootState) => state.bookSlice.bookItems);

    const [nameLastname,setNameLastname] = useState<string>(session?.user?.name ?? "");
    const [tel, setTel] = useState<string>(session?.user?.tel ?? "");
    const [reserveDate, setReserveDate] = useState<Dayjs | null>(null);
    const [reserveTime, setReserveTime] = useState<Dayjs | null>(null);
    const [location, setLocation] = useState(shopFromURL || "baansaifon");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    let userData;

    useEffect(() => {
        if (shopFromURL) {
            setLocation(shopFromURL);
        }
        const fetchUserProfile = async () => {
            try {
              if (session?.user?.token) {
                userData = await getUserProfile(session.user.token);
                console.log(userData)
                setNameLastname(userData.data.name)
                // Update state variables with user data
                setTel(userData.tel); 
                // Update other state variables as needed 
              }
            } catch (error) {
              console.error("Error fetching user profile:", error);
              // Handle the error appropriately, maybe show a user-friendly error message
            }
          };
          fetchUserProfile();
    }, [shopFromURL, session?.user?.token]);
    
    const makeReservation = () => {
        if (nameLastname && tel && reserveDate && reserveTime && location) {
            const reserveDateTime = dayjs(reserveDate)
                .hour(reserveTime.hour())
                .minute(reserveTime.minute());

            const newBooking: BookingItem = {
                appointmentId:'',
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
                const shop = massageJson.data.find((item) => item.name === newBooking.shop)
                if (shop) {
                    setIsLoading(true);
                    createAppointment(newBooking.token, shop._id, reserveDate.format('YYYY/MM/DD'), reserveTime.format('HH:mm')).then((createdAppointment) => {
                        // อัพเดท appointmentId ใน newBooking
                        console.log(createdAppointment)
                        newBooking.appointmentId = createdAppointment.data._id; 
                        dispatch(addBooking(newBooking)); 
                        router.push("/mybooking"); 
                      })
                      .catch((error) => {
                        console.error("Error creating appointment:", error);
                        // Handle the error appropriately, maybe show a user-friendly error message
                      })
                      .finally(() => {
                        setIsLoading(false); // ปิด loading
                      });
                }
            }
        }
    };

    return (
        <main className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
                {isLoading && (
                    <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
                        <p className="text-lg font-semibold">กำลังบันทึกข้อมูล...</p>
                    </div>
                )}
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