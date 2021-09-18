import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { createGenerateClassName, StylesProvider } from '@material-ui/styles'

const generateClassName = createGenerateClassName()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <StylesProvider generateClassName={generateClassName} injectFirst>
        <App />
      </StylesProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
