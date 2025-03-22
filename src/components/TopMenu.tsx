import styles from "./topmenu.module.css";
import Image from "next/image";
import TopMenuItem from "./TopMenuItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { Link } from "@mui/material";

export default async function TopMenu() {

  const session = await getServerSession(authOptions)

  return (
    <div className={styles.menucontainer}>
      
      {
        session?null:
        <Link href='/api/v1/register' className="flex items-center  h-full px-2 text-cyan-600">
          Register
        </Link>
      }
      <TopMenuItem title="Booking" pageRef='/booking'/>
      <Link href='/'></Link>
      <Image src="/img/logo.png" alt="logo" className={styles.logoimg} width={0} height={0} sizes='100vh'/>
      {
        session?
        <Link href='/api/auth/signout' >
          <div className="flex items-center absolute left-0 h-full px-2 text-cyan-600 text-sm">
            Sign-Out of {session.user?.name}</div>
          </Link>:
          <Link href='/api/auth/signin' >
          <div className="flex items-center absolute left-0 h-full px-2 text-cyan-600 text-sm">
             Sign-In</div> 
          </Link>
      }
      <Link href='/mybooking' >
        <div className="flex items-center absolute left-40 h-full px-2 text-cyan-600 text-sm">
          My Booking
        </div> 
      </Link>
    </div>
    
  );
}