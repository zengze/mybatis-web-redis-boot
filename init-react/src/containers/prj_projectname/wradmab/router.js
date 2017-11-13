import { Router , Route , browserHistory,IndexRoute,Redirect ,IndexRedirect} from 'react-router'
import { regRouter } from '../../../store/regRouter.js'
import React from 'react'
import * as self from './index'
var router = (key) => {
    return (<Route key={key} path="/prj_projectname/wradmab" breadcrumbName="[ 组织机构 ]管理" >
            <IndexRedirect to="/prj_projectname/wradmab/list" />
            <Route path="/prj_projectname/wradmab/list" breadcrumbName="[ 组织机构 ]列表" component={self.WrAdmaBListContainer} />
            <Route path="/prj_projectname/wradmab/add" breadcrumbName="添加[ 组织机构 ]" component={self.WrAdmaBAddContainer} />
            <Route path="/prj_projectname/wradmab/update/:id" breadcrumbName="更新[ 组织机构 ]" component={self.WrAdmaBUpdateContainer} />
          </Route>)
}
regRouter("prj_projectname_wradmab",router)
export default router
