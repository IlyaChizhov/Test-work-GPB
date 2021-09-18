import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { createGenerateClassName, StylesProvider } from '@material-ui/styles'
import createTheme from '@material-ui/core/styles/createTheme'
import { ThemeProvider } from '@material-ui/core'
import purple from '@material-ui/core/colors/purple'
import green from '@material-ui/core/colors/green'

const generateClassName = createGenerateClassName()

const theme = createTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <StylesProvider generateClassName={generateClassName} injectFirst>
          <App />
        </StylesProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
