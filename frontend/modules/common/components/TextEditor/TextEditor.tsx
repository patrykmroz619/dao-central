import classNames from "classnames";
import { ComponentPropsWithoutRef } from "react";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import styles from "./TextEditor.module.scss";

type TextEditorProps = {
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  label: string;
  height?: number;
} & ComponentPropsWithoutRef<"div">;

export const TextEditor = (props: TextEditorProps) => {
  const { value, onChange, label, placeholder, className, ...restProps } =
    props;

  return (
    <div className={classNames(styles.wrapper, className)} {...restProps}>
      <label className={styles.label}>{label}</label>
      <ReactQuill
        className={styles.editor}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};