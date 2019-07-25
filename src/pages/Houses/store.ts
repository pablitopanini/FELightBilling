import { IAction, Payload, IHousesStore, IHouse } from 'src/interfaces'
import { transform } from 'lodash'

export const actionNames = {
  getData: 'HOUSES.GET_DATA',
  setPage: 'HOUSES.SET_PAGE',
  setPageSize: 'HOUSES.SET_PAGE_SIZE'
}

export const actions = transform(actionNames, (result: any, value, key) => {
  result[key] = (payload: any) => ({
    type: value,
    payload
  })
})

const defaultData: IHouse[] = []

const defaultState: any = {
  data: defaultData,
  page: 1,
  pageSize: 10,
  total: 0
}

export const reducer: (
  state: IHousesStore,
  action: IAction<Payload>
) => IHousesStore = (state: IHousesStore, action: IAction<Payload>) => {
  switch (action.type) {
    case actionNames.getData:
      return {
        ...state,
        data: [] as IHouse[]
      }

    case actionNames.setPage:
      return {
        ...state,
        page: action.payload
      }

    case actionNames.setPageSize:
      return {
        ...state,
        pageSize: action.payload
      }

    default:
      return state || defaultState
  }
}
