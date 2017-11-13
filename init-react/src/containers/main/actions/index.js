import { action,FETCH_MENU_LIST ,LOGOUT } from '../../../constants/BaseAction'

const fetchMenuList = () => action(FETCH_MENU_LIST.REQUEST)
const logout = () => action(LOGOUT.REQUEST)

export { fetchMenuList , logout }
