
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";



export const InfoModal = ({children}: {children: React.ReactNode}) => {

    
    return (
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Payment Info</DialogTitle>
            <DialogDescription>
              Here you can find the payment informaiton. Please pay through this
              account and send a photo of the receipt on telegram.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" >
                Bank Account
              </Label>
              <Input id="link" value={"1000457889255"} readOnly />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="tele">
                Telegram User Name
              </Label>
              <Input id="tele" value={"@ethio-gabata"} readOnly />
            </div>
          </div>
          {/* <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter> */}
        </DialogContent>
      </Dialog>
    );
}