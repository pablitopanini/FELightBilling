import http from '../../utils/http'
import { apiUrl } from './constants'
import { IHouse, IGetLIstParams, ISubnet } from '../../interfaces'

export default {
  getList: (params: IGetLIstParams<IHouse>) => http.post(apiUrl, params),
  getItem: (id: any) => http.get(`${apiUrl}?id=${id}`),
  createItem: (item: any) => http.put(apiUrl, item),
  saveItem: (item: any) => http.patch(apiUrl, item),
  removeItem: (item: any) => http.delete(apiUrl, { data: { id: item.id } }),
  getSubnets: (params: IGetLIstParams<ISubnet>) =>
    http.post('/api/Subnet/Free', params)
}
