import { reducer as formReducer } from 'redux-form'
import {ADD_FIELD, REMOVE_FIELD, LOAD_PRESET} from '../constants'


export default formReducer.plugin({
    simple: (state, action) => {   // <----- 'login' is name of form given to reduxForm()
      switch(action.type) {

//          case LOAD_PRESET:{
//              return {...state,syncErrors: {} }
//          }

        case REMOVE_FIELD:{
//            console.log('in plugin',state.values[action.payload.name],'reg',state.registeredFields[action.payload.name])
            if(state.values && state.values[action.payload.name])delete state.values[action.payload.name]
            if(state.registeredFields && state.registeredFields[action.payload.name])delete state.registeredFields[action.payload.name]
            if(state.fields && state.fields[action.payload.name])delete state.fields[action.payload.name]
//            delete state.values[action.payload.name]
//            return state
          return {
            ...state
//            ,values: {
//              ...state.values,
//            },
//            registeredFields: {
//              ...state.registeredFields,
//            }

          }
        }

        default:
          return state
      }
    }
  })
