import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store'
import reportWebVitals from './reportWebVitals'
import App from './App'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom'

const container = document.getElementById('root')!
const root = createRoot(container)

const router = createBrowserRouter(
	createRoutesFromElements(<Route path='/' element={<App />}></Route>)
)

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<CssBaseline />
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
