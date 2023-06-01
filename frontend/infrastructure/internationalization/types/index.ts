import { languages, namespaces } from "../settings";

export type Language = TupleToUnion<typeof languages>;
export type Namespaces = TupleToUnion<typeof namespaces>;

export type InternationalizedParams = {
  lang: Language;
};

export type InternationalizedPageProps = {
  params: InternationalizedParams;
};

export type InternationalizedProps = {
  lang: Language;
};
