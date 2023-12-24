import React, { useState } from 'react'
import { Song } from '../../types'
import MediaItem from './MediaItem'
// @ts-ignore
import useSound from 'use-sound';
import LikeButton from './LikeButton'
import {BsPauseFill, BsPlayFill} from 'react-icons/bs'
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai'
import {HiSpeakerWave, HiSpeakerXMark} from 'react-icons/hi2'
import Slider from './Slider'
import usePlayer from '../../hooks/usePlayer'

interface PlayerContentProps{
    song:Song
    songUrl:string
}

const PlayerContent = ({song,songUrl}:PlayerContentProps) => {
    const player = usePlayer()
    const [volume,setVolume] = useState<number>(1)
    const [isPlaying,setIsPlaying] = useState(false)
    const Icon = isPlaying ? BsPauseFill : BsPlayFill
    const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave

    const onPlayNext = () => {
        if(player.ids.length === 0){
            return
        }
        const currI = player.ids.findIndex((id)=> id === player.activeId);
        const nextSong = player.ids[currI+1]
        if(!nextSong){
            return player.setId(player.ids[0])
        }
        player.setId(nextSong)
    }
    const onPlayPrev = () => {
        if(player.ids.length === 0){
            return
        }
        const currI = player.ids.findIndex((id)=> id === player.activeId);
        const prevSong = player.ids[currI-1]
        if(!prevSong){
            return player.setId(player.ids[player.ids.length - 1])
        }
        player.setId(prevSong)
    }

    const [play, { pause,stop,sound }] = useSound(songUrl,{
        volume:
    });

    return (
        <div className='grid grid-cols-2 md:grid-cols-3 h-full'>
            <div className='flex justify-start'>
                <div className='flex items-center gap-x-4'>
                    <MediaItem data={song}/>
                    <LikeButton songId={song.id}/>
                </div>
            </div>
            <div className='flex md:hidden col-auto w-full items-center justify-end'>
                <div className='h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer' onClick={()=>{}}>
                    <Icon size={30} className="text-black"/>
                </div>  
            </div>
            <div className='hidden h-full md:inline-flex items-center justify-center w-full max-w-[722px] gap-x-6'>
                <AiFillStepBackward onClick={onPlayPrev} size={30} className="text-neutral-400 cursor-pointer hover:text-white transition"/>
                <div className='flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer' onClick={()=>{}}>
                    <Icon size={30} className="text-black"/>
                </div>
                <AiFillStepForward onClick={onPlayNext} size={30} className="text-neutral-400 cursor-pointer hover:text-white transition"/>
            </div>
            <div className='hidden md:inline-flex w-full justify-end pr-2'>
                <div className='flex items-center gap-x-2 min-w-[120px]'>
                    <VolumeIcon size={34} onClick={()=>{}} className="cursor-pointer"/>
                    <Slider/>
                </div>
            </div>
        </div>
    )
}

export default PlayerContent