// ApiResponse.ts

interface IHeader {
  message: string
  errorCode: string | null
  totalPage: number
}

interface IApiResponse<T> {
  header: IHeader
  data: T
}

export default IApiResponse
