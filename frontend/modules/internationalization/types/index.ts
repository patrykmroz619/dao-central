import { languages, namespaces } from "../settings";

export type Language = TupleToUnion<typeof languages>;
export type Namespaces = TupleToUnion<typeof namespaces>;

export type InternationalizedPageProps = {
  params: {
    lang: Language;
  };
};

export type InternationalizedProps = {
  lang: Language;
};
