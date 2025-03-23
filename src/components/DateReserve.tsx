'use client'
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {Select,MenuItem, TextField} from "@mui/material";
import {useState} from "react";
import dayjs , { Dayjs } from 'dayjs';
import { UseDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addBooking } from "@/redux/features/bookSlice";
import { useDispatch } from "react-redux";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { useSession } from "next-auth/react";


export default function LocationDateReserve({massageJson}:{massageJson:MassageJson}){
        const {data:session} = useSession()
        const [nameLastname,setNameLastname] = useState<string>(session?.user.name!=undefined?session?.user.name!:"")
        const [tel,setTel] = useState<string>(session?.user.tel!=undefined?session?.user.tel!:"")
        const [reserveDate,setReserveDate] = useState<Dayjs | null>(null);
        const [location,setLocation] = useState('baansaifon');

        const dispatch = useDispatch<AppDispatch>()
      
        const makeReservation = ()=>{
      
          if(nameLastname&&tel&&reserveDate&&location){
              const item:BookingItem = {
                  nameLastname:nameLastname,
                  tel:tel,
                  shop:location,
                  bookDate:dayjs(reserveDate).format("YYYY/MM/DD"),
              }
              dispatch(addBooking(item))
          }
      }
      
        const handleNameChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
          setNameLastname(event.target.value)
        }
      
        const handleTelChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
          setTel(event.target.value)
        }
      
        return (
          <main className="w-[100%] flex flex-col items-center space-y-4">
            <div className="w-fit space-y-2"> 
              Massage Shop Booking
              <form className="bg-slate-100 rounded-lg space-x-5 space-y-2 
              w-fit px-10 py-5 flex flex-col justify-center">
                  <div className="px-5 space-x-5">
                  <TextField variant="standard"  
                  name='Name-Lastname' 
                  label='Name-Lastname' 
                  value={nameLastname}
                  onChange={handleNameChange}
                  className=""
                  />
                  <TextField variant="standard"  
                  name='Contact-Number' 
                  label='Contact-Number'
                  value={tel}
                  onChange={handleTelChange}
                  />
                  </div>
      
                  <LocalizationProvider dateAdapter={AdapterDayjs} >
                  <Select variant="standard" 
                  id="venue" value={location} 
                  onChange={(e)=>{setLocation(e.target.value);}}
                  className="flex w-[196px] " >
                    {massageJson.data.map((shop)=>(
                        <MenuItem value={shop.name}>{shop.name}</MenuItem>
                    ))}
                  </Select>
      
                  <DatePicker className="bg-white flex " 
                  value={reserveDate} 
                  onChange={ (value)=>{setReserveDate(value);} } />
                  </LocalizationProvider> 
              
              </form>
            </div>
            <button name='Book Venue' className="block bg-sky-600 rounded-md text-black px-3 py-1"
            onClick={makeReservation} >
                Book Massage Shop
            </button>
          </main>
        );
}