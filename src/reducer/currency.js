import {LOAD_CURRENCY,START, SUCCESS, FAIL} from '../constants'
import {arrToMap} from '../helpers'
import {OrderedMap, Map, Record} from 'immutable'

//const FormRecord = Record({
//    init: false,
//    id: null,
//    value: null,
//    costs: null
//})
//
//const ReducerState = Record({
//    entities: new OrderedMap({}),
//})



const defaultState = {
    loading: false,
    loaded: false,
    error: false,
    cbrf: {}

}

export default (currency = defaultState, action) => {
    const {type,payload} = action

    switch (type) {
        case LOAD_CURRENCY + START:
            return {...currency,loading: true}
        case LOAD_CURRENCY + SUCCESS:
            return {...currency,loading: false,loaded: true,cbrf: payload.response}  
        case LOAD_CURRENCY + FAIL:
            return {...currency,loading: false,loaded: false,error: payload.error}                
    }

    return currency
}
