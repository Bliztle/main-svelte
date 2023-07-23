export type ValueOf<T> = T[keyof T];

export type Indexable<T> = Record<keyof T, ValueOf<T>>;