import { FETCH_MENU_LIST ,LOGOUT } from '../../../constants/BaseAction'

const initialState = {
    menuListData : [],
    loading : false,
    error : ''
}

const mainReducer = (state = initialState, action) => {
    switch (action.type) {

        case FETCH_MENU_LIST.REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case FETCH_MENU_LIST.SUCCESS:
            return Object.assign({}, state, {
                menuListData : action.data,
                loading : false ,
                error : ''
            });
        case FETCH_MENU_LIST.FAILURE:
            return Object.assign({}, state, {
                loading : false ,
                error : ''
            });
        case LOGOUT.REQUEST:
            return Object.assign({}, state, {
                loading : true ,
                error : ''
            });
        case LOGOUT.SUCCESS:
            return Object.assign({}, state, {
                loading : false ,
                error : ''
              });
        case LOGOUT.FAILURE:
            return Object.assign({}, state, {
                loading : false ,
                error : ''
            });

        default:
            return state;


    }
}


export default mainReducer;
