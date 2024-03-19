import { getUserById } from "@/data/user";
import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("../../../../../components/map"), {
  ssr: false,
});

type Props = {
    params: {
        userId: string
    }
}

const UserIdLocation = async ({params}: Props) => {
  const user = await getUserById(params.userId)

  return (
    <div className='p-6' >
        <DynamicMap lat={user?.lat || 0} long={user?.long || 0} />
    </div>
  )
}

export default UserIdLocation