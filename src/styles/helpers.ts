import { FlattenSimpleInterpolation } from 'styled-components'

export const withModifier =
  <T>(modifier: string, styleString: FlattenSimpleInterpolation) =>
  (props: T) => {
    // @ts-ignore
    return props[modifier] ? styleString : ''
  }
