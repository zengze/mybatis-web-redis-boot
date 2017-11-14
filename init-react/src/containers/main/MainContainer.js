import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

import {Layout, Menu, Breadcrumb, Icon ,Select} from 'antd';
const Option = Select.Option;
const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

import {mainAction} from './';
import MenuComponent from './components/MenuComponent';
import MenuToggleComponent from './components/MenuToggleComponent';
import MyBreadcrumb from './components/MyBreadcrumb';
import SearchHeader from './components/SearchHeader';

import './Main.less';
let style = localStorage.getItem('style')
if(style == 'green'){
  require('./green.less')
}else{
  require('./blue.less')
}

class MainContainer extends React.Component {

    constructor(props){
        super(props)
        this.state={
          active:0,
          collapsed: false,
        }
    }

    componentWillMount() {
        this.props.dispatch(mainAction.fetchMenuList())
    }

    activeClick =(index)=>{
      this.setState({
        active:index
      })
    }

    logoutClick= () =>{
      this.props.dispatch(mainAction.logout())
    }

    toggle = () => {
      this.setState({
        collapsed: !this.state.collapsed,
      });
    }

    render() {
        const data = [ '管理系统', '实时监控', '设置', '帮助'];
        const { collapsed } = this.state;

        const menuList = this.props.data.map(item => {

          return (
            <SubMenu key={item.menuId} style={{marginTop:"50px"}} title={<span>{item.icon && <Icon type={item.icon} />}<span>{item.menuName}</span></span>}>
            {
              item.subMenu.map(subMenuItem =>
                <Menu.Item key={subMenuItem.menuId}>
                  {subMenuItem.linkTo && <a href={subMenuItem.linkTo}>{subMenuItem.menuName}</a>}
                </Menu.Item>)
            }
            </SubMenu>
          )
        });

        return (
            <Layout>
                <Layout>
                  <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    width={256}
                    className="layout-sider"
                  >
                    <div className="layout-logo">
                      <a href="">
                        <img src="https://gw.alipayobjects.com/zos/rmsportal/iwWyPinUoseUxIAeElSx.svg" alt="logo" />
                        <span>爱美斯国际物流</span>
                      </a>
                    </div>
                    <Menu
                      theme="dark"
                      mode="inline"
                      style={{ margin: '16px 0', width: '100%' }}
                    >
                      {menuList}
                    </Menu>
                  </Sider>
                  <Layout>
                    <Header className="layout-header">
                      <Icon
                        className="layout-trigger"
                        type={collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.toggle}
                      />
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
                    </Header>
                    <MyBreadcrumb routes={this.props.routes}/>
                    <Content style={{ margin: '24px 24px 0', height: '100%' }}>
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
