import { createSelector } from 'reselect'

export const propsSelector = (_: any, props: Record<string, any>) => props || {}
export const propSelector = <T>(prop: string) =>
  createSelector(propsSelector, ({ [prop]: result }: { [key: string]: T }): T => result)
