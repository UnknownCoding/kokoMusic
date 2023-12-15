"use client"
import React from 'react'
import {TbPlaylist} from 'react-icons/tb'
import {AiOutlinePlus} from 'react-icons/ai'

const Library = () => {
    const onClick = () => {
        // soon
    }
    return (
        <div className='flex flex-col'>
            <div className='flex items-center px-5 justify-between py-4'>
                <div className='flex items-center gap-x-2'>
                    <TbPlaylist size={26} className="text-neutral-400"/>
                    <p className='text-neutral-400 font-medium text-base'>Your Library</p>
                </div>
                <AiOutlinePlus className="cursor-pointer text-neutral-400 hover:text-green-500 transition-all hover:scale-125 duration-500 ease-in-out hover:rotate-180" onClick={onClick}/>
            </div>
            <div className='mt-3 flex flex-col gap-y-2 px-3'>
                List of songs
            </div>
        </div>
    )
}

export default Library