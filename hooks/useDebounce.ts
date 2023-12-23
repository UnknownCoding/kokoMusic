import { useEffect,useState } from "react";

function useDebounce<T>(value:T,delay?:number){
    const [debouncedValue,setDebouncedVal] = useState<T>(value)
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setDebouncedVal(value)
        },delay||500)
        return () => {clearTimeout(timer)}
    },[value,delay])
    return debouncedValue
}

export default useDebounce