import {UPDATE_FORM, INIT_FORM} from '../constants'
import {arrToMap} from '../helpers'
import {OrderedMap, Map, Record} from 'immutable'

const FormRecord = Record({
    init: false,
    id: null,
    value: null,
    costs: null
})

const ReducerState = Record({
    entities: new OrderedMap({}),
})

const defaultState = new ReducerState()

export default (formState = defaultState, action) => {
    const {type,payload} = action

    switch (type) {
        case INIT_FORM:
            return formState
                .setIn(['entities',payload.form.id], new FormRecord({...payload.form,init: true}))
        case UPDATE_FORM:
            return formState.updateIn(['entities',payload.form.id], val => new FormRecord(val.merge({...payload.form})))

    }

    return formState
}




//import {ADD_COMMENT, LOAD_ARTICLE_COMMENTS, LOAD_COMMENTS_FOR_PAGE, START, SUCCESS} from '../constants'
//import {arrToMap} from '../helpers'
//import {OrderedMap, Map, Record} from 'immutable'
//
//const CommentRecord = Record({
//    id: null,
//    text: null,
//    user: null
//})
//
//const ReducerState = Record({
//    entities: new OrderedMap({}),
//    pagination: new Map({}),
//    total: null
//})
//
//const defaultState = new ReducerState()
//
//export default (commentsState = defaultState, action) => {
//    const {type, payload, response, randomId} = action
//
//    switch (type) {
//        case ADD_COMMENT:
//            return commentsState.setIn(['entities', randomId], new CommentRecord({...payload.comment, id: randomId}))
//
//        case LOAD_ARTICLE_COMMENTS + SUCCESS:
//            return commentsState.update('entities', entities => entities.merge(arrToMap(response, CommentRecord)))
//
//        case LOAD_COMMENTS_FOR_PAGE + START:
//            return commentsState.setIn(['pagination', payload.page, 'loading'], true)
//
//        case LOAD_COMMENTS_FOR_PAGE + SUCCESS:
//            return commentsState
//                .set('total', response.total)
//                .mergeIn(['entities'], arrToMap(response.records, CommentRecord))
//                .setIn(['pagination', payload.page, 'ids'], response.records.map(comment => comment.id))
//                .setIn(['pagination', payload.page, 'loading'], false)
//    }
//
//    return commentsState
//}
