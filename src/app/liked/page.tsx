import Header from '@/components/Header'
import LikedContent from '@/components/LikedContent'
import Image from 'next/image'
import React from 'react'
import getLikedSongs from '../../../actions/getLikes'

export const revalidate = 0

const page = async () => {
    const songs = await getLikedSongs()
    return (
        <div className='bg-neutral-900 rounded-lg h-full w-full overflow-hidden '>
            <Header>
                <div className='mt-20'>
                    <div className='flex flex-col md:flex-row gap-x-5 items-center'>
                        <div className='relative h-32 w-32 lg:h-44 lg:w-44 '>
                            <Image alt='' className='object-cover object-center' fill src='/liked.png'/>
                        </div>
                        <div className='flex flex-col gap-y-2 mt-4 md:mt-0'>
                            <p className='hidden md:block font-semibold text-sm'>Playlist</p>
                            <h1 className='text-white text-4xl sm:text-5xl lg:text-7xl font-bold'>Liked Songs</h1>
                        </div>
                    </div>
                </div>
            </Header>
            <LikedContent songs={songs}/>
        </div>
    )
}

export default page