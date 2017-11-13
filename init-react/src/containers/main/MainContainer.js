import React, {PropTypes} from 'react';
import MenuComponent from './components/MenuComponent'
import MenuToggleComponent from './components/MenuToggleComponent'
import MyBreadcrumb from './components/MyBreadcrumb'
import SearchHeader from './components/SearchHeader'
import {Layout, Menu, Breadcrumb, Icon ,Select} from 'antd';
const Option = Select.Option;
import { connect } from 'react-redux'
import {mainAction} from './'
const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;
let style = localStorage.getItem('style')
if(style == 'green'){
  require('./green.less')
}else{
  require('./blue.less')
}
import immutable from 'immutable'




class MainContainer extends React.Component {

    constructor(props){
        super(props)
        this.state={
          activeIndex:0,
          active:0
        }
    }


    componentWillMount() {
        this.props.dispatch(mainAction.fetchMenuList())
    }

    handleClick =(index)=>{

       this.props.router.push(index)
      this.setState({
        activeIndex:index
      })
    }
    activeClick =(index)=>{
      this.setState({
        active:index
      })
    }

    logoutClick= () =>{

       this.props.dispatch(mainAction.logout())
    }

    handleChange =(value)=>{
      localStorage.setItem("style",value)
      window.location.reload()
    }
    changeStyle=(style)=>{
      localStorage.setItem("style",style)
      window.location.reload()
    }


    render() {
        const data = [ '管理系统', '实时监控', '设置', '帮助']

        return (
            <Layout>
                <div className="header" id="header">

                    <div className="header-left">

                      </div>
                      <div className="header-logout" onClick={this.logoutClick}><Icon type="logout" style={{marginRight:"15px",fontSize:"20px"}}/>退出</div>
                      <div className="header-list header-fixed">

                       <ul>

                         {
                           data.map((e,index)=>{
                             return (
                               <li key={index} className={index==this.state.active?'active':null} onClick={this.activeClick.bind(this,index)}><a href="#">{e}</a></li>
                             )
                           })
                         }




                       </ul>
                      </div>
                       <button className="header_hide_btn navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar top-bar"></span>
                        <span className="icon-bar middle-bar"></span>
                        <span className="icon-bar bottom-bar"></span>
                       </button>
                       <div className="collapse navbar-collapse" id="navbarNav">
                          <MenuToggleComponent
                            data={this.props.data}
                            routes={this.props.routes}
                            activeClassName={this.state.activeIndex}
                            handleClick={this.handleClick}
                            changeStyle = {this.changeStyle}
                          />

                       </div>


                </div>
                <Layout className="main">
                    <Sider className="main-left">
                      <MenuComponent data={this.props.data} routes={this.props.routes}   changeStyle = {this.changeStyle}/>
                    </Sider>



                    <Layout className="main-right">
                        <MyBreadcrumb routes={this.props.routes}/>

                        <Content style={{
                            // background: '#fff',
                            padding: 24,
                            margin: 0,
                            minHeight: 280
                        }}>

                            {this.props.children}

                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        data: state.mainReduce.menuListData
    }
}

export default connect(mapStateToProps)(MainContainer);
