import { SessionProvider } from 'next-auth/react'
import '../styles/globals.css'
import '../styles/variables.css'
import Layout from '../components/layout'
import { StoreProvider } from '../context/store'
import FetchData from '../lib/fetchdata'

export default function App({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <SessionProvider session={session}>
            <StoreProvider>
                <FetchData />
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </StoreProvider>
        </SessionProvider>
    )
}
