import { NAVIGATE,REQUEST,SUCCESS,FAILURE } from '../../../../constants/BaseAction'
import {HW_ROLE} from '../actions'
import createReducer from '../../../../common/reducerUtilities'
import { fromJS } from 'immutable'
import { regReducer } from '../../../../store/regReducer.js'
const hwRoleListReducer = createReducer(fromJS({
      loading: false,
      data: [],
      error: '',
      param:{total:0},      
}), {
    [HW_ROLE.QUERY_LIST.REQUEST]: (state, action) => state.set('loading', true) ,
    [HW_ROLE.QUERY_LIST.SUCCESS]: (state, action) => state.set('data', action.data).set('param', action.param).set('loading',false),
    [HW_ROLE.QUERY_LIST.FAILURE]: (state, action) => state.set('error', action.error).set('loading',false),
    [HW_ROLE.DEL_BY_ID.REQUEST]: (state, action) => state.set('loading', true),
    [HW_ROLE.DEL_BY_ID.SUCCESS]: (state, action) => state.set('loading',false),
    [HW_ROLE.DEL_BY_ID.FAILURE]: (state, action) => state.set('error',action.error).set('loading',false),
    [HW_ROLE.CHANGE_STATE.REQUEST]: (state, action,...others) => {
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
    [HW_ROLE.CHANGE_STATE.SUCCESS]: (state, action) =>{return state;},
    [HW_ROLE.CHANGE_STATE.FAILURE]: (state, action) =>{return state;},
    
    [HW_ROLE.SEARCH_LIKE.REQUEST]: (state, action) => state.set('loading', true),
    [HW_ROLE.SEARCH_LIKE.SUCCESS]: (state, action) => state.set('data', action.data).set('loading',false),
    [HW_ROLE.SEARCH_LIKE.FAILURE]: (state, action) => state.set('error',action.error).set('loading',false),
})
const hwRoleAddReducer = createReducer(fromJS({
      loading: false,
      error: '',
}), {
    [HW_ROLE.ADD.REQUEST]: (state, action) => state.set('loading', true),
    [HW_ROLE.ADD.SUCCESS]: (state, action) => state.set('loading',false),
    [HW_ROLE.ADD.FAILURE]: (state, action) => state.set('error',action.error).set('loading',false),
})
const getHwRoleReducer = createReducer(fromJS({
      loading: false,
      error: '',
      obj:{}
}), {
      [HW_ROLE.GET_BY_ID.REQUEST]: (state, action) => state.set('loading', true) ,
      [HW_ROLE.GET_BY_ID.SUCCESS]: (state, action) => state.set('obj', action.obj).set('loading',false),
      [HW_ROLE.GET_BY_ID.FAILURE]: (state, action) => state.set('error', action.error).set('loading',false),
})
regReducer('hwRoleListReducer',hwRoleListReducer)
regReducer('hwRoleAddReducer', hwRoleAddReducer)
regReducer('getHwRoleReducer',getHwRoleReducer)
export  { hwRoleListReducer , hwRoleAddReducer , getHwRoleReducer }
