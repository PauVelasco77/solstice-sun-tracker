export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type Combine<T1, T2> = Prettify<
  {
    [K in keyof (T1 | T2)]: T1[K] | T2[K];
  } & Partial<T1 & T2>
>;

// type Test = Expect<Equal<Result, Expected>>;

/**
 * Type-level assertion that fails to compile if the condition is false.
 * Usage: type Test = Expect<Equal<A, B>>;
 */
export type Expect<T extends true> = T;

/**
 * Type-level equality check. Returns true if types A and B are identical, false otherwise.
 */
export type Equal<A, B> =
  (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
    ? true
    : false;
