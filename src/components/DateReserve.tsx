'use client'
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {Select,MenuItem, TextField} from "@mui/material";
import {useState} from "react";
import { Dayjs } from 'dayjs';


export default function LocationDateReserve({onDateChange,onLocationChange}:
    {onDateChange:Function,onLocationChange:Function}){

    const [reserveDate,setReserveDate] = useState<Dayjs | null>(null);
    const [location,setLocation] = useState('Bloom');

    return(
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
                <Select variant="standard" 
            id="venue" value={location} onChange={(e)=>{setLocation(e.target.value);onLocationChange(e.target.value)}}
            className="flex items-center " >
                <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
                <MenuItem value="Spark">Spark Space</MenuItem>
                <MenuItem value="GrandTable">The Grand Table</MenuItem>
            </Select>
            <DatePicker className="bg-white flex items-center" 
            value={reserveDate} 
            onChange={ (value)=>{setReserveDate(value);onDateChange(value)} } />
            </LocalizationProvider> 
        </div>
    );
}