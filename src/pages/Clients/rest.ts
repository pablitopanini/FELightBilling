import http from '../../utils/http'
import { apiUrl, IItem } from './constants'
import { IGetLIstParams, ISubnet, IHouse, ITariff } from '../../interfaces'

export default {
  getList: (params: IGetLIstParams<IItem>) => http.post(apiUrl, params),
  getItem: (id: any) => http.get(`${apiUrl}?id=${id}`),
  createItem: (item: any) => http.put(apiUrl, item),
  saveItem: (item: any) => http.patch(apiUrl, item),
  removeItem: (item: any) => http.delete(apiUrl, { data: { id: item.id } }),
  getHouses: (params: IGetLIstParams<IHouse>) =>
    http.post('/api/House/House', params),
  getGreyAddress: (id: any) =>
    http.get(`/api/Network/FreeAddressesByHouseId?houseId=${id}`),
  getWhiteAddress: () => http.get(`/api/Network/FreeWhiteAddresses`),
  getTariffs: (params: IGetLIstParams<ITariff>) =>
    http.post('/api/Tariff/Tariff', params),
  addPayment: (params: any) => http.post('/api/Payment/Add', params)
}
