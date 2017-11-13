import React, {PropTypes} from 'react'
import {Menu, Icon,Select} from 'antd'
const Option = Select.Option;
import {Link} from 'react-router'
import navigatorAction from '../../../constants/NavigatorAction'
import cs from 'classnames'//引入classnames依赖库
const addClass2 = true
const {SubMenu} = Menu;

const MenuToggleComponent = ({data, routes,handleClick,activeClassName,changeStyle}) => {

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
    const menuList = data.map(item => {

        return (

            <SubMenu key={item.menuId} style={{marginTop:"50px"}} title={<span className="subMenu-name">{item.menuName} </span>}>
              {item.subMenu.map(subMenuItem =>
                <Menu.Item
                  key={subMenuItem.menuId}

                  >

                      {subMenuItem.linkTo && <span style={{display:"block"}} onClick={()=>handleClick(subMenuItem.linkTo)}
                       data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"  >{subMenuItem.menuName}</span>}
                      {subMenuItem.linkToFunction && <span style={{display:"block"}} onClick={()=>eval(subMenuItem.linkToFunction)}
                        data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" >{subMenuItem.menuName}</span>}
                </Menu.Item>
              )}
             </SubMenu>





        )
    })
    return (

      <Menu
          // onClick={(item) => dispatch(navigatorAction('list'))}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={defaultOpenKeys().selectedKeys}
          defaultOpenKeys={defaultOpenKeys().openKeys}
         >
          {menuList}
      </Menu>
    )
}

export default MenuToggleComponent
