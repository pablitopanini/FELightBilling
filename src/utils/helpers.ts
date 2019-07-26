import { transform } from 'lodash'

export const getActions = <T, A>(actionNames: A) =>
  transform<any, any>(actionNames, (result: any, value, key) => {
    result[key] = (payload?: any) => ({
      type: value,
      payload
    })
  }) as T
