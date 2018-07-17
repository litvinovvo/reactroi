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

export function formatDate(date) {

  var dd = date.getDate();
  if (dd < 10) dd = '0' + dd;

  var mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;

  var yy = date.getFullYear() % 100;
  if (yy < 10) yy = '0' + yy;

  return dd + '.' + mm + '.' + yy;
}


