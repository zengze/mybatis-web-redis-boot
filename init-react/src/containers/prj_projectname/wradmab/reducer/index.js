import { NAVIGATE,REQUEST,SUCCESS,FAILURE } from '../../../../constants/BaseAction'
import {WR_ADMA_B} from '../actions'
import createReducer from '../../../../common/reducerUtilities'
import { fromJS } from 'immutable'
import { regReducer } from '../../../../store/regReducer.js'
const wrAdmaBListReducer = createReducer(fromJS({
      loading: false,
      data: [],
      error: '',
      param:{total:0},      
}), {
    [WR_ADMA_B.QUERY_LIST.REQUEST]: (state, action) => state.set('loading', true) ,
    [WR_ADMA_B.QUERY_LIST.SUCCESS]: (state, action) => state.set('data', action.data).set('param', action.param).set('loading',false),
    [WR_ADMA_B.QUERY_LIST.FAILURE]: (state, action) => state.set('error', action.error).set('loading',false),
    [WR_ADMA_B.DEL_BY_ID.REQUEST]: (state, action) => state.set('loading', true),
    [WR_ADMA_B.DEL_BY_ID.SUCCESS]: (state, action) => state.set('loading',false),
    [WR_ADMA_B.DEL_BY_ID.FAILURE]: (state, action) => state.set('error',action.error).set('loading',false),
    [WR_ADMA_B.CHANGE_STATE.REQUEST]: (state, action,...others) => {
      let newState = Object.assign({},state.toJS(),action.data);
      if(others && others.length > 0){
            //第二个参数为要删除的属性名数组            
            let deleteArray = others[0];
            for(var id of deleteArray)
            {
                delete newState[id];  
            }
      }
      return state.set(newState)
    },
    [WR_ADMA_B.CHANGE_STATE.SUCCESS]: (state, action) =>{return state;},
    [WR_ADMA_B.CHANGE_STATE.FAILURE]: (state, action) =>{return state;},
    
    [WR_ADMA_B.SEARCH_LIKE.REQUEST]: (state, action) => state.set('loading', true),
    [WR_ADMA_B.SEARCH_LIKE.SUCCESS]: (state, action) => state.set('data', action.data).set('loading',false),
    [WR_ADMA_B.SEARCH_LIKE.FAILURE]: (state, action) => state.set('error',action.error).set('loading',false),
})
const wrAdmaBAddReducer = createReducer(fromJS({
      loading: false,
      error: '',
}), {
    [WR_ADMA_B.ADD.REQUEST]: (state, action) => state.set('loading', true),
    [WR_ADMA_B.ADD.SUCCESS]: (state, action) => state.set('loading',false),
    [WR_ADMA_B.ADD.FAILURE]: (state, action) => state.set('error',action.error).set('loading',false),
})
const getWrAdmaBReducer = createReducer(fromJS({
      loading: false,
      error: '',
      obj:{}
}), {
      [WR_ADMA_B.GET_BY_ID.REQUEST]: (state, action) => state.set('loading', true) ,
      [WR_ADMA_B.GET_BY_ID.SUCCESS]: (state, action) => state.set('obj', action.obj).set('loading',false),
      [WR_ADMA_B.GET_BY_ID.FAILURE]: (state, action) => state.set('error', action.error).set('loading',false),
})
regReducer('wrAdmaBListReducer',wrAdmaBListReducer)
regReducer('wrAdmaBAddReducer', wrAdmaBAddReducer)
regReducer('getWrAdmaBReducer',getWrAdmaBReducer)
export  { wrAdmaBListReducer , wrAdmaBAddReducer , getWrAdmaBReducer }
