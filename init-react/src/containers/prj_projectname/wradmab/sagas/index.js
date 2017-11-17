import {take, put, call, fork, select, race, cancel} from 'redux-saga/effects'
import { action,NAVIGATE,REQUEST,SUCCESS,FAILURE } from '../../../../constants/BaseAction'
import {WR_ADMA_B} from '../actions'
import Api from '../../../../constants/Api'
import { message } from 'antd'
import {hashHistory} from 'react-router'
import { addSaga } from '../../../../store/rootSaga'
import NavigatorAction from '../../../../constants/NavigatorAction'
function* watchGetWrAdmaBList () {
  while (true) {
    try {
      let { data } = yield take(WR_ADMA_B.QUERY_LIST.REQUEST)
      let res = yield call(Api.request, Api.calcUrl(WR_ADMA_B.URL+'/list') ,{ method: 'POST', body: data })
      yield put(action(WR_ADMA_B.QUERY_LIST.SUCCESS, {data: res.data,param:res.param}))
    } catch (e) {
      yield put(action(WR_ADMA_B.QUERY_LIST.FAILURE, {error: e}))
    }
  }
}
function* watchGetWrAdmaBById () {
  while (true) {
    try {
      const { id } = yield take(WR_ADMA_B.GET_BY_ID.REQUEST)
   	  let res = yield call(Api.request, Api.calcUrl(WR_ADMA_B.URL)+"/"+id)
      yield put(action(WR_ADMA_B.GET_BY_ID.SUCCESS, {obj: res.data}))
      hashHistory.push("/prj_projectname/wradmab/update/"+id)
    } catch (e) {
      yield put(action(WR_ADMA_B.GET_BY_ID.FAILURE, {error: e}))
    }
  }
}
function* watchAddWrAdmaB () {
  while (true) {
    try {
      const { obj } = yield take(WR_ADMA_B.ADD.REQUEST)
   	  let res = yield call(Api.request, Api.calcUrl(WR_ADMA_B.URL), { method: 'POST', body: obj } )
      if(res.code == 200){
   	  yield put(action(WR_ADMA_B.ADD.SUCCESS, {data: res.data}))
      message.success('添加成功')
      location.href = '#/prj_projectname/wradmab/list'
      }
      else
      {
      	  message.success('修改失败')
      	  yield put(action(ROLE.UPDATE.FAILURE))
      }
    } catch (e) {
      yield put(action(WR_ADMA_B.ADD.FAILURE, { error: e }))
    }
  }
}
function* watchWrAdmaBUpdate () {
  while (true) {
    try {
      const { obj } = yield take(WR_ADMA_B.UPDATE.REQUEST)
      let res = yield call(Api.request, Api.calcUrl(WR_ADMA_B.URL), { method: 'PUT', body: obj } )
      if(res.code == 200){
      	  yield put(action(WR_ADMA_B.UPDATE.SUCCESS, {data: res}))
          location.href = '#/prj_projectname/wradmab/list'
          message.success('修改成功')
      }
      else
      {
      	  message.success('修改失败')
      	  yield put(action(ROLE.UPDATE.FAILURE))
      }
    } catch (e) {
      yield put(action(WR_ADMA_B.UPDATE.FAILURE, {error:e}))
    }
  }
}
function* watchDelWrAdmaB() {
  while (true) {
    try {
		const newState = yield select();
		let param = yield take(WR_ADMA_B.DEL_BY_ID.REQUEST)
		let listParam = param[0]
    	let res = yield call(Api.request, Api.calcUrl(WR_ADMA_B.URL) + "/" + param['id'], { method: 'DELETE' } )
    	if(res.code == 200){
    		yield put(action(WR_ADMA_B.DEL_BY_ID.SUCCESS))
    		message.success('删除成功')
    		yield put(action(WR_ADMA_B.QUERY_LIST.REQUEST,{data:listParam}))
    	}
    	else
    	{
      	  message.success('删除失败')
      	  yield put(action(WR_ADMA_B.DEL_BY_ID.FAILURE, { error: e }))
    	}
    } catch (e) {
      yield put(action(WR_ADMA_B.DEL_BY_ID.FAILURE, { error: e }))
    }
  }
}
function* searchWrAdmaBInfo() {
  while (true) {
    try {
      const { data } = yield take(WR_ADMA_B.SEARCH_LIKE.REQUEST)
      let res = yield call(Api.request,Api.calcUrl(WR_ADMA_B.URL)+"/search?searchKey="+data.searchKey+"&searchMes="+data.searchMes, { method: 'GET' } )
      yield put(action(WR_ADMA_B.SEARCH_LIKE.SUCCESS, {data: res.data}))
    } catch (e) {
      yield put(action(WR_ADMA_B.SEARCH_LIKE.FAILURE, { error: e }))
    }
  }
}
function* watchWrAdmaBFlow() {
  yield [
    fork(watchGetWrAdmaBList),
    fork(watchAddWrAdmaB),
    fork(watchDelWrAdmaB),
    fork(watchGetWrAdmaBById),
    fork(watchWrAdmaBUpdate),
    fork(searchWrAdmaBInfo)
  ]
}
addSaga(watchWrAdmaBFlow);
export default watchWrAdmaBFlow
