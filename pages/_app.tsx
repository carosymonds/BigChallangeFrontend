import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../context'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'


function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()

  return ( 
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </AuthProvider>
  );
}

export default MyApp
