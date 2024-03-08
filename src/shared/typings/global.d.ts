declare global {
  export type PropsWithClassName<T> = T & { className?: string };

  export type Widgets =
    | {
        [name: string]: Widget;
      }
    | undefined;

  export type Fields =
    | {
        [name: string]: Field;
      }
    | undefined;
  declare module "*.svg" {
    const src: string;
    export default src;
  }
  declare module "*.png" {
    const src: string;
    export default src;
  }
}

export {};
