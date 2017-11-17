import {take, put, call, fork, select, race, cancel} from 'redux-saga/effects'
import Api from '../../../constants/Api'
import TokenUtil from '../../../common/TokenUtil'
import NavigatorAction from '../../../constants/NavigatorAction'
import {action,NAVIGATE} from '../../../constants/BaseAction'
import {LOGIN,LOGIN_URL} from '../actions'
import { message } from 'antd'

    const dealy = (ms = 3000) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject('连接超时');
            }, ms)
        })
    }

function* authorize ( userName , password ){
  try {
    const { res , timeout } = yield race({
      res:  call(fetch , API.URL + '/prj_user/login/LOGIN.json'),
      timeout : call(dealy)
    })
    if(res.ok) {
      yield put({type: LOGIN.SUCCESS ,data: res.json()})
      yield put({type: NAVIGATE , pathname : '/'})
    } else {
      yield put({type:LOGIN.FAILURE,error:'加载出错'})
    }
  } catch (e) {
    yield put({type:LOGIN.FAILURE,error:'加载超时'})
  }
}

function* loginFlow() {
    while (true) {
          const {userName , password} = yield take(LOGIN.REQUEST)
          // const task = yield fork(authorize, userName, password)
           try {
             const res = yield call(Api.request,Api.calcUrl(LOGIN_URL),{body:{ username:userName,password },method:'POST'})
             if(res.code == 200 ){
               yield call(TokenUtil.setUserToken,res.data)
               message.info(`欢迎用户：${userName}`)
               yield put(action(LOGIN.SUCCESS))
               location.href = '#/'
             }
           }catch(e){
             console.log(e)
            //  message.error(`登录失败：${res.msg}`)
            //  yield put(action(LOGIN.FAILURE,{error : res.msg}))
           }



    }
}

export default loginFlow
