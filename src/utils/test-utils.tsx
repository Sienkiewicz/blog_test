import { render, RenderOptions } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { store } from '../../redux/store'
import theme from './theme'
import { ThemeProvider } from '@material-ui/styles'

const ChakraRenderer = ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  )
}

const CustomRender = (
  ui: JSX.Element,
  options?: Omit<RenderOptions, 'queries'>
) =>
  render(ui, {
    wrapper: ChakraRenderer,
    ...options,
  })

export * from '@testing-library/react'
export { CustomRender as render }
