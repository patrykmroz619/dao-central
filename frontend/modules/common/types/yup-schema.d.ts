import { ISchema } from "yup";

declare type YupShape<FormDataType> = Record<keyof FormDataType, ISchema>;
