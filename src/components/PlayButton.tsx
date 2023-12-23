import React from 'react'
import { FaPlay } from 'react-icons/fa'

const PlayButton = () => {
    return (
        <button className='bg-green-500 opacity-0 rounded-full flex items-center justify-center transition ease-in-out p-4 drop-shadow-md 
                translate translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110'>
            <FaPlay className="text-black"/>
        </button>
    )
}

export default PlayButton