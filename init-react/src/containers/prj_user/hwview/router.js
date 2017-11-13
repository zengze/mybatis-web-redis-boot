import { Router , Route , browserHistory,IndexRoute,Redirect ,IndexRedirect} from 'react-router'
import { regRouter } from '../../../store/regRouter.js'
import React from 'react'
import * as self from './index'
var router = (key) => {
    return (<Route key={key} path="/prj_user/hwview" breadcrumbName="视图管理" >
            <IndexRedirect to="/prj_user/hwview/list" />
            <Route path="/prj_user/hwview/list" breadcrumbName="视图列表" component={self.HwViewListContainer} />
            <Route path="/prj_user/hwview/add" breadcrumbName="添加视图" component={self.HwViewAddContainer} />
            <Route path="/prj_user/hwview/update/:id" breadcrumbName="更新视图" component={self.HwViewUpdateContainer} />
          </Route>)
}
regRouter("prj_user_hwview",router)
export default router
