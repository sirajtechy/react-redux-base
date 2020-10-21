import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { List, Map } from 'immutable'
import { getSchoolDetails } from '../../../redux/homepage/actions/getHomePageDetail'
import { HomePageSelector } from '../selector'

const HomePage = (props) => {
    useEffect(() => {
        getSchoolDetails()
    }, [])
    return (
        <div>
            I AM LUQMAN YOUSUF ...!
        </div>
    )
}

HomePage.PropTypes = {
    getSchoolDetails: PropTypes.func
}
export default withRouter(connect(HomePageSelector),
    {
        getSchoolDetails: getSchoolDetails
    }
)(HomePage)

