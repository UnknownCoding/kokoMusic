"use client"
import React from 'react'
import * as RadSlide from '@radix-ui/react-slider';

interface SliderProps{
    value?:number
    onChange?:(value:number) => void
}

const Slider = ({onChange,value=1}:SliderProps) => {
    const handleChange = (newValue:number[]) => {
        // how does this syntax work
        onChange?.(newValue[0])
    }
    return (
        <RadSlide.Root className='relative flex items-center select-none touch-none w-full h-10' aria-label='Volume' max={1} step={0.1} defaultValue={[1]} value={[value]} onValueChange={handleChange} >
            <RadSlide.Track className='bg-neutral-600 relative grow rounded-full h-[3px]'>
                <RadSlide.Range className='absolute bg-white rounded-full h-full'/>
            </RadSlide.Track>
        </RadSlide.Root>
    )
}

export default Slider