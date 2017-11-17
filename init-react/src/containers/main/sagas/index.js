import {take, put, call, fork, select, race, cancel} from 'redux-saga/effects'
import Api from '../../../constants/Api'
import {action,FETCH_MENU_LIST,LOGOUT} from '../../../constants/BaseAction'
import { addSaga } from '../../../store/rootSaga'
import TokenUtil from '../../../common/TokenUtil'
import { message } from 'antd'
import NavigatorAction from '../../../constants/NavigatorAction'

function* watchFetchMenuList () {

  while (true) {
    yield take(FETCH_MENU_LIST.REQUEST)
    try {
      let res = yield call(Api.request, Api.MENU_URL,)

      yield put(action(FETCH_MENU_LIST.SUCCESS, {data: res}))
    } catch (e) {
      yield put(action(FETCH_MENU_LIST.FAILURE, {error: e}))
    }
  }
}

function* watchLogout () {

  while (true) {
    yield take(LOGOUT.REQUEST)
    try{
        yield call(TokenUtil.delUserToken)
        yield put(action(LOGOUT.SUCCESS))
        location.href = '#/login'
        message.info(`退出成功`)

    }catch(e){
      yield put(action(LOGOUT.FAILURE))
    }




  }
}


function* watchMenu() {
  yield [
    fork(watchLogout),
    fork(watchFetchMenuList),

  ]
}
// addSaga(watchMenu);



export default watchMenu
