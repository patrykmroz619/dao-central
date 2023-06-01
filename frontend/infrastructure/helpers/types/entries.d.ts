type Entries<SomeObject> = {
  [Key in keyof SomeObject]: [Key, SomeObject[Key]];
}[keyof SomeObject][];
