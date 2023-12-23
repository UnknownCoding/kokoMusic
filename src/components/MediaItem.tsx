import React from 'react'
import { Song } from '../../types'
import useLoadImage from '../../hooks/useLoadImage'
import Image from 'next/image'

interface MediaItemProps{
    onClick?:(id:string)=>void 
    data:Song
}

const MediaItem = ({data,onClick}:MediaItemProps) => {
    const imageUrl = useLoadImage(data)
    const handleClick = () => {
        if(onClick){
            return onClick(data.id)
        }
        // make sense later on!
    }
    return (
        <div className='flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md ' onClick={handleClick}>
            <div className='relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden'>
                <Image alt='' fill src={imageUrl  || '/images/liked.png' } className='object-cover object-center'/>
            </div>
            <div className='flex flex-col w-full overflow-x-hidden gap-y-1'>
                <p className='text-white truncate'>{data.title}</p>
                <p className='text-neutral-400 text-sm truncate'>{data.title}</p>
            </div>
        </div>
    )
}

export default MediaItem