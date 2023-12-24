"use client"
import React from 'react'
import usePlayer from '../../hooks/usePlayer'
import useGetSongById from '../../actions/useGetSongById';
import useLoadSong from '../../hooks/useLoadSongUrl';
import PlayerContent from './PlayerContent';

const Player = () => {
    // all eyes on this part
    const player = usePlayer();
    const {isLoading,song} = useGetSongById(player.activeId)
    const songUrl = useLoadSong(song)
    if(!song || !songUrl || !player.activeId){
        return
    }
    return (
        <div className='fixed bottom-0 bg-black w-full py-2 h-[80px] px-4'>
            <PlayerContent key={songUrl} song={song} songUrl={songUrl}/>
        </div>
    )
}

export default Player