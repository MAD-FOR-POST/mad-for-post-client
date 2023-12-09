import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* 모바일폰에서 줌 안되도록 처리 */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
