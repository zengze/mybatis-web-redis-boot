import {take, put, call, fork, select, race, cancel} from 'redux-saga/effects'
import { action,NAVIGATE,REQUEST,SUCCESS,FAILURE } from '../../../../constants/BaseAction'
import {HW_MODEL} from '../actions'
import Api from '../../../../constants/Api'
import { message } from 'antd'
import {hashHistory} from 'react-router'
import { addSaga } from '../../../../store/rootSaga'
import NavigatorAction from '../../../../constants/NavigatorAction'
function* watchGetHwModelList () {
  while (true) {
    try {
      let { data } = yield take(HW_MODEL.QUERY_LIST.REQUEST)
      let res = yield call(Api.request, Api.calcUrl(HW_MODEL.URL+'/list') ,{ method: 'POST', body: data })
      yield put(action(HW_MODEL.QUERY_LIST.SUCCESS, {data: res.data,param:res.param}))
    } catch (e) {
      yield put(action(HW_MODEL.QUERY_LIST.FAILURE, {error: e}))
    }
  }
}
function* watchGetHwModelById () {
  while (true) {
    try {
      const { id } = yield take(HW_MODEL.GET_BY_ID.REQUEST)
   	  let res = yield call(Api.request, Api.calcUrl(HW_MODEL.URL)+"/"+id)
      yield put(action(HW_MODEL.GET_BY_ID.SUCCESS, {obj: res.data}))
      hashHistory.push("/prj_user/hwmodel/update/"+id)
    } catch (e) {
      yield put(action(HW_MODEL.GET_BY_ID.FAILURE, {error: e}))
    }
  }
}
function* watchAddHwModel () {
  while (true) {
    try {
      const { obj } = yield take(HW_MODEL.ADD.REQUEST)
   	  let res = yield call(Api.request, Api.calcUrl(HW_MODEL.URL), { method: 'POST', body: obj } )
      if(res.code == 200){
   	  yield put(action(HW_MODEL.ADD.SUCCESS, {data: res.data}))
      message.success('添加成功')
      location.href = '#/prj_user/hwmodel/list'
      }
      else
      {
      	  message.success('修改失败')
      	  yield put(action(ROLE.UPDATE.FAILURE))
      }
    } catch (e) {
      yield put(action(HW_MODEL.ADD.FAILURE, { error: e }))
    }
  }
}
function* watchHwModelUpdate () {
  while (true) {
    try {
      const { obj } = yield take(HW_MODEL.UPDATE.REQUEST)
      let res = yield call(Api.request, Api.calcUrl(HW_MODEL.URL), { method: 'PUT', body: obj } )
      if(res.code == 200){
      	  yield put(action(HW_MODEL.UPDATE.SUCCESS, {data: res}))
          location.href = '#/prj_user/hwmodel/list'
          message.success('修改成功')
      }
      else
      {
      	  message.success('修改失败')
      	  yield put(action(ROLE.UPDATE.FAILURE))
      }
    } catch (e) {
      yield put(action(HW_MODEL.UPDATE.FAILURE, {error:e}))
    }
  }
}
function* watchDelHwModel() {
  while (true) {
    try {
		const newState = yield select();
		let param = yield take(HW_MODEL.DEL_BY_ID.REQUEST)
		let listParam = param[0]
    	let res = yield call(Api.request, Api.calcUrl(HW_MODEL.URL) + "/" + param['id'], { method: 'DELETE' } )
    	if(res.code == 200){
    		yield put(action(HW_MODEL.DEL_BY_ID.SUCCESS))
    		message.success('删除成功')
    		yield put(action(HW_MODEL.QUERY_LIST.REQUEST,{data:listParam}))
    	}
    	else
    	{
      	  message.success('删除失败')
      	  yield put(action(HW_MODEL.DEL_BY_ID.FAILURE, { error: e }))
    	}
    } catch (e) {
      yield put(action(HW_MODEL.DEL_BY_ID.FAILURE, { error: e }))
    }
  }
}
function* searchHwModelInfo() {
  while (true) {
    try {
      const { data } = yield take(HW_MODEL.SEARCH_LIKE.REQUEST)
      let res = yield call(Api.request,Api.calcUrl(HW_MODEL.URL)+"/search?searchKey="+data.searchKey+"&searchMes="+data.searchMes, { method: 'GET' } )
      yield put(action(HW_MODEL.SEARCH_LIKE.SUCCESS, {data: res.data}))
    } catch (e) {
      yield put(action(HW_MODEL.SEARCH_LIKE.FAILURE, { error: e }))
    }
  }
}
function* watchHwModelFlow() {
  yield [
    fork(watchGetHwModelList),
    fork(watchAddHwModel),
    fork(watchDelHwModel),
    fork(watchGetHwModelById),
    fork(watchHwModelUpdate),
    fork(searchHwModelInfo)
  ]
}
addSaga(watchHwModelFlow);
export default watchHwModelFlow
