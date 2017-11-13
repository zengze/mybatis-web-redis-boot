import {action,createRequestTypes,REQUEST,SUCCESS,FAILURE } from '../../../constants/BaseAction'
export const LOGIN_URL = 'prj_user/login';
export const LOGIN = createRequestTypes('LOGIN');

const login = (userName,password) => {
  return action(LOGIN.REQUEST,{userName,password})
}

export { login }
