"use client";

import { useAccount } from "wagmi";
import { useSession } from "next-auth/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Plus } from "react-feather";

import { InternationalizedProps } from "@/infrastructure/internationalization/types";
import { useClientTranslation } from "@/infrastructure/internationalization/client";
import { IconButton } from "@/infrastructure/ui/core/buttons/IconButton";
import { Modal } from "@/infrastructure/ui/core/Modal";
import { useBoolean } from "@/infrastructure/helpers/hooks/useBoolean";
import { NewVotingForm } from "./NewVotingForm";
import { useIsBrowser } from "@/infrastructure/helpers/hooks/useIsBrowser";
import { useDaoDetails } from "modules/dao/providers/DaoDetailsProvider";

export const NewVotingButton = (props: InternationalizedProps) => {
  const { lang } = props;

  const { t } = useClientTranslation(lang, "dao", "dao-details");

  const [isModalOpen, openModal, closeModal] = useBoolean();

  const { isConnected } = useAccount();
  const { data: session } = useSession();
  const isBrowser = useIsBrowser();

  const { dao } = useDaoDetails();

  const isOwnerOfDao =
    session?.user.wallet.toLowerCase() === dao.owner.toLowerCase();

  if (!isBrowser) {
    return null;
  }

  if (!isConnected) {
    return <ConnectButton />;
  }

  if (!isOwnerOfDao) {
    return null;
  }

  return (
    <>
      <IconButton Icon={Plus} onClick={openModal}>
        {t("new-voting")}
      </IconButton>
      <Modal heading="New voting" isOpen={isModalOpen} onClose={closeModal}>
        <NewVotingForm onSuccess={closeModal} lang={lang} />
      </Modal>
    </>
  );
};
