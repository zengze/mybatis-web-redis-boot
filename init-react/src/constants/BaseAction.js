export const REQUEST = 'REQUEST'
export const SUCCESS = 'SUCCESS'
export const FAILURE = 'FAILURE'
//createRequestTypes('USER')
//返回值 ： {REQUEST:'USER_REQUEST',SUCCESS:'USER_SUCCESS',FAILURE:'USER_FAILURE'}
export function createRequestTypes(base,namespace=null) {
  return [REQUEST,SUCCESS,FAILURE].reduce((acc, type) => {
		if(namespace != null)
			acc[type] = `${namespace}.${base}.${type}`
		else
			acc[type] = `${base}.${type}`
		return acc
	}, {})
}

export function createCommonNameSpace(nameSpace) {
	return createNameSpace(nameSpace,['ADD','DEL_BY_ID','UPDATE','QUERY_LIST','GET_BY_ID','SEARCH_LIKE'])
}
export function createNameSpace(base,url,functionArray) {
	functionArray.reduce((acc, type) => {
		acc[type] = createRequestTypes(type);
		return acc
	}, {})
}
export function action(type, payload = {}) {
    return {type, ...payload}
}

export const NAVIGATE =  'NAVIGATE';
export const FETCH_MENU_LIST = createRequestTypes('FETCH_MENU_LIST');
export const LOGOUT = createRequestTypes('LOGOUT');
