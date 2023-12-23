"use client"
import AuthModal from '@/components/AuthModal'
import Modal from '@/components/Modal'
import UploadModal from '@/components/UploadModal'
import React, { useEffect, useState } from 'react'

const ModalProvider = () => {
    const [isMounted,setIsMounted] = useState<boolean>(false)
    // hydration error you dont ever want to , since everything is server side rendered, models can cause hydration error so to prevent it. 
    // we do this trick. Never render a model when we are in server side rendereing.
    useEffect(()=>{
        setIsMounted(true)
    },[])
    if(!isMounted) return null

    return (
        <div>
            <AuthModal/>
            <UploadModal/>
        </div>
    )
}

export default ModalProvider