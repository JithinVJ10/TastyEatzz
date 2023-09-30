import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import store from './Redux/store/store.js'
import { Provider } from 'react-redux'
import {GoogleOAuthProvider} from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId='287443939754-qq3mrls8hgeje40uaco8bddsrmr1vvb7.apps.googleusercontent.com'>
      <React.StrictMode>
        <BrowserRouter>
        <App />
        </BrowserRouter>
      </React.StrictMode>
    </GoogleOAuthProvider>
  </Provider>
)
