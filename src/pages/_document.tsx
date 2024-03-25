import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      <title>VietGundam</title> {/* Set your website title here */}
      <link rel="icon" href="/logo.png" /> {/* Set the path to your favicon */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:500&display=swap"></link>
      <Head>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
