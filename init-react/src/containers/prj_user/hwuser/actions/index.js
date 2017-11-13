import { action,createRequestTypes,REQUEST,SUCCESS,FAILURE } from '../../../../constants/BaseAction'
const namespace = 'PRJ_USER__HW_USER'
export const HW_USER = {
	URL: 'prj_user/hwuser',
	ADD : createRequestTypes('ADD',namespace),
	DEL_BY_ID : createRequestTypes('DEL_BY_ID',namespace),
	UPDATE : createRequestTypes('UPDATE',namespace),
	QUERY_LIST : createRequestTypes('QUERY_LIST',namespace),
	GET_BY_ID : createRequestTypes('GET_BY_ID',namespace),
	SEARCH_LIKE : createRequestTypes('SEARCH_LIKE',namespace),
	CHANGE_STATE: createRequestTypes('CHANGE_STATE',namespace)
}
 const actions = {
  delObjById: (id,...others) => action(HW_USER.DEL_BY_ID.REQUEST, { id,...others }),
  getObjList:(data,...others) => action(HW_USER.QUERY_LIST.REQUEST,{data,...others}),
  getObjById : (id,...others) => action(HW_USER.GET_BY_ID.REQUEST, { id ,...others}),
  searchLike: (data,...others) => action(HW_USER.SEARCH_LIKE.REQUEST,{ data ,...others }),
  updateObj :(obj,...others) => action(HW_USER.UPDATE.REQUEST,{ obj,...others  }),
  addObj : (obj,...others) => action(HW_USER.ADD.REQUEST,{ obj,...others  }),
  changeState : (data,...others) => action(HW_USER.CHANGE_STATE.REQUEST,{ data,...others})
}
export default actions
