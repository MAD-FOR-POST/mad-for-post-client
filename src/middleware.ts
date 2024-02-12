import { NextResponse, userAgent } from 'next/server'
import type { NextRequest } from 'next/server'
import { AppRoutes } from '@/common/Constants'

export function middleware(request: NextRequest) {
  const { isBot } = userAgent(request)

  const url = request.nextUrl.clone()
  const path = url.pathname
  const initialPageUrl = '/input'

  // 초기 페이지 무한 리다이렉션 방지
  if (path === initialPageUrl) {
    return NextResponse.next()
  }

  const accessToken = request.cookies.get('accessToken')

  if (path === '/' && accessToken) {
    return NextResponse.redirect(new URL(AppRoutes.inputTextSelect, request.url))
  }

  if (!accessToken) return NextResponse.redirect(new URL(initialPageUrl, request.url))
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)'],
}
