import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useWithdrawModal } from "@/hooks/use-withdraw-request";
import { withdrawRequest } from "@/actions/withdraw-request";
import { FormError } from "../form-error";

export const WithdrawModal = () => {
  const [error, setError] = useState<string | undefined>("")

  const { isOpen, close, id } = useWithdrawModal();
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const onConfirm = () => {
    startTransition(() => {
      withdrawRequest(id || "").then((data) => {
        if (data.success) {
          router.refresh();
          close();
        } if(data.error) {
            setError(data.error)
        }
      });
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="sm:max-w-425px z-[50]">
        <DialogHeader>
          <DialogTitle>Request for Withdraw</DialogTitle>
          <DialogDescription>You will recive all your commision.</DialogDescription>
        </DialogHeader>
        <FormError message={error} />
        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
          <Button variant="outline" onClick={close} disabled={isPending}>
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={onConfirm}
            disabled={isPending}
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
