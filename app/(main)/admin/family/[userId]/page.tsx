import UserTree from "@/components/user-tree";
import { getAllInvitedPaidUsers } from "@/data/user";

type Props = {
    params: {
        userId: string
    }
}

const UserIdFamilyPage = async ({params}: Props) => {
  const allUsers = await getAllInvitedPaidUsers(params.userId);

  return (
    <div className="p-6">
      <UserTree data={allUsers} />
    </div>
  );
}

export default UserIdFamilyPage