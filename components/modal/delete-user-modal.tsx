import { useDeleteModal } from "@/hooks/use-delete-user-modal"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"
import { Button } from "../ui/button"
import { useTransition } from "react"
import { deleteUser } from "@/actions/delete"
import { useRouter } from "next/navigation"


export const DeleteUserModal = () => {
    const { isOpen, close, id } = useDeleteModal() 
    const [isPending, startTransition] = useTransition();

    const router = useRouter()
 

    const onConfirm = () => {
        startTransition(()=> {
            deleteUser(id || "").then((data)=> {
                if(data.success) {
                    router.refresh()
                    close()
                }
            })

        })
    }



    return (
      <Dialog open={isOpen} onOpenChange={close}>
        <DialogContent className="sm:max-w-425px z-[50]">
          <DialogHeader>
            <DialogTitle>
              Are you sure?
            </DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <div className="pt-6 space-x-2 flex items-center justify-end w-full">
            <Button  variant="outline" onClick={close} disabled={isPending}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={onConfirm}
              disabled={isPending}
            >
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
}