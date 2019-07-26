import http from '../../utils/http'

export default {
  getData: (params: any) => http.post(`/api/House/House`, params),
  save: (item: any) =>
    http.post(
      '/api/dispatcher/Call?applicationId=Platform&callableReference=Platform/ReportManager[AddOrUpdate]',
      {
        itemsToUpdate: [item]
      }
    )
}
