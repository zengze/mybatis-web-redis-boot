import React, { PropTypes } from 'react'
import { Table, Input, Icon, Button, Popconfirm } from 'antd';
import {browserHistory} from 'react-router'
const HwRoleListComponent = ({ hwRoleList ,loading , onSelHandle ,onUpdateById,columns,onChange , pagination}) => {
  const list = (<Table rowKey={record => record.id}
    dataSource={hwRoleList} columns={columns} onChange={onChange}
    pagination={pagination} />)
  const empty = (<div>暂时还没有角色信息</div>)
  return (
    <div>
      {hwRoleList.length > 0 ? list : empty}
    </div>
  )
}
export default HwRoleListComponent
