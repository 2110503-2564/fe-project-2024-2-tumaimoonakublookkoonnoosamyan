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
      
      <TopMenuItem title="Booking" pageRef='/booking'/>
      <TopMenuItem title="Home" pageRef='/'/>

      <Image src="/img/logo.png" alt="logo" className={styles.logoimg} width={0} height={0} sizes="100vh" />
      
      {
        session?
        <Link href='/api/auth/signout' >
          <div className="flex items-center absolute left-0 h-full px-2 text-cyan-600 text-sm">
            Sign-Out</div>
          </Link>:
          <Link href='/api/auth/signin' >
          <div className="flex items-center absolute left-0 h-full px-2 text-cyan-600 text-sm">
             Sign-In</div> 
          </Link>
      }
      {
        session?null:
        <Link href='/register' >
          <div className="flex items-center absolute left-20  h-full px-2 text-cyan-600 text-sm">Register</div>
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