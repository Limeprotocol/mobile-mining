import Head from "next/head"
import "../styles/globals.css"
import { SessionProvider } from "next-auth/react"
import { Raleway, Poppins } from "next/font/google"

import { Toaster } from "react-hot-toast"

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
})
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
})

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <div className={`${raleway.variable} ${poppins.variable} `}>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no"
          />
        </Head>
        <Component {...pageProps} />
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </SessionProvider>
  )
}
