import { Router , Route , browserHistory,IndexRoute,Redirect ,IndexRedirect} from 'react-router'
import { regRouter } from '../../../store/regRouter.js'
import React from 'react'
import * as self from './index'
var router = (key) => {
    return (<Route key={key} path="/prj_user/hwrole" breadcrumbName="角色管理" >
            <IndexRedirect to="/prj_user/hwrole/list" />
            <Route path="/prj_user/hwrole/list" breadcrumbName="角色列表" component={self.HwRoleListContainer} />
            <Route path="/prj_user/hwrole/add" breadcrumbName="添加角色" component={self.HwRoleAddContainer} />
            <Route path="/prj_user/hwrole/update/:id" breadcrumbName="更新角色" component={self.HwRoleUpdateContainer} />
          </Route>)
}
regRouter("prj_user_hwrole",router)
export default router
