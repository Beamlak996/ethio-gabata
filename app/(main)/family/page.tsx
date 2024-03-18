import UserTree from "@/components/user-tree"
import { getAllInvitedPaidUsers } from "@/data/user"
import { currentUser } from "@/lib/auths"
import { redirect } from "next/navigation"


const MapPage = async () => {
  const currentuser = await currentUser()

  if(!currentUser) return redirect("/")

  const allUsers = await getAllInvitedPaidUsers(currentuser?.id || "")

  return (
    <div className="p-6" >
        <UserTree data={allUsers} />
    </div>
  )
}

export default MapPage