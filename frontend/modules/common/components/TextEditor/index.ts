import dynamic from "next/dynamic";
import { TextEditorProps } from "./TextEditor";

export const TextEditor = dynamic<TextEditorProps>(
  () => import("./TextEditor").then((mod) => mod.TextEditor),
  { ssr: false }
);
