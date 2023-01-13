import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { YupShape } from "shared/types/yup-schema";
import { walletAddressValidation } from "shared/utils/walletAddressValidation";

type CreateDaoFormData = {
  organizationName: string;
  nftAddress: string;
};

const createDaoFormSchema = yup.object().shape<YupShape<CreateDaoFormData>>({
  organizationName: yup.string().required("Organization name is required."),
  nftAddress: yup.string().test(walletAddressValidation),
});

const defaultValues: CreateDaoFormData = {
  organizationName: "",
  nftAddress: "",
};

export const useCreateDao = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateDaoFormData>({
    resolver: yupResolver(createDaoFormSchema),
    defaultValues,
  });

  const createDao = async (formData: CreateDaoFormData) => {
    const { organizationName, nftAddress } = formData;

    console.log(organizationName, nftAddress);
  };

  return {
    register,
    handleCreateDaoSubmit: handleSubmit(createDao),
    formErrors: errors,
  };
};
