import { Router , Route , browserHistory,IndexRoute,Redirect ,IndexRedirect} from 'react-router'
import { regRouter } from '../../../store/regRouter.js'
import React from 'react'
import * as self from './index'
var router = (key) => {
    return (<Route key={key} path="/prj_user/hwuser" breadcrumbName="用户管理" >
            <IndexRedirect to="/prj_user/hwuser/list" />
            <Route path="/prj_user/hwuser/list" breadcrumbName="用户列表" component={self.HwUserListContainer} />
            <Route path="/prj_user/hwuser/add" breadcrumbName="添加用户" component={self.HwUserAddContainer} />
            <Route path="/prj_user/hwuser/update/:id" breadcrumbName="更新用户" component={self.HwUserUpdateContainer} />
          </Route>)
}
regRouter("prj_user_hwuser",router)
export default router
