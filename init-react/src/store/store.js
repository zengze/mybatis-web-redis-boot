import {createStore, combineReducers, applyMiddleware,compose} from 'redux';
import createSagaMiddleware from 'redux-saga'
import rootReducer from './rootReducer';
import rootSaga from './rootSaga'
import {createLogger} from 'redux-logger';

//创建一个 Redux store 来以存放应用中所有的 state，应用中应有且仅有一个 store。

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer,{}, compose(applyMiddleware(sagaMiddleware,
    // createLogger()
)))

sagaMiddleware.run(rootSaga); /* 将我们的 sagas 插入到这个中间件 */

export default store;
