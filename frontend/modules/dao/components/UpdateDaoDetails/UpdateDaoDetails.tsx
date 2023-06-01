"use client";

import { useSession } from "next-auth/react";
import { Edit } from "react-feather";

import { InternationalizedProps } from "@/infrastructure/internationalization/types";
import { useClientTranslation } from "@/infrastructure/internationalization/client";
import { IconButton } from "@/infrastructure/ui/core/buttons/IconButton";
import { useBoolean } from "@/infrastructure/helpers/hooks/useBoolean";
import { Modal } from "@/infrastructure/ui/core/Modal";
import { H3 } from "@/infrastructure/ui/core/Typography";
import { useDaoDetails } from "modules/dao/providers/DaoDetailsProvider";

import { UpdateDaoDetailsForm } from "./UpdateDaoDetailsForm";

export const UpdateDaoDetails = (props: InternationalizedProps) => {
  const { lang } = props;

  const { t } = useClientTranslation(lang, "dao", "dao-details");

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
        {t("update-details")}
      </IconButton>
      <Modal isOpen={isModalOpened} onClose={closeModal}>
        <H3>{t("update-details")}</H3>
        <UpdateDaoDetailsForm lang={lang} />
      </Modal>
    </>
  );
};
