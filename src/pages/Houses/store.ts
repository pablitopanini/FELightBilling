import { IAction, Payload, IHousesStore, IHouse } from 'src/interfaces'

export const constants = {
  GET_DATA: 'HOUSES.GET_DATA',
  SET_PAGE: 'HOUSES.SET_PAGE'
}

export const actions = {
  getData: () => ({
    type: constants.GET_DATA
  }),
  setPage: (payload: number) => ({
    type: constants.SET_PAGE,
    payload
  })
}

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
    case constants.GET_DATA:
      return {
        ...state,
        data: [] as IHouse[]
      }

    // default:
  }
  return state || defaultState
}
