"use client"
import React from 'react'
import { Song } from '../../types'
import useLoadImage from '../../hooks/useLoadImage'
import Image from 'next/image'
import PlayButton from './PlayButton'

interface SongItemProp{
    data:Song
    onClick:(id:string)=>void
}

const SongItem = ({data,onClick}:SongItemProp) => {
    const imagePath = useLoadImage(data)
    return (
        <div onClick={()=>{}} className='relative group flex flex-col items-center justify-center rounded-md overflow-hidden bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10
                                        transition p-3 gap-x-4 '>
            <div className='relative aspect-square w-full h-full rounded-md overflow-hidden'>
                <Image  src={imagePath||'/images/liked.png'} alt='' fill className='object-cover object-center'/>
            </div>
            <div className='flex flex-col items-start w-full gap-y-1 pt-4'>
                <p className='font-semibold truncate w-full'>{data.title}</p>
                <p className='text-neutral-400 text-sm pb-4 w-full truncate'>{data.author}</p>
            </div>
            <div className='absolute right-5 bottom-24'>
                <PlayButton/>
            </div>
        </div>
    )
}

export default SongItem