type TupleToUnion<T extends unknown[] | readonly unknown[]> = T[number];
