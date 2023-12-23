"use client"
import { usePathname } from 'next/navigation'
import React, { useMemo } from 'react'
import {HiHome} from 'react-icons/hi'
import {BiSearch} from 'react-icons/bi'
import Box from './Box'
import SideBarItem from './SideBarItem'
import Library from './Library'
import { Song } from '../../types'

interface SidebarProps{
    children:React.ReactNode
    songs:Song[]
}

const Sidebar:React.FC<SidebarProps> = ({children,songs}) => {
    const pathname = usePathname()
    const routes= useMemo(() => 
        [
            {
                icon:HiHome,
                label:'Home',
                active: pathname !== '/search',
                href:'/'
            },
            {
                icon:BiSearch,
                label:'Search',
                active: pathname === '/search',
                href:'/search'
            },
        ]
    ,[pathname])
    return (
        <div className='flex h-full'>
            <div className='hidden md:flex md:flex-col h-full w-[300px] p-2 gap-y-2'>
                <Box>
                    <div className='flex flex-col gap-y-4 px-5 py-4'>
                        {routes.map((item,i)=>(
                            <SideBarItem key={i} {...item}/>
                        ))}
                    </div>
                </Box>
                <Box className='h-full'>
                    <Library songs={songs}/>
                </Box>
            </div>
            <main className='h-full py-2 flex-1'>
                {children}
            </main>
        </div>
    )
}

export default Sidebar