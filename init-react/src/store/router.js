import { Router , Route ,hashHistory, browserHistory,IndexRoute,Redirect ,IndexRedirect} from 'react-router'
import React from 'react'
import { routerList } from './allRouter'
import { breadcrumbName } from 'antd'
import LoginContainer from '../containers/login'
import MainContainer , {  Welcome } from '../containers/main'
import SecurityUtil from '../common/TokenUtil'

//import * as hwuser from '../containers/prj_user/hwuser'
//import * as hwrole from '../containers/prj_user/hwrole'
//import hwuserRouter from '../containers/prj_user/hwuser/router'
//import hwroleRouter from '../containers/prj_user/hwrole/router'
//import hwmodelRouter from '../containers/prj_user/hwmodel/router'
//import hwviewRouter from '../containers/prj_user/hwview/router'
//import wradmabRouter from '../containers/prj_projectname/wradmab/router'



 export default class RouteConfig extends React.Component{
   checkToken = (nextState , replace) => {
      if(!SecurityUtil.isExistToken()){
        replace('/login');
      }
    }

   render(){
    return (
      <Router history={hashHistory}>
           <Route path="/login" component={LoginContainer} />
           <Route path="/" breadcrumbName="主页"
              onEnter={(nextState,replace) => this.checkToken(nextState , replace)}
              onChange={(preState,nextState,replace) => this.checkToken(nextState , replace)}
              component={MainContainer}>
             <IndexRoute component={Welcome} breadcrumbName='欢迎' />
             {
                 routerList.map((route,index) => {
                    return route(index)
                  })

             }
           </Route>
       </Router>
     )
   }
 }
