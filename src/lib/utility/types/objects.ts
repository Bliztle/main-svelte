export type ValueOf<T> = T[keyof T];

export type Indexable<T> = T & Record<keyof T, ValueOf<T>>;

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;