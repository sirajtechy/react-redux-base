import {createStructuredSelector} from 'reselect'
import {selectorGetSchoolDetails} from '../../redux/homepage/selectors'

export const HomePageSelector = () => {
    return createStructuredSelector(
        {
            getSchoolProgramData : selectorGetSchoolDetails
        }
    )
} 