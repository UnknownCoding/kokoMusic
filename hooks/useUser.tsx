import { User } from "@supabase/auth-helpers-nextjs"
import { Subsription, UserDetails } from "../types";
import { createContext, useContext, useEffect, useState } from "react";
import { useSessionContext,useUser as useSupaBase } from "@supabase/auth-helpers-react";

type UserContextType = {
    accessToken:string | null
    user:User | null;
    userDetails: UserDetails | null
    isLoading: boolean
    subscription:Subsription | null
}

export const UserContext = createContext<UserContextType|undefined>(undefined)

export interface Props{
    [propName:string]:any
}

export const UserContextProvider = (props:Props) => {

    const {session,isLoading:isLoadingUser,supabaseClient:supabase} = useSessionContext()
    const user = useSupaBase()
    const accessToken = session?.access_token ?? null
    const [isLoadingData,setIsLoadingData] = useState<boolean>(false)
    const [userDetails,setUserDetails] = useState<UserDetails|null>(null)
    const [subscription,setSubscription] = useState<Subsription|null>(null)

    const getUserDetails = () => supabase.from('users').select('*').single()

    const getSubscription = () => supabase.from('subscriptions').select('*, prices(*, products(*))').in('status',['trialing','active']).single()

    useEffect(()=>{
        if(user && !isLoadingData && !userDetails && !subscription){
            setIsLoadingData(true)
            Promise.allSettled([getUserDetails(),getSubscription()]).then((res)=>{
                const userDetailPromise = res[0]
                const subscirptionPromsie = res[1]
                if(userDetailPromise.status === "fulfilled"){
                    setUserDetails(userDetailPromise.value.data as UserDetails)
                }
                if(subscirptionPromsie.status === "fulfilled"){
                    setSubscription(subscirptionPromsie.value.data as Subsription)
                }
                setIsLoadingData(false)
            })
        } else if(!user && !isLoadingUser && isLoadingData){
            setUserDetails(null)
            setSubscription(null)
        }
    },[user,isLoadingUser])
    

    const value = {accessToken,user,userDetails,isLoading:isLoadingUser||isLoadingData,subscription}

    return <UserContext.Provider value={value} {...props}/>
    

}

export const useUser = () => {
    const context = useContext(UserContext)
    if(context === undefined){
        throw new Error('useUser must be within a UserContextProvider')
    }
}