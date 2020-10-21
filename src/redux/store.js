import {Map} from 'immutable'
import {applyMiddleware,createStore,compose} from 'redux'
import thunk from 'redux-thunk'


import reducer from './reducer'

const middlewares = [
    thunk
]

const store = createStore (
    reducer,
    Map(),
    compose(
        applyMiddleware(...middlewares),
        window && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
)

export default store 