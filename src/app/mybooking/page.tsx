import BookingList from "@/components/BookingList";
import getUserAppointments from "@/libs/getUserAppointments";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session)
  // const userApponements = getUserAppointments(session)

  return (
    <main>
        <BookingList />
  </main>
  );
}
