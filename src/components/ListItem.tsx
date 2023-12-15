"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import {FaPlay} from 'react-icons/fa'

interface ListItemProps{
    image:string
    name:string
    href:string
}

const ListItem = ({href,image,name}:ListItemProps) => {
    const router = useRouter()
    const onClick = () => {
        router.push(href);
    }
    return (
        <button onClick={onClick} className='relative h-fit group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition-all pr-4'>
            <div className='relative min-h-[64px] min-w-[64px] aspect-square'>
                <Image alt='' src={image} className='object-cover h-full w-full object-center' fill/>
            </div>
            <p className='font-medium truncate py-5'>{name}</p>
            <div className='absolute transition-all border-4 border-white  opacity-0 hover:scale-110 duration-300 group-hover:opacity-100 rounded-full flex items-center justify-center bg-[#4f31af] p-3 right-5'>
                <FaPlay className='text-white'/>
            </div>
        </button>
    )
}

export default ListItem