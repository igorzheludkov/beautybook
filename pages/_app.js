import { SessionProvider } from 'next-auth/react'
import '../styles/globals.css'
import '../styles/variables.css'
import Layout from '../components/layout'
import { StoreProvider } from '../context/store'

export default function App({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <SessionProvider session={session}>
            <StoreProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </StoreProvider>
        </SessionProvider>
    )
}
