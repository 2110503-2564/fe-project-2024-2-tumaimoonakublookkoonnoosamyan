"use client";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { removeBooking } from "@/redux/features/bookSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import deleteAppointment from "@/libs/deleteAppointment";
import { useSession } from "next-auth/react";
import getUserAppointments from "@/libs/getAppointments";
import getUserProfile from "@/libs/getUserProfile";
import { useEffect, useState } from "react";
import React from "react";

interface UserProfile {
  role: string;
  name: string;
}

interface MassageItem {
  _id: string;
  name: string;
  // Add other properties of MassageItem as needed
}

interface BookingListProps {
  massageShop: MassageItem;
}

export default function BookingList({ massageShop }: BookingListProps) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const session = useSession();
  const [bookingItems, setBookingItems] = useState<BookingItem[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const bookItems = useAppSelector((state: any) => state.bookSlice.bookItems); // Consider if this is actually needed.  It seems redundant.

  useEffect(() => {
    const fetchBookingsAndProfile = async () => {
      if (session.data?.user.token) {
        try {
          const token = session.data.user.token;
          const [profileResponse, bookingsResponse] = await Promise.all([
            getUserProfile(token),
            getUserAppointments(token),
          ]);

          if (profileResponse?.data) {
            setUserProfile(profileResponse.data as UserProfile);
          }

          if (bookingsResponse?.data) {
            const formattedBookings: BookingItem[] = bookingsResponse.data.map((booking: any) => ({
              appointmentId: booking._id,
              user: booking.user,
              nameLastname: booking.nameLastname,
              tel: booking.tel,
              shop: booking.massageShopName,
              bookDate: booking.date,
              massageShop: booking.massageShop,
              date: new Date(booking.date),
              time: booking.time,
              createdAt: booking.createdAt ? new Date(booking.createdAt) : new Date(),
            }));
            setBookingItems(formattedBookings);
          }
        } catch (error) {
          console.error("Error fetching ", error);
          // Consider more user-friendly error handling, like displaying a message to the user
        }
      }
    };

    fetchBookingsAndProfile();
  }, [session.data?.user.token]);

  // UseMemo to avoid re-filtering on every render if bookingItems and userProfile haven't changed
  const filteredBookings = React.useMemo(() => {
    if (!userProfile) {
      return []; // Or a default value appropriate for your application
    }

    return bookingItems.filter((bookingItem: BookingItem) => {
      if (userProfile.role === "admin") return true;
      if (userProfile.role === "user") return bookingItem.nameLastname === userProfile.name;
      return false;
    });
  }, [bookingItems, userProfile]);

  const handleDelete = async (appointmentId: string, bookItem: BookingItem) => {
    try {
      if (session.data?.user.token) {
        await deleteAppointment(session.data.user.token, appointmentId);
        // Removed dispatch(removeBooking(bookItem)); - See rationale below

        // Optimistically update the UI
        setBookingItems(prevBookings => prevBookings.filter(booking => booking.appointmentId !== appointmentId));
      } else {
        console.error("User token not found.");
        // Handle the case where the user token is not available - display a message to the user
        // Consider redirecting to login
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
      // Handle the error appropriately, maybe show a user-friendly error message
    }
  };

  return (
    <>
      {filteredBookings.length === 0 ? (
        "No Shop Booking"
      ) : (
        filteredBookings.map((bookItem: BookingItem) => (
          <div className="bg-slate-200 rounded-lg px-5 mx-5 py-4 my-3 shadow-md" key={bookItem.appointmentId}>
            {userProfile?.role === 'admin' && (
              <div>AccountId : {bookItem.nameLastname}</div>
            )}
            <div className="text-xl font-semibold text-gray-800">Name: {bookItem.nameLastname}</div>
            <div className="text-sm text-gray-600">Tel: {bookItem.tel}</div>
            <div className="text-sm text-gray-600">Location: {bookItem.shop}</div>
            <div className="text-md font-medium text-gray-700">Date: {bookItem.bookDate}</div>

            <div className="flex justify-start items-center gap-2 mt-3">
              <button
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300"
                onClick={() => router.push(`/update-booking?shop=${encodeURIComponent(bookItem.shop)}`)}
              >
                Update
              </button>

              <button
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300"
                onClick={() => handleDelete(bookItem.appointmentId, bookItem)}
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