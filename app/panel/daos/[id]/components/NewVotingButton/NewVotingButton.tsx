"use client";

import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Plus } from "react-feather";

import { IconButton } from "shared/components/IconButton";
import { Modal } from "shared/components/Modal";
import { useBoolean } from "shared/hooks/useBoolean";
import { NewVotingForm } from "./NewVotingForm";
import { useIsBrowser } from "shared/hooks/useIsBrowser";

export const NewVotingButton = () => {
  const [isModalOpen, openModal, closeModal] = useBoolean();

  const { isConnected } = useAccount();
  const isBrowser = useIsBrowser();

  if (!isBrowser) {
    return null;
  }

  return (
    <>
      {isConnected ? (
        <IconButton Icon={Plus} onClick={openModal}>
          New voting
        </IconButton>
      ) : (
        <ConnectButton />
      )}
      <Modal heading="New voting" isOpen={isModalOpen} onClose={closeModal}>
        <NewVotingForm onSuccess={closeModal} />
      </Modal>
    </>
  );
};
