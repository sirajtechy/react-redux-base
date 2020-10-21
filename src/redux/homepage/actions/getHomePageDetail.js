import ajax from '../../../http/ajax'
import {SCHOOL_DETAIL_API} from '../../../constants'

export const REQUEST_SCHOOL_DETAIL_INFORMATION = 'REQUEST_SCHOOL_DETAIL_INFORMATION'
export const GET_SCHOOL_DETAIL_INFORMATION = 'GET_SCHOOL_DETAIL_INFORMATION'

export const getSchoolDetails = () => {
    return dispatch => {
      ajax.get(SCHOOL_DETAIL_API).then(response => {
          return dispatch ({type: GET_SCHOOL_DETAIL_INFORMATION ,payload: response.data})
      })
    }
}