import React from 'react'
import { AppRouter } from './router'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'

export const CalendarApp = () => {
    return (
        <Provider store={store}>

        <HashRouter>
            <AppRouter />
        </HashRouter>
        </Provider>
    )
}
