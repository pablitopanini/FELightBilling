import axios, { AxiosResponse, AxiosError } from 'axios'

axios.defaults.baseURL = '/'
axios.defaults.headers.common.Authorization = sessionStorage.getItem('token')

export default {
  get: (...params: any[]) => {
    return run('get', ...params)
  },

  post: (...params: any[]) => {
    return run('post', ...params)
  },

  put: (...params: any[]) => {
    return run('put', ...params)
  },

  delete: (...params: any[]) => {
    return run('delete', ...params)
  },

  patch: (...params: any[]) => {
    return run('patch', ...params)
  }
}

const run = (method: string, ...params: any[]) => {
  return new Promise((resolve, reject) =>
    axios[method](...params)
      .then((response: AxiosResponse) => {
        resolve(response)
      })
      .catch((error: AxiosError) => {
        reject(error)
      })
  )
}
