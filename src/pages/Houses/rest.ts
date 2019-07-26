import http from '../../utils/http'
import { apiUrl } from './constants'

export default {
  getList: (params: any) => http.post(apiUrl, params),
  getItem: (id: any) => http.get(`${apiUrl}?id=${id}`),
  createItem: (item: any) => http.put(apiUrl, item),
  saveItem: (item: any) => http.patch(apiUrl, item),
  removeItem: (item: any) => http.delete(apiUrl, { data: { id: item.id } })
}
