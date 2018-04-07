import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import counterReducer from './counter'
import formReducer from './form'
import presetsReducer from './presets'
import formDesignReducer from './formDesign'
import reduxForm from './reduxForm'
import { reducer as reduxFormReducer} from 'redux-form';
//import articles from './articles'
//import comments from './comments'
//import filters from './filters'

export default combineReducers({
    count: counterReducer,
    form: reduxForm,
//    form: reduxFormReducer,
    forms: formReducer,
    formDesign: formDesignReducer,
    router: routerReducer,
    presets: presetsReducer
})
