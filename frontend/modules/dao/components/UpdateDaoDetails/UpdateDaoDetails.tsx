"use client";

import { useSession } from "next-auth/react";
import { Edit } from "react-feather";

import { IconButton } from "modules/common/components/IconButton";
import { useBoolean } from "modules/common/hooks/useBoolean";
import { Modal } from "modules/common/components/Modal";
import { H3 } from "modules/common/components/Typography";
import { useDaoDetails } from "modules/dao/providers/DaoDetailsProvider";

import { UpdateDaoDetailsForm } from "./UpdateDaoDetailsForm";

export const UpdateDaoDetails = () => {
  const { dao } = useDaoDetails();
  const session = useSession();
  const [isModalOpened, openModal, closeModal] = useBoolean();

  const isOwnerOfDao =
    session.data?.user.wallet.toLowerCase() === dao.owner.toLowerCase();

  if (!isOwnerOfDao) {
    return null;
  }

  return (
    <>
      <IconButton Icon={Edit} onClick={openModal}>
        Update details
      </IconButton>
      <Modal isOpen={isModalOpened} onClose={closeModal}>
        <H3>Update details</H3>
        <UpdateDaoDetailsForm />
      </Modal>
    </>
  );
};
