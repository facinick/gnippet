export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never

export type JSON =
    | string
    | number
    | boolean
    | { [x: string]: JSON }
    | Array<JSON>