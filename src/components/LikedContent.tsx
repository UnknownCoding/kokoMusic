"use client";

import React, { use, useEffect } from 'react'
import { Song } from '../../types';
import { useRouter } from 'next/navigation';
import { useUser } from '../../hooks/useUser';
import MediaItem from './MediaItem';
import LikeButton from './LikeButton';

const LikedContent = ({songs}:{songs:Song[]}) => {
    const router = useRouter()
    const {user,isLoading} = useUser()
    useEffect(()=>{
        if(!isLoading && !user){
            router.replace('/')
        }
    },[user,router,isLoading])

    if(songs.length === 0){
        return(
            <div className='flex flex-col gap-y-2 px-6 text-neutral-400'>
                No Liked Songs.
            </div>
        )
    }
    return (
        <div className='flex flex-col gap-y-2 w-full p-6'>
            {songs.map((sgs)=>(
                <div key={sgs.id} className='flex items-center gap-x-4 w-full'>
                    <div className='flex-1'>
                        <MediaItem data={sgs} onClick={()=>{}}/>
                    </div>
                    <LikeButton songId={sgs.id}/>
                </div>
            ))}
        </div>
    )
}

export default LikedContent