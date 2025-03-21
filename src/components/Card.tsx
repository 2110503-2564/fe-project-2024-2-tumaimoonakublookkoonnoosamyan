
"use client";
import Image from 'next/image';
import InteractiveCard from './InteractiveCard';
import React from 'react';
import Rating from '@mui/material/Rating';
import { useState } from 'react';

export default function Card({massageName,imgSrc,onChange}:{massageName:string,imgSrc:string,onChange?:Function}) {

    const [value, setValue] = useState<number | null>(0);

    return (
        <InteractiveCard>
            <div className='w-full h-[70%] relative rounded-t-lg'>
                <Image src = {imgSrc}
                alt="Card Picture"
                fill={true}
                className='object-cover rounded-t-lg'
                />
            </div>
            <div className='w-full h-[30%] p-[10px]'>
                <h1 className="text-black">{massageName}</h1>
                {   onChange?
                    <Rating
                    name={`${massageName} Rating`} 
                    id={`${massageName} Rating`} 
                    data-testid={`${massageName} Rating`} 
                    value={value} 
                    onChange={(event, newValue) => {
                        event.stopPropagation();
                        setValue(newValue); 
                        onChange(massageName, newValue);
                    }}
                    onClick={(e) => e.stopPropagation()}
                />:''
                }
            </div>
        </InteractiveCard> 
    );
}