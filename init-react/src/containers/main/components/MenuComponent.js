import React, {PropTypes} from 'react'
import {Menu, Icon} from 'antd'
import {Link} from 'react-router'
import navigatorAction from '../../../constants/NavigatorAction'
const {SubMenu} = Menu;

const MenuComponent = ({data, routes,changeStyle}) => {
    const defaultOpenKeys = () => {
        let menuObj = {};
        let fullPath = routes[ routes.length - 1 ].path;
        if(fullPath) {
            let pathArr = fullPath.split('/')
            let a = pathArr.slice(0,pathArr.length - 1)
            menuObj.openKeys = a ;
            menuObj.selectedKeys = [pathArr[pathArr.length - 1]]
        }
        return menuObj;
    }
    const about = () => {
      alert('about')
    }
    const menuList = data.map(item => {

        return (
            <SubMenu key={item.menuId} style={{marginTop:"50px"}} title={<span className="subMenu-name">{item.icon && <Icon type={item.icon} />}{item.menuName}</span>}>
            {
                item.subMenu.map(subMenuItem =>
                    <Menu.Item key={subMenuItem.menuId}>
                       {subMenuItem.icon && <Icon type={subMenuItem.icon} />}
                       {subMenuItem.linkTo && <Link to={subMenuItem.linkTo} style={{float:"right"}}>{subMenuItem.menuName}</Link>}
                       {subMenuItem.linkToFunction && <span onClick={()=>eval(subMenuItem.linkToFunction)} style={{float:"right"}}>{subMenuItem.menuName}</span>}
                    </Menu.Item>)
            }
            </SubMenu>
        )
    })
    return (
        <Menu
            // onClick={(item) => dispatch(navigatorAction('list'))}
            theme="light"
            mode="inline"
            defaultSelectedKeys={defaultOpenKeys().selectedKeys}
            defaultOpenKeys={defaultOpenKeys().openKeys}
            style={{
            height: '100%'
        }}>
            {menuList}


        </Menu>
    )
}

export default MenuComponent
