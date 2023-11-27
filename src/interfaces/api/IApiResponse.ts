// ApiResponse.ts

interface IApiResponse<T> {
  message?: string
  statusCode?: number
  totalPage?: number
  data: T
}

export default IApiResponse
