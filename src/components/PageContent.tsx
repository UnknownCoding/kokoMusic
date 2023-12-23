"use client"
import React from 'react'
import { Song } from '../../types'
import SongItem from './SongItem'

const PageContent = ({songs}:{songs:Song[]}) => {
    if(songs.length === 0){return (
        <div className='mt-4 text-neutral-400'>
            No songs available.
        </div>
    )}
    return (
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4'>
            {songs.map((sgs)=>(
                <SongItem key={sgs.id} onClick={()=>{}} data={sgs}/>
            ))}
        </div>
    )
}

export default PageContent