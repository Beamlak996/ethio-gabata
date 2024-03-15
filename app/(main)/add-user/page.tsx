import { Heading } from "@/components/heading"
import { Separator } from "@/components/ui/separator"
import { currentUser } from "@/lib/auths"
import { redirect } from "next/navigation"
import { AddUserForm } from "../_components/add-user-form"

const AddUser = async () => {
  const user = await currentUser()

  if(!user) return redirect('/')

  return (
    <div className="p-6">
      <Heading
        title="Add User"
        description="You can add new users using form here."
      />
      <Separator className="mt-4 mb-6" />
      <AddUserForm inviteCode={user.inviteCode} />
    </div>
  );
}

export default AddUser