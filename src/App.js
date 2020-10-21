import React from 'react'
import {connect} from 'react-redux'
import {List,Map} from 'immutable'
import PropTypes from 'prop-types'
import {Switch,withRouter, Route} from 'react-router-dom'
import {HomePage} from '../src/pages/homepage/components/HomePage'

const App = () => {
    
    return(
        <Switch>
            <Route exact path="/" component={HomePage} />
        </Switch>
    )
}




export default withRouter (
    connect(
        null,
        {}
    )(App)
)