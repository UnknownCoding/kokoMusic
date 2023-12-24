"use client"
import { useSessionContext } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import useAuthModel from '../../hooks/useAuthModel'
import { useUser } from '../../hooks/useUser'
import toast from 'react-hot-toast'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

const LikeButton = ({songId}:{songId:string}) => {
    const router = useRouter()
    const {supabaseClient} = useSessionContext()
    const authModal = useAuthModel()
    const {user} = useUser()
    const [isLiked,setIsLiked] = useState<boolean>(false)

    useEffect(()=>{
        if(!user?.id){
            toast.error('login to perform this action please')
            return 
        }
        const fetchData = async () => {
            const {data,error} = await supabaseClient.from('liked_songs').select('*').eq('user_id',user?.id).eq('song_id',songId).single()
            if(!error && data){
                setIsLiked(true)
            }
        }
        fetchData()
    },[supabaseClient,songId,user?.id])

    const Icon = isLiked ? AiFillHeart :AiOutlineHeart

    const handleLike= async () => {
        if(!user){
            return authModal.onOpen()
        }
        if(isLiked){
            const {error} = await supabaseClient.from('liked_songs').delete().eq('user_id',user?.id).eq('song_id',songId)
            if(error){
                toast.error(error.message)
            }else{
                setIsLiked(false)
            }
        }else{
            const {error} = await supabaseClient.from('liked_songs').insert({
                song_id:songId,
                user_id:user.id
            })
            if(error){
                toast.error(error.message)
            }else{
                setIsLiked(true)
                toast.success('Liked')
            }

        }
        router.refresh()
    }   

    return (
        <button onClick={handleLike} className='hover:opacity-75 transition ease-in-out'>
            <Icon color={isLiked ? '#22c55e':'white'} size={25}/>
        </button>
    )
}

export default LikeButton