import {OrderedMap, Map} from 'immutable'

export function arrToMap(arr, DataRecord = Map) {
    return arr.reduce((acc, item) =>
        acc.set(item.id, new DataRecord(item))
    , new OrderedMap({}))
}

export function mapToArr(obj) {
    return obj.valueSeq().toArray()
}

export function arrToMapJs(arr) {
    return arr.reduce((acc, item) => {
        acc[item.id] = item
        return acc
    }, {})
}

export function mapToArrJs(obj) {
    return Object.keys(obj).map(id => obj[id])
}


