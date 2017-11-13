import { action,createRequestTypes,REQUEST,SUCCESS,FAILURE } from '../../../../constants/BaseAction'
const namespace = 'PRJ_PROJECTNAME__WR_ADMA_B'
export const WR_ADMA_B = {
	URL: 'prj_projectname/wradmab',
	ADD : createRequestTypes('ADD',namespace),
	DEL_BY_ID : createRequestTypes('DEL_BY_ID',namespace),
	UPDATE : createRequestTypes('UPDATE',namespace),
	QUERY_LIST : createRequestTypes('QUERY_LIST',namespace),
	GET_BY_ID : createRequestTypes('GET_BY_ID',namespace),
	SEARCH_LIKE : createRequestTypes('SEARCH_LIKE',namespace),
	CHANGE_STATE: createRequestTypes('CHANGE_STATE',namespace)
}
 const actions = {
  delObjById: (id,...others) => action(WR_ADMA_B.DEL_BY_ID.REQUEST, { id,...others }),
  getObjList:(data,...others) => action(WR_ADMA_B.QUERY_LIST.REQUEST,{data,...others}),
  getObjById : (id,...others) => action(WR_ADMA_B.GET_BY_ID.REQUEST, { id ,...others}),
  searchLike: (data,...others) => action(WR_ADMA_B.SEARCH_LIKE.REQUEST,{ data ,...others }),
  updateObj :(obj,...others) => action(WR_ADMA_B.UPDATE.REQUEST,{ obj,...others  }),
  addObj : (obj,...others) => action(WR_ADMA_B.ADD.REQUEST,{ obj,...others  }),
  changeState : (data,...others) => action(WR_ADMA_B.CHANGE_STATE.REQUEST,{ data,...others})
}
export default actions
