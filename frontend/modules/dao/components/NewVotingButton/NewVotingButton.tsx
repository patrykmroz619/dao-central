"use client";

import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Plus } from "react-feather";

import { InternationalizedProps } from "modules/internationalization/types";
import { useClientTranslation } from "modules/internationalization/useTranslation/client";
import { IconButton } from "modules/common/components/IconButton";
import { Modal } from "modules/common/components/Modal";
import { useBoolean } from "modules/common/hooks/useBoolean";
import { NewVotingForm } from "./NewVotingForm";
import { useIsBrowser } from "modules/common/hooks/useIsBrowser";

export const NewVotingButton = (props: InternationalizedProps) => {
  const { lang } = props;

  const { t } = useClientTranslation(lang, "dao", "dao-details");

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
          {t("new-voting")}
        </IconButton>
      ) : (
        <ConnectButton />
      )}
      <Modal heading="New voting" isOpen={isModalOpen} onClose={closeModal}>
        <NewVotingForm onSuccess={closeModal} lang={lang} />
      </Modal>
    </>
  );
};
