import { action,createRequestTypes,REQUEST,SUCCESS,FAILURE } from '../../../../constants/BaseAction'
const namespace = 'PRJ_USER__HW_MODEL'
export const HW_MODEL = {
	URL: 'prj_user/hwmodel',
	ADD : createRequestTypes('ADD',namespace),
	DEL_BY_ID : createRequestTypes('DEL_BY_ID',namespace),
	UPDATE : createRequestTypes('UPDATE',namespace),
	QUERY_LIST : createRequestTypes('QUERY_LIST',namespace),
	GET_BY_ID : createRequestTypes('GET_BY_ID',namespace),
	SEARCH_LIKE : createRequestTypes('SEARCH_LIKE',namespace),
	CHANGE_STATE: createRequestTypes('CHANGE_STATE',namespace)
}
 const actions = {
  delObjById: (id,...others) => action(HW_MODEL.DEL_BY_ID.REQUEST, { id,...others }),
  getObjList:(data,...others) => action(HW_MODEL.QUERY_LIST.REQUEST,{data,...others}),
  getObjById : (id,...others) => action(HW_MODEL.GET_BY_ID.REQUEST, { id ,...others}),
  searchLike: (data,...others) => action(HW_MODEL.SEARCH_LIKE.REQUEST,{ data ,...others }),
  updateObj :(obj,...others) => action(HW_MODEL.UPDATE.REQUEST,{ obj,...others  }),
  addObj : (obj,...others) => action(HW_MODEL.ADD.REQUEST,{ obj,...others  }),
  changeState : (data,...others) => action(HW_MODEL.CHANGE_STATE.REQUEST,{ data,...others})
}
export default actions
