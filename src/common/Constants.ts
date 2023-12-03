export const Apis = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,

  //AUTH
  login: '/api/v1/auth/login',

  //USER
  createUser: '/api/v1/users',

  //POST
  writePost: '/api/v1/posts',
}

export const AppRoutes = {
  index: '/',
  apiExample: '/examples/api',
  publishExample: '/examples/publish',
  atomExample: '/examples/atom',
  input: '/input',
  inputText: '/input/text',
  inputImage: '/input/image',
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
