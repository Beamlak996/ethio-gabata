import { User } from "@prisma/client";
import { create } from "zustand";

type ModalData={
    user?: User
}

type DeleteUserModal = {
  isOpen: boolean;
  id: string
  open: (id: string) => void;
  close: () => void;
};

export const useDeleteModal = create<DeleteUserModal>((set) => ({
  isOpen: false,
  id: "",
  open: (id = "") => set({ isOpen: true, id }),
  close: () => set({ isOpen: false }),
}));
