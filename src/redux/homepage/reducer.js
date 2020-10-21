import {fromJS, Map} from 'immutable'
import {GET_SCHOOL_DETAIL_INFORMATION} from '../../redux/homepage/actions/getHomePageDetail'

export const REDUCER_SCHOOL_INFO = 'schoolDetails'

export const STATE_SCHOOL_INFO = []
export const STATE_STUDENT_PROGRAM = STATE_SCHOOL_INFO.concat(['calendarList'])

function reducer (state = Map(),action) {
    let index 

    switch(action.type){
        case GET_SCHOOL_DETAIL_INFORMATION:
            index = STATE_STUDENT_PROGRAM
            return state.setIn(index,fromJS(action.data))
    }

}

export default reducer 