import { MouseEvent } from "react";
import { useNetwork } from "wagmi";

import { Button } from "modules/common/components/Button";
import { TextInput } from "modules/common/components/Input/TextInput";
import { useCreateVotingHandler } from "./useCreateVotingHandler";
import { ASYNC_STATE } from "modules/common/hooks/useAsyncState";
import { BlockchainTransactionState } from "modules/blockchain/components/BlockchainTransactionState";
import { SwitchNetworkBox } from "modules/blockchain/components/SwitchNetworkBox";

import styles from "./NewVotingForm.module.scss";
import { useDaoDetails } from "modules/dao/providers/DaoDetailsProvider";

type NewVotingFormProps = {
  onSuccess: () => void;
};

export const NewVotingForm = (props: NewVotingFormProps) => {
  const { onSuccess } = props;

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
        label="Proposal"
        {...register("description")}
        helperText={errors.description?.message}
      />
      <TextInput
        label="Voting start"
        type="datetime-local"
        {...register("startDate")}
        helperText={errors.startDate?.message}
      />
      <TextInput
        label="Voting end"
        type="datetime-local"
        {...register("endDate")}
        helperText={errors.endDate?.message}
      />
      <BlockchainTransactionState
        state={creatingState}
        successHeading="New voting has been created!"
        loadingHeading="Voting is being created, Please don't close the tab browser."
        errorHeading="Error while creating."
        txHash={txHash}
      />
      {!isValidChain && <SwitchNetworkBox requiredNetworkId={dao.chainId} />}
      {creatingState.state !== ASYNC_STATE.SUCCESS ? (
        <Button type="submit" disabled={isSubmitButtonDisabled}>
          Create Voting
        </Button>
      ) : (
        <Button disabled={isSubmitButtonDisabled} onClick={handleGoBackClick}>
          Go back
        </Button>
      )}
    </form>
  );
};
