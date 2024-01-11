import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'

import { Poppins } from 'next/font/google'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useRouter } from 'next/router'
import { AnimatePresence } from 'framer-motion'

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
          <AnimatePresence mode={'wait'}>
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </RecoilRoot>
      </main>
    </QueryClientProvider>
  )
}
