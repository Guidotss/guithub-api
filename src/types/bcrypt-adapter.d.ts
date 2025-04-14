export type Hash = (password: string, saltOrRounds?: number) => Promise<string>;
export type Compare = (password: string, hash: string) => Promise<boolean>;
