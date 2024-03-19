import { create } from "zustand";


type WithdrawModal = {
  isOpen: boolean;
  id: string;
  open: (id: string) => void;
  close: () => void;
};

export const useWithdrawModal = create<WithdrawModal>((set) => ({
  isOpen: false,
  id: "",
  open: (id = "") => set({ isOpen: true, id }),
  close: () => set({ isOpen: false }),
}));
