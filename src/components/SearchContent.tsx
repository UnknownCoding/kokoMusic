"use client"
import React from 'react'
import { Song } from '../../types'
import MediaItem from './MediaItem'

const SearchContent = ({songs}:{songs:Song[]}) => {
    if(songs.length === 0){
        return(
            <div className='p-6 text-neutral-400 w-full'>
                No songs found.
            </div>
        )
    }
    return (
        <div className='flex flex-col gap-y-2 w-full px-6'>
            {songs.map((sgs)=>(
                <div key={sgs.id} className='flex items-center gap-x-4 w-full '>
                    <div className='flex-1'>
                        <MediaItem data={sgs} onClick={()=>{}} />
                    </div>
                    {/* like button here */}
                </div>
            ))}
        </div>
    )
}

export default SearchContent