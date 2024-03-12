
const UserLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="p-6 max-w-[1200px]" >
        {children}
    </div>
  )
}

export default UserLayout