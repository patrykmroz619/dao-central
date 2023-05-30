import { MouseEvent } from "react";
import { useNetwork } from "wagmi";

import { InternationalizedProps } from "modules/internationalization/types";
import { useClientTranslation } from "modules/internationalization/useTranslation/client";
import { Button } from "modules/common/components/Button";
import { TextInput } from "modules/common/components/Input/TextInput";
import { useCreateVotingHandler } from "./useCreateVotingHandler";
import { ASYNC_STATE } from "modules/common/hooks/useAsyncState";
import { BlockchainTransactionState } from "modules/blockchain/components/BlockchainTransactionState";
import { SwitchNetworkBox } from "modules/blockchain/components/SwitchNetworkBox";
import { useDaoDetails } from "modules/dao/providers/DaoDetailsProvider";

import styles from "./NewVotingForm.module.scss";

type NewVotingFormProps = {
  onSuccess: () => void;
} & InternationalizedProps;

export const NewVotingForm = (props: NewVotingFormProps) => {
  const { onSuccess, lang } = props;

  const { t } = useClientTranslation(lang, "dao", "dao-details");

  const { register, errors, handleSubmit, creatingState, txHash } =
    useCreateVotingHandler();

  const { dao } = useDaoDetails();
  const { chain } = useNetwork();

  const isValidChain = chain?.id === dao.chainId;
  const isSubmitButtonDisabled =
    !isValidChain || creatingState.state === ASYNC_STATE.LOADING;

  const handleGoBackClick = (event: MouseEvent) => {
    event.preventDefault();
    onSuccess();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <TextInput
        label={t("proposal")}
        {...register("description")}
        helperText={errors.description?.message}
      />
      <TextInput
        label={"voting-start"}
        type="datetime-local"
        {...register("startDate")}
        helperText={errors.startDate?.message}
      />
      <TextInput
        label={"voting-end"}
        type="datetime-local"
        {...register("endDate")}
        helperText={errors.endDate?.message}
      />
      <BlockchainTransactionState
        state={creatingState}
        successHeading={t("new-voting-success")}
        loadingHeading={t("new-voting-loading")}
        errorHeading={t("new-voting-error")}
        txHash={txHash}
      />
      {!isValidChain && <SwitchNetworkBox requiredNetworkId={dao.chainId} />}
      {creatingState.state !== ASYNC_STATE.SUCCESS ? (
        <Button type="submit" disabled={isSubmitButtonDisabled}>
          {t("create-voting")}
        </Button>
      ) : (
        <Button disabled={isSubmitButtonDisabled} onClick={handleGoBackClick}>
          {t("go-back")}
        </Button>
      )}
    </form>
  );
};
