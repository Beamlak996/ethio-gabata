"use client";

import { useEffect, useState } from "react";
import { DeleteUserModal } from "../modal/delete-user-modal";
import { WithdrawModal } from "../modal/withdraw-modal";



export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>

      <DeleteUserModal />
      <WithdrawModal />
    </>
  );
};
