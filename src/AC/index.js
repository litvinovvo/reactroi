import {INCREMENT, START, SUCCESS, FAIL, UPDATE_FORM, INIT_FORM, ADD_FIELD, REMOVE_FIELD, LOAD_PRESET} from '../constants'
import {push, replace} from 'react-router-redux'
import { focus,change } from 'redux-form'

export function increment() {
    return {
        type: INCREMENT
    }
}



export function updateForm(form) {
    return {
        type: UPDATE_FORM,
        payload: { form }
    }
}

export function addFieldOld(field) {
    return {
        type: ADD_FIELD,
        payload: field,
        generateId: true
    }
}

export function removeField(field) {
    return {
        type: REMOVE_FIELD,
        payload: field
    }
}

export function initForm(form) {
    return {
        type: INIT_FORM,
        payload: { form }
    }
}



export function deleteArticle(id) {
    return {
        type: DELETE_ARTICLE,
        payload: { id }
    }
}

export function changeDateRange(dateRange) {
    return {
        type: CHANGE_DATE_RANGE,
        payload: { dateRange }
    }
}

export function changeSelection(selected) {
    return {
        type: CHANGE_SELECTION,
        payload: { selected }
    }
}

export function addComment(comment, articleId) {
    return {
        type: ADD_COMMENT,
        payload: { comment, articleId },
        generateId: true
    }
}




export function loadAllArticles() {
    return {
        type: LOAD_ALL_ARTICLES,
        callAPI: '/api/article'
    }
}

export function loadArticleComments(articleId) {
    return {
        type: LOAD_ARTICLE_COMMENTS,
        payload: { articleId },
        callAPI: `/api/comment?article=${articleId}`
    }
}

export function loadPreset(preset){
    return (dispatch) => {
        dispatch({
            type: LOAD_PRESET,
            payload: preset
        })

    }

}


export function addField(field) {
    return (dispatch) => {
        const randomId = (Date.now() + Math.floor(Math.random()*1000)).toString()
        dispatch({
            type: ADD_FIELD,
            payload: field,
            randomId: randomId
        })
        dispatch(change('simple',field.type + randomId + 'currency',"rub"))
        dispatch(focus('simple',field.type + randomId + 'input'))
//        setTimeout(()=>{
//            dispatch(focus('simple',field.type + randomId))
//        },
//        300)



    }
}

export function loadArticle(id) {
    return (dispatch) => {
        dispatch({
            type: LOAD_ARTICLE + START,
            payload: { id }
        })

        setTimeout(() => {
            fetch(`/api/article/${id}`)
                .then(res => {
                    if (res.status >= 400) {
                        throw new Error(res.statusText)
                    }
                    return res.json()
                })
                .then(response => dispatch({
                    type: LOAD_ARTICLE + SUCCESS,
                    payload: { id, response }
                }))
                .catch(error => {
                    dispatch({
                        type: LOAD_ARTICLE + FAIL,
                        payload: { id, error }
                    })
                    dispatch(replace('/error'))
                })
        }, 500)
    }
}

export function checkAndLoadCommentsForPage(page) {
    return (dispatch, getState) => {
        const {comments: {pagination}} = getState()
        if (pagination.getIn([page, 'loading']) || pagination.getIn([page, 'ids'])) return

        dispatch({
            type: LOAD_COMMENTS_FOR_PAGE,
            payload: { page },
            callAPI: `/api/comment?limit=5&offset=${(page - 1) * 5}`
        })
    }
}

