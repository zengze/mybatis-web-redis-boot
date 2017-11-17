import {take, put, call, fork, select, race, cancel} from 'redux-saga/effects'
import { action,NAVIGATE,REQUEST,SUCCESS,FAILURE } from '../../../../constants/BaseAction'
import {HW_ROLE} from '../actions'
import Api from '../../../../constants/Api'
import { message } from 'antd'
import {hashHistory} from 'react-router'
import { addSaga } from '../../../../store/rootSaga'
import NavigatorAction from '../../../../constants/NavigatorAction'
function* watchGetHwRoleList () {
  while (true) {
    try {
      let { data } = yield take(HW_ROLE.QUERY_LIST.REQUEST)
      let res = yield call(Api.request, Api.calcUrl(HW_ROLE.URL+'/list') ,{ method: 'POST', body: data })
      yield put(action(HW_ROLE.QUERY_LIST.SUCCESS, {data: res.data,param:res.param}))
    } catch (e) {
      yield put(action(HW_ROLE.QUERY_LIST.FAILURE, {error: e}))
    }
  }
}
function* watchGetHwRoleById () {
  while (true) {
    try {
      const { id } = yield take(HW_ROLE.GET_BY_ID.REQUEST)
   	  let res = yield call(Api.request, Api.calcUrl(HW_ROLE.URL)+"/"+id)
      yield put(action(HW_ROLE.GET_BY_ID.SUCCESS, {obj: res.data}))
      hashHistory.push("/prj_user/hwrole/update/"+id)
    } catch (e) {
      yield put(action(HW_ROLE.GET_BY_ID.FAILURE, {error: e}))
    }
  }
}
function* watchAddHwRole () {
  while (true) {
    try {
      const { obj } = yield take(HW_ROLE.ADD.REQUEST)
   	  let res = yield call(Api.request, Api.calcUrl(HW_ROLE.URL), { method: 'POST', body: obj } )
      if(res.code == 200){
   	  yield put(action(HW_ROLE.ADD.SUCCESS, {data: res.data}))
      message.success('添加成功')
      location.href = '#/prj_user/hwrole/list'
      }
      else
      {
      	  message.success('修改失败')
      	  yield put(action(ROLE.UPDATE.FAILURE))
      }
    } catch (e) {
      yield put(action(HW_ROLE.ADD.FAILURE, { error: e }))
    }
  }
}
function* watchHwRoleUpdate () {
  while (true) {
    try {
      const { obj } = yield take(HW_ROLE.UPDATE.REQUEST)
      let res = yield call(Api.request, Api.calcUrl(HW_ROLE.URL), { method: 'PUT', body: obj } )
      if(res.code == 200){
      	  yield put(action(HW_ROLE.UPDATE.SUCCESS, {data: res}))
          location.href = '#/prj_user/hwrole/list'
          message.success('修改成功')
      }
      else
      {
      	  message.success('修改失败')
      	  yield put(action(ROLE.UPDATE.FAILURE))
      }
    } catch (e) {
      yield put(action(HW_ROLE.UPDATE.FAILURE, {error:e}))
    }
  }
}
function* watchDelHwRole() {
  while (true) {
    try {
		const newState = yield select();
		let param = yield take(HW_ROLE.DEL_BY_ID.REQUEST)
		let listParam = param[0]
    	let res = yield call(Api.request, Api.calcUrl(HW_ROLE.URL) + "/" + param['id'], { method: 'DELETE' } )
    	if(res.code == 200){
    		yield put(action(HW_ROLE.DEL_BY_ID.SUCCESS))
    		message.success('删除成功')
    		yield put(action(HW_ROLE.QUERY_LIST.REQUEST,{data:listParam}))
    	}
    	else
    	{
      	  message.success('删除失败')
      	  yield put(action(HW_ROLE.DEL_BY_ID.FAILURE, { error: e }))
    	}
    } catch (e) {
      yield put(action(HW_ROLE.DEL_BY_ID.FAILURE, { error: e }))
    }
  }
}
function* searchHwRoleInfo() {
  while (true) {
    try {
      const { data } = yield take(HW_ROLE.SEARCH_LIKE.REQUEST)
      let res = yield call(Api.request,Api.calcUrl(HW_ROLE.URL)+"/search?searchKey="+data.searchKey+"&searchMes="+data.searchMes, { method: 'GET' } )
      yield put(action(HW_ROLE.SEARCH_LIKE.SUCCESS, {data: res.data}))
    } catch (e) {
      yield put(action(HW_ROLE.SEARCH_LIKE.FAILURE, { error: e }))
    }
  }
}
function* watchHwRoleFlow() {
  yield [
    fork(watchGetHwRoleList),
    fork(watchAddHwRole),
    fork(watchDelHwRole),
    fork(watchGetHwRoleById),
    fork(watchHwRoleUpdate),
    fork(searchHwRoleInfo)
  ]
}
addSaga(watchHwRoleFlow);
export default watchHwRoleFlow
