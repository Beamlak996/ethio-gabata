

const AuthLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="h-full flex items-center justify-center bg-neutral-50 p-8" >
            {children}
        </div>
    )
}

export default AuthLayout