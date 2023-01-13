import { AnySchema } from "yup";

declare type YupShape<FormDataType> = Record<keyof FormDataType, AnySchema>;
