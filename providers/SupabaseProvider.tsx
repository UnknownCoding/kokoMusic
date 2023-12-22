"use client"
import { useState } from "react"
import { Database } from "../types_db"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { SessionContextProvider } from "@supabase/auth-helpers-react"

interface SupabaseProviderProps{
    children:React.ReactNode
}


const SupabaseProvider: React.FC<SupabaseProviderProps> = ({
    children
}) => {
    const [supaBaseClient] = useState(()=> createClientComponentClient<Database>())
    return(
        <SessionContextProvider supabaseClient={supaBaseClient}>
            {children}
        </SessionContextProvider>
    )
}

export default SupabaseProvider