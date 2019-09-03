import http from '../../utils/http'
import { apiUrl, IItem } from './constants'
import { IGetLIstParams, ISubnet, IHouse, ITariff } from '../../interfaces'

export default {
  getList: (params: IGetLIstParams<IItem>) => http.post(apiUrl, params),
  getClients: (params: IGetLIstParams<IItem>) =>
    http.post('/api/Client/Client', params)
}
