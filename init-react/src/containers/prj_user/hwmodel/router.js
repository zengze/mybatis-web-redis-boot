import { Router , Route , browserHistory,IndexRoute,Redirect ,IndexRedirect} from 'react-router'
import { regRouter } from '../../../store/regRouter.js'
import React from 'react'
import * as self from './index'
var router = (key) => {
    return (<Route key={key} path="/prj_user/hwmodel" breadcrumbName="配置管理" >
            <IndexRedirect to="/prj_user/hwmodel/list" />
            <Route path="/prj_user/hwmodel/list" breadcrumbName="配置列表" component={self.HwModelListContainer} />
            <Route path="/prj_user/hwmodel/add" breadcrumbName="添加配置" component={self.HwModelAddContainer} />
            <Route path="/prj_user/hwmodel/update/:id" breadcrumbName="更新配置" component={self.HwModelUpdateContainer} />
          </Route>)
}
regRouter("prj_user_hwmodel",router)
export default router
