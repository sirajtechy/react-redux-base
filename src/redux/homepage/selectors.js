import {STATE_STUDENT_PROGRAM,REDUCER_SCHOOL_INFO} from '../homepage/reducer'
import {List} from 'immutable'


export const selectorGetSchoolDetails = (state) => {
    const index = STATE_STUDENT_PROGRAM
    return state.getIn([REDUCER_SCHOOL_INFO].concat(index),List())
}