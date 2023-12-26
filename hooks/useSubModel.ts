import { create } from "zustand";

interface SubscribeModel{
    isOpen:boolean
    onOpen:() => void 
    onClose:() => void 
}

const useSubscribeModel = create<SubscribeModel>((set)=>({
    isOpen:false,
    onOpen:() => set({isOpen:true}),
    onClose:() => set({isOpen:false})
}))

export default useSubscribeModel