import { transform } from 'lodash'

export const getActions = <T, A>(actionNames: A) =>
  transform<any, any>(actionNames, (result: any, value, key) => {
    result[key] = (payload?: any) => ({
      type: value,
      payload
    })
  }) as T

interface IPaginationParams {
  onChange?: (page: number) => void
  pageSize: number
  onShowSizeChange: (current: number, size: number) => void
  total: number
  defaultPageSize?: number
  pageSizeOptions?: Array<string>
}
export const getPagination = ({
  onChange,
  pageSize,
  onShowSizeChange,
  total,
  defaultPageSize,
  pageSizeOptions
}: IPaginationParams) => ({
  showTotal: (total: number, range: number[]) =>
    `${range[0]}-${range[1]} из ${total}`,
  showSizeChanger: true,
  onChange,
  defaultPageSize: defaultPageSize || 10,
  pageSize,
  pageSizeOptions: pageSizeOptions || ['10', '50', '100'],
  onShowSizeChange,
  total
})
