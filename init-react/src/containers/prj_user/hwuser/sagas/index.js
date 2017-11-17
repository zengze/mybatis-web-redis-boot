import {take, put, call, fork, select, race, cancel} from 'redux-saga/effects'
import { action,NAVIGATE,REQUEST,SUCCESS,FAILURE } from '../../../../constants/BaseAction'
import {HW_USER} from '../actions'
import Api from '../../../../constants/Api'
import { message } from 'antd'
import {hashHistory} from 'react-router'
import { addSaga } from '../../../../store/rootSaga'
import NavigatorAction from '../../../../constants/NavigatorAction'
function* watchGetHwUserList () {
  while (true) {
    try {
      let { data } = yield take(HW_USER.QUERY_LIST.REQUEST)
      let res = yield call(Api.request, Api.calcUrl(HW_USER.URL+'/list') ,{ method: 'POST', body: data })
      yield put(action(HW_USER.QUERY_LIST.SUCCESS, {data: res.data,param:res.param}))
    } catch (e) {
      yield put(action(HW_USER.QUERY_LIST.FAILURE, {error: e}))
    }
  }
}
function* watchGetHwUserById () {
  while (true) {
    try {
      const { id } = yield take(HW_USER.GET_BY_ID.REQUEST)
   	  let res = yield call(Api.request, Api.calcUrl(HW_USER.URL)+"/"+id)
      yield put(action(HW_USER.GET_BY_ID.SUCCESS, {obj: res.data}))
      hashHistory.push("/prj_user/hwuser/update/"+id)
    } catch (e) {
      yield put(action(HW_USER.GET_BY_ID.FAILURE, {error: e}))
    }
  }
}
function* watchAddHwUser () {
  while (true) {
    try {
      const { obj } = yield take(HW_USER.ADD.REQUEST)
   	  let res = yield call(Api.request, Api.calcUrl(HW_USER.URL), { method: 'POST', body: obj } )
      if(res.code == 200){
   	  yield put(action(HW_USER.ADD.SUCCESS, {data: res.data}))
      message.success('添加成功')
      location.href = '#/prj_user/hwuser/list'
      }
      else
      {
      	  message.success('修改失败')
      	  yield put(action(ROLE.UPDATE.FAILURE))
      }
    } catch (e) {
      yield put(action(HW_USER.ADD.FAILURE, { error: e }))
    }
  }
}
function* watchHwUserUpdate () {
  while (true) {
    try {
      const { obj } = yield take(HW_USER.UPDATE.REQUEST)
      let res = yield call(Api.request, Api.calcUrl(HW_USER.URL), { method: 'PUT', body: obj } )
      if(res.code == 200){
      	  yield put(action(HW_USER.UPDATE.SUCCESS, {data: res}))
          location.href = '#/prj_user/hwuser/list'
          message.success('修改成功')
      }
      else
      {
      	  message.success('修改失败')
      	  yield put(action(ROLE.UPDATE.FAILURE))
      }
    } catch (e) {
      yield put(action(HW_USER.UPDATE.FAILURE, {error:e}))
    }
  }
}
function* watchDelHwUser() {
  while (true) {
    try {
		const newState = yield select();
		let param = yield take(HW_USER.DEL_BY_ID.REQUEST)
		let listParam = param[0]
    	let res = yield call(Api.request, Api.calcUrl(HW_USER.URL) + "/" + param['id'], { method: 'DELETE' } )
    	if(res.code == 200){
    		yield put(action(HW_USER.DEL_BY_ID.SUCCESS))
    		message.success('删除成功')
    		yield put(action(HW_USER.QUERY_LIST.REQUEST,{data:listParam}))
    	}
    	else
    	{
      	  message.success('删除失败')
      	  yield put(action(HW_USER.DEL_BY_ID.FAILURE, { error: e }))
    	}
    } catch (e) {
      yield put(action(HW_USER.DEL_BY_ID.FAILURE, { error: e }))
    }
  }
}
function* searchHwUserInfo() {
  while (true) {
    try {
      const { data } = yield take(HW_USER.SEARCH_LIKE.REQUEST)
      let res = yield call(Api.request,Api.calcUrl(HW_USER.URL)+"/search?searchKey="+data.searchKey+"&searchMes="+data.searchMes, { method: 'GET' } )
      yield put(action(HW_USER.SEARCH_LIKE.SUCCESS, {data: res.data}))
    } catch (e) {
      yield put(action(HW_USER.SEARCH_LIKE.FAILURE, { error: e }))
    }
  }
}
function* watchHwUserFlow() {
  yield [
    fork(watchGetHwUserList),
    fork(watchAddHwUser),
    fork(watchDelHwUser),
    fork(watchGetHwUserById),
    fork(watchHwUserUpdate),
    fork(searchHwUserInfo)
  ]
}
addSaga(watchHwUserFlow);
export default watchHwUserFlow
