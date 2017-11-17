import {take, put, call, fork, select, race, cancel} from 'redux-saga/effects'
import { action,NAVIGATE,REQUEST,SUCCESS,FAILURE } from '../../../../constants/BaseAction'
import {HW_VIEW} from '../actions'
import Api from '../../../../constants/Api'
import { message } from 'antd'
import {hashHistory} from 'react-router'
import { addSaga } from '../../../../store/rootSaga'
import NavigatorAction from '../../../../constants/NavigatorAction'
function* watchGetHwViewList () {
  while (true) {
    try {
      let { data } = yield take(HW_VIEW.QUERY_LIST.REQUEST)
      let res = yield call(Api.request, Api.calcUrl(HW_VIEW.URL+'/list') ,{ method: 'POST', body: data })
      yield put(action(HW_VIEW.QUERY_LIST.SUCCESS, {data: res.data,param:res.param}))
    } catch (e) {
      yield put(action(HW_VIEW.QUERY_LIST.FAILURE, {error: e}))
    }
  }
}
function* watchGetHwViewById () {
  while (true) {
    try {
      const { id } = yield take(HW_VIEW.GET_BY_ID.REQUEST)
   	  let res = yield call(Api.request, Api.calcUrl(HW_VIEW.URL)+"/"+id)
      yield put(action(HW_VIEW.GET_BY_ID.SUCCESS, {obj: res.data}))
      hashHistory.push("/prj_user/hwview/update/"+id)
    } catch (e) {
      yield put(action(HW_VIEW.GET_BY_ID.FAILURE, {error: e}))
    }
  }
}
function* watchAddHwView () {
  while (true) {
    try {
      const { obj } = yield take(HW_VIEW.ADD.REQUEST)
   	  let res = yield call(Api.request, Api.calcUrl(HW_VIEW.URL), { method: 'POST', body: obj } )
      if(res.code == 200){
   	  yield put(action(HW_VIEW.ADD.SUCCESS, {data: res.data}))
      message.success('添加成功')
      location.href = '#/prj_user/hwview/list'
      }
      else
      {
      	  message.success('修改失败')
      	  yield put(action(ROLE.UPDATE.FAILURE))
      }
    } catch (e) {
      yield put(action(HW_VIEW.ADD.FAILURE, { error: e }))
    }
  }
}
function* watchHwViewUpdate () {
  while (true) {
    try {
      const { obj } = yield take(HW_VIEW.UPDATE.REQUEST)
      let res = yield call(Api.request, Api.calcUrl(HW_VIEW.URL), { method: 'PUT', body: obj } )
      if(res.code == 200){
      	  yield put(action(HW_VIEW.UPDATE.SUCCESS, {data: res}))
          location.href = '#/prj_user/hwview/list'
          message.success('修改成功')
      }
      else
      {
      	  message.success('修改失败')
      	  yield put(action(ROLE.UPDATE.FAILURE))
      }
    } catch (e) {
      yield put(action(HW_VIEW.UPDATE.FAILURE, {error:e}))
    }
  }
}
function* watchDelHwView() {
  while (true) {
    try {
		const newState = yield select();
		let param = yield take(HW_VIEW.DEL_BY_ID.REQUEST)
		let listParam = param[0]
    	let res = yield call(Api.request, Api.calcUrl(HW_VIEW.URL) + "/" + param['id'], { method: 'DELETE' } )
    	if(res.code == 200){
    		yield put(action(HW_VIEW.DEL_BY_ID.SUCCESS))
    		message.success('删除成功')
    		yield put(action(HW_VIEW.QUERY_LIST.REQUEST,{data:listParam}))
    	}
    	else
    	{
      	  message.success('删除失败')
      	  yield put(action(HW_VIEW.DEL_BY_ID.FAILURE, { error: e }))
    	}
    } catch (e) {
      yield put(action(HW_VIEW.DEL_BY_ID.FAILURE, { error: e }))
    }
  }
}
function* searchHwViewInfo() {
  while (true) {
    try {
      const { data } = yield take(HW_VIEW.SEARCH_LIKE.REQUEST)
      let res = yield call(Api.request,Api.calcUrl(HW_VIEW.URL)+"/search?searchKey="+data.searchKey+"&searchMes="+data.searchMes, { method: 'GET' } )
      yield put(action(HW_VIEW.SEARCH_LIKE.SUCCESS, {data: res.data}))
    } catch (e) {
      yield put(action(HW_VIEW.SEARCH_LIKE.FAILURE, { error: e }))
    }
  }
}
function* watchHwViewFlow() {
  yield [
    fork(watchGetHwViewList),
    fork(watchAddHwView),
    fork(watchDelHwView),
    fork(watchGetHwViewById),
    fork(watchHwViewUpdate),
    fork(searchHwViewInfo)
  ]
}
addSaga(watchHwViewFlow);
export default watchHwViewFlow
