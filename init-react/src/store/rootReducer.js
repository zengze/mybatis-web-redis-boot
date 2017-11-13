import {combineReducers} from 'redux';
import {loginReduce} from '../containers/login'
import {mainReduce} from '../containers/main'
import { regReducer,reducerList } from './regReducer'
regReducer('mainReduce',mainReduce)
regReducer('loginReduce',loginReduce)
const rootReducer = combineReducers(reducerList);
export default rootReducer;
