import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";


// intresting , we use a forwardRef because we are very lazy to define the incoming props so just do it this way.
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{}

const Button = forwardRef<HTMLButtonElement,ButtonProps>(({className,children,disabled,type="button",...props},ref)=>{
    return(
        <button type={type} className={
            twMerge(`rounded-full bg-green-500 border border-transparent px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all font-bold text-black hover:opacity-75`
                    ,className)} disabled={disabled} ref={ref} {...props}>
            {children}
        </button>
    )   
})

Button.displayName = "Button"

export default Button