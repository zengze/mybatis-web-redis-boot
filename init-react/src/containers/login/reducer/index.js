import {LOGIN} from '../actions'

const initialState = {
    loading: false,
    data: [],
    status: 'init'
}

const login = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN.REQUEST:
            return Object.assign({}, state, {
                loading: true,
                status: 'REQUEST'
            });
        case LOGIN.SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                data: action.data,
                status: 'SUCCESS'
            });
        default:
            return state;
    }
}

export default login;
