import { useRouter } from 'next/navigation'
import { AppRoutes } from '@/common/Constants'

import React, { useState, useRef, useEffect, isValidElement } from 'react'

import { cookieService } from '@/services/CookieService'
import { authService } from '@/services/AuthService'
import Layout from '@/components/layout'

import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'

interface MyJwtPayload {
  email: string
  // Add other custom properties that you expect in your JWT payload
}

export default function Home() {
  const login = async (email: string) => {
    try {
      const response = await authService.requestLogin(email)
      if (response.accessToken && response.refreshToken) {
        cookieService.setAccessToken(response.accessToken)
        cookieService.setRefreshToken(response.refreshToken)
        router.push(AppRoutes.input)
      }
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  const decodeToken = (token: string) => {
    const result = jwtDecode<MyJwtPayload>(token)
    return result.email
  }
  const router = useRouter()

  return (
    <Layout>
      <div className={'flex flex-col items-center w-full max-w-[428px] h-full pt-9 relative '}>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            if (credentialResponse.credential) {
              const email = decodeToken(credentialResponse.credential)
              login(email)
            }
          }}
          onError={() => {
            console.log('Login Failed')
          }}
        />
      </div>
    </Layout>
  )
}
