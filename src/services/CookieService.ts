import { Cookies } from 'react-cookie'

const cookies = new Cookies()

const CookieKeys = {
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
}

const setCookie = (key: string, value: string, option?: any) => {
  cookies.set(key, value, { ...option })
}

const getCookie = (key: string) => {
  return cookies.get(key)
}

export const setAccessToken = (value: string) => {
  setCookie(CookieKeys.accessToken, value)
}

export const getAccessToken = () => {
  return getCookie(CookieKeys.accessToken)
}

export const clearAccessToken = () => {
  return cookies.remove(CookieKeys.accessToken)
}

export const setRefreshToken = (value: string) => {
  setCookie(CookieKeys.refreshToken, value)
}

export const getRefreshToken = () => {
  return getCookie(CookieKeys.refreshToken)
}

export const clearRefreshToken = () => {
  return cookies.remove(CookieKeys.refreshToken)
}
