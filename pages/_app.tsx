import '../styles/globals.scss'
import type { AppProps /*, AppContext */ } from 'next/app'
import { store } from '../redux/store'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/styles'
import theme from '../src/utils/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
