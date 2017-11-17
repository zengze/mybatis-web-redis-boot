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
let style = localStorage.getItem('style');
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
          openKeys: this.getDefaultCollapsedSubMenus(props),
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

    getDefaultCollapsedSubMenus(props) {
      const { location: { pathname } } = props;
      return [pathname.split('/').splice(0, 3).join('/')];
    }

    getCurrentMenuSelectedKeys() {
      const { location: { pathname } } = this.props;
      return [pathname];
    }

    handleOpenChange = (openKeys) => {
      const lastOpenKey = openKeys[openKeys.length - 1];
      this.setState({
        openKeys: [lastOpenKey],
      });
    }

    render() {
        const { collapsed, openKeys } = this.state;

        const menuList = this.props.data.map(item => {
          if(item.linkTo != '') {
            return (
              <SubMenu key={item.linkTo} style={{marginTop:"50px"}} title={<span>{item.icon && <Icon type={item.icon} />}<span>{item.menuName}</span></span>}>
              {
                item.subMenu.map(subMenuItem =>
                  <Menu.Item key={subMenuItem.linkTo}>
                    {subMenuItem.linkTo && <a href={"#" + subMenuItem.linkTo}>{subMenuItem.menuName}</a>}
                  </Menu.Item>
                )
              }
              </SubMenu>
            )
          }
        });

        // Don't show popup menu when it is been collapsed
        const menuProps = collapsed ? {} : {
          openKeys: openKeys,
        };

        return (
          <div>
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
                  {...menuProps}
                  onOpenChange={this.handleOpenChange}
                  selectedKeys={this.getCurrentMenuSelectedKeys()}
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
                </Header>
                <MyBreadcrumb routes={this.props.routes}/>
                <Content style={{ margin: '24px 24px 0', height: '100%' }}>
                  {this.props.children}
                </Content>
              </Layout>
            </Layout>
          </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        data: state.mainReduce.menuListData
    }
}

export default connect(mapStateToProps)(MainContainer);
