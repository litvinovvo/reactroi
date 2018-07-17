import {ADD_FIELD, REMOVE_FIELD, LOAD_PRESET} from '../constants'
import {arrToMapJs, mapToArrJs} from '../helpers'
import {OrderedMap, Map, Record} from 'immutable'
import {formDesign as initialFormDesign} from '../fixtures'

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

const defaultState = initialFormDesign

export default (formDesign = defaultState, action) => {
    const {type,payload,randomId} = action

    switch (type) {
        case LOAD_PRESET: {
            console.log('loading preset')
            return {...payload}
        }

        case ADD_FIELD: {
            console.log(payload,randomId)
            const newName = payload.type + randomId
            const cloneArr = formDesign[payload.type].concat({label: payload.label, name: newName, id: newName})


            return {...formDesign, [payload.type]: cloneArr}
        }
        case REMOVE_FIELD: {
            console.log(payload)


            const mapFromArr = arrToMapJs(formDesign[payload.type])
            delete mapFromArr[payload.id]

            return {...formDesign, [payload.type]: mapToArrJs(mapFromArr)}
        }
    }

    return formDesign
}


//             const article = articleState[payload.articleId]
//             return {
//                 ...articleState,
//                 [payload.articleId]: {
//                     ...article,
//                     comments: (article.comments || []).concat(randomId)
//                 }
//             }
