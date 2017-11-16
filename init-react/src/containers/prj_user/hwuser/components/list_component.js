import React, { PropTypes } from 'react'
import { Table, Input, Icon, Button, Popconfirm } from 'antd';
import {browserHistory} from 'react-router'
const HwUserListComponent = ({ hwUserList ,loading , onSelHandle ,onUpdateById,columns,onChange , pagination}) => {
  const list = (<Table rowKey={record => record.id}
    dataSource={hwUserList} columns={columns} onChange={onChange}
    pagination={pagination} />)
  const empty = (<div>暂时还没有用户信息</div>)
  return (
    <div>
      {hwUserList.length > 0 ? list : empty}
    </div>
  )
}
export default HwUserListComponent
