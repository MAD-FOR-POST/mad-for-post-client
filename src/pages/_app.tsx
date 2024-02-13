import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'

import { Poppins } from 'next/font/google'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useRouter } from 'next/router'
import { AnimatePresence } from 'framer-motion'
import { GoogleOAuthProvider } from '@react-oauth/google'
const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()
  const router = useRouter()

  return (
    <QueryClientProvider client={queryClient}>
      <main className={poppins.className}>
        <RecoilRoot>
          <GoogleOAuthProvider clientId="790356584617-l3q9gvvqo30b57rh0m24s7kkcg8g7mvn.apps.googleusercontent.com">
            <AnimatePresence mode={'wait'}>
              <Component {...pageProps} key={router.route} />
            </AnimatePresence>
          </GoogleOAuthProvider>
        </RecoilRoot>
      </main>
    </QueryClientProvider>
  )
}
