declare global {
  type ObjectValues<T> = T[keyof T];
  type MakeOptional<T, U extends keyof T> = Omit<T, U> & Partial<Pick<T, U>>;
}

export {};
