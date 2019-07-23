import { IAction, IClientsStore, Payload } from 'src/interfaces'

export const constants = {
  SELECT_REPORT: 'MAIN.SELECT_REPORT',
  SET_VIEW_MODE: 'MAIN.SET_VIEW_MODE',
  RESET: 'MAIN.RESET'
}

// export const actions = {
//   selectReport: (payload: IReport) => ({
//     type: constants.SELECT_REPORT,
//     payload
//   }),
//   reset: () => ({
//     type: constants.RESET
//   }),
//   setViewMode: (payload: VIEW_MODES) => ({
//     type: constants.SET_VIEW_MODE,
//     payload
//   })
// }

const defaultState: IClientsStore = {}

export const reducer: (
  state: IClientsStore,
  action: IAction<Payload>
) => IClientsStore = (state: IClientsStore, action: IAction<Payload>) => {
  // switch (action.type) {
  //   case constants.SELECT_REPORT:
  //     return {
  //       ...state,
  //       report: action.payload! as IReport
  //     }

  //   case constants.SET_VIEW_MODE:
  //     return {
  //       ...state,
  //       viewMode: action.payload! as VIEW_MODES
  //     }

  //   case reportConstants.SAVE_SUCCEED:
  //     return {
  //       ...state,
  //       report: action.payload as IReport
  //     }

  //   case reportsConstants.REMOVE_SUCCEED:
  //     return {
  //       ...state,
  //       report: undefined
  //     }

  //   case constants.RESET:
  //     return defaultState
  // }
  return state || defaultState
}
