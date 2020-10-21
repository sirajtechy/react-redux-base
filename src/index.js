import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './redux/store'
import './style'


const render = () => {

    ReactDOM.render(
        <Router>
            <Provider store={store}>
                <App />
            </Provider>
        </Router>,
        document.getElementById('app')
    )
}

render()
if (module.hot) {
    module.hot.accept('./App', () => render())
}