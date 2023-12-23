"use client"
import React, { useEffect } from 'react'
import Modal from './Modal'
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import useAuthModel from '../../hooks/useAuthModel'

const AuthModal = () => {

    const supabaseClient = useSupabaseClient()
    const router = useRouter();
    const {session} = useSessionContext()
    const {onClose,isOpen} = useAuthModel()
    const onChange = (open:boolean) => {
        if(!open){
            onClose()
        }
    }

    useEffect(()=>{
        if(session){
            router.refresh()
            onClose()
        }
    },[session,router,onClose])

    return (
        <Modal title='Welcome Back' description='Login to your account' isOpen={isOpen} onChange={onChange}>
            <Auth supabaseClient={supabaseClient}  magicLink theme="dark" appearance={{
                theme: ThemeSupa,
                variables:{
                    default:{
                        colors:{
                            brand:'#40404',
                            brandAccent:'#22c55e'
                        }
                    }
                }
            }} providers={['github']}/>
        </Modal>
    )
}

export default AuthModal