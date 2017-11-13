import {take, put, call, fork, select} from 'redux-saga/effects'
import {loginFlow} from '../containers/login'
import {browserHistory} from 'react-router'
import {NAVIGATE} from '../constants/BaseAction'
import {mainFlow} from '../containers/main'

//import {userFlow} from '../containers/user'
//import {roleFlow} from '../containers/role'


let sagaList = new Array();
export function addSaga(saga){
	sagaList.push(saga)
	//console.log(sagaList,'sagaList');
}


function * watchAndLog() {
    while (true) {
        const action = yield take('*');
        const newState = yield select();
    }
}

function * watchNavigate() {
    while (true) {
        const {pathname,params} = yield take(NAVIGATE)
        yield browserHistory.push(pathname)
    }
}

export default function * root() {
	sagaList.push(watchNavigate)
	sagaList.push(loginFlow)
	sagaList.push(mainFlow)
	let forks = new Array();
	for(let i = 0 ; i < sagaList.length;i++)
	forks.push(fork(sagaList[i]));
    yield * forks;
}
