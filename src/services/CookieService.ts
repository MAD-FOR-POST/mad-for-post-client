import { Cookies } from 'react-cookie'

const cookies = new Cookies()

const CookieKeys = {
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
}

export const cookieService = {
  setCookie(key: string, value: string, option?: any) {
    cookies.set(key, value, { path: '/', httpOnly: true, ...option })
  },
  getCookie(key: string) {
    return cookies.get(key)
  },

  setAccessToken(value: string) {
    this.setCookie(CookieKeys.accessToken, value)
  },

  getAccessToken() {
    return this.getCookie(CookieKeys.accessToken)
  },

  clearAccessToken() {
    return cookies.remove(CookieKeys.accessToken)
  },

  setRefreshToken(value: string) {
    this.setCookie(CookieKeys.refreshToken, value)
  },

  getRefreshToken() {
    return this.getCookie(CookieKeys.refreshToken)
  },

  clearRefreshToken() {
    return cookies.remove(CookieKeys.refreshToken)
  },
}
