"use client"

type LoginButtonProps = {
    children: React.ReactNode
    mode?: "modal" | "redirect"
    asChild?: boolean
}

export const LoginButton = ({children, mode, asChild}: LoginButtonProps) => {
    const onClick = () => {
        
    }

    return (
        <span className="cursor-pointer" >
            {children}
        </span>
    )
}