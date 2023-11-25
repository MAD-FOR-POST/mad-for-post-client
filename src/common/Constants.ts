export const Apis = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,

  //AUTH
  login: '/api/v1/auth/login',
  verifyToken: '/api/v1/auth/verify',
  refreshToken: '/api/v1/auth/token/refresh',
  createUser: '/api/v1/users',
  getMyInfo: '/api/v1/users/my-info',

  //USER
  updateUser: `/api/v1/users`,

  //POST
  getAllPosts: '/api/v1/posts',
  getRecommendPosts: '/api/v1/posts/recommends',
  getRecentPosts: '/api/v1/posts/latest',
  getRankedPosts: '/api/v1/posts/ranked',
  getMyPosts: '/api/v1/posts/my-posts',
  getPost: (postId: number) => `/api/v1/posts/${postId}`,
  writePost: '/api/v1/posts',
  searchPost: `/api/v1/posts/search`,
  updatePost: (postId: number) => `/api/v1/posts/${postId}`,

  //Category
  getAllCategories: '/api/v1/categories',

  //Exhibitions
  getExhibitions: '/api/v1/exhibitions',

  //File
  uploadImage: '/api/v1/files/upload/image',
  downloadImage: (hash: string) => `/api/v1/files/download/image/${hash}`,
}

export const AppRoutes = {
  index: '/',
  apiExample: '/examples/api',
  publishExample: '/examples/publish',
  atomExample: '/examples/atom',
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
