import {combineReducers} from 'redux-immutable'
import {default as homePageReducer} from '../redux/homepage/reducer'


export default combineReducers ({
    [homePageReducer.key] : homePageReducer
})

