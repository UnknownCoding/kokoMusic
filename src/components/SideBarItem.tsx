import Link from 'next/link'
import React from 'react'
import { IconType } from 'react-icons'
import { twMerge } from 'tailwind-merge'
interface Route{
    icon:IconType
    label:string
    active?:boolean
    href:string
}

const SideBarItem = ({href,icon:Icon,label,active}:Route) => {
    return (
        <Link href={href} className={
            twMerge(`flex w-full py-1 items-center gap-x-4 text-base h-auto cursor-pointer font-medium hover:text-white transition-all text-neutral-400 `,
                    active && 'font-semibold text-green-600')}>
            <Icon size={26}/> 
            <p className='truncate w-full'>{label}</p>
        </Link>
    )
}

export default SideBarItem