import React from 'react'
import getSongBySearch from '../../../actions/getSongBySearch'
import Header from '@/components/Header'
import SearchInput from '@/components/SearchInput'
import SearchContent from '@/components/SearchContent'

interface SearchParams{
    searchParams:{
        title:string
    }
}

const page = async ({searchParams}:SearchParams) => {
    const songs = await getSongBySearch(searchParams.title)
    return (
        <div className='bg-neutral-900 rounded-lg h-full w-full overflow-hidden '>
            <Header className='from-bg-neutral-900'>
                <div className='mb-2 flex flex-col gap-y-6'>
                    <h1 className='text-white text-3xl font-semibold'>Search</h1>
                </div>
                <SearchInput/>
            </Header>
            <SearchContent songs={songs}/>
        </div>
    )
}

export default page