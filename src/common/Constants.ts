export const Apis = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,

  //인증
  login: '/api/v1/auth/login', //로그인
  refreshToken: '/api/v1/auth/refresh-token', //토큰 갱신
  validateToken: '/api/v1/auth/validate-token', //토큰 검증
  validateEntryPointPassword: '/api/v1/auth/validate-entry-point-password', //토큰 검증

  //USER
  createUser: '/api/v1/users',

  //POST
  getPosts: '/api/v1/posts',
  getPost: (id: number) => `/api/v1/posts/${id}`,
  generatePost: '/api/v1/posts',
  generateImage: '/api/v1/posts/image',
}

export const AppRoutes = {
  index: '/',
  apiExample: '/examples/api',
  publishExample: '/examples/publish',
  layoutExample: '/examples/layout',
  atomExample: '/examples/atom',
  input: '/input',
  inputText: '/input/text',
  inputImage: '/input/image',
  resultPage: '/result',
  edit:'/edit'
}

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  REQUEST_TIMEOUT = 408,
  CONFLICT = 409,
  GONE = 410,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
}

export const ApiErrorCode = {
  VALID_TOKEN: 1000,
  NEED_REFRESH_TOKEN: 1001,
  EXPIRED_TOKEN: 1002,
  INVALID_TOKEN: 1003,
}
