import { create } from "zustand";

interface PackageModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const usePackageModal = create<PackageModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default usePackageModal;
