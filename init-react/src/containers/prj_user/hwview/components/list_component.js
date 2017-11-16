import React, { PropTypes } from 'react'
import { Table, Input, Icon, Button, Popconfirm } from 'antd';
import {browserHistory} from 'react-router'
const HwViewListComponent = ({ hwViewList ,loading , onSelHandle ,onUpdateById,columns,onChange , pagination}) => {
  const list = (<Table rowKey={record => record.id}
    dataSource={hwViewList} columns={columns} onChange={onChange}
    pagination={pagination} />)
  const empty = (<div>暂时还没有视图信息</div>)
  return (
    <div>
      {hwViewList.length > 0 ? list : empty}
    </div>
  )
}
export default HwViewListComponent
