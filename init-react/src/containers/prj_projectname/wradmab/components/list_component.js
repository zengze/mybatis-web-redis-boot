import React, { PropTypes } from 'react'
import { Table, Input, Icon, Button, Popconfirm } from 'antd';
import {browserHistory} from 'react-router'
const WrAdmaBListComponent = ({ wrAdmaBList ,loading , onSelHandle ,onUpdateById,columns,onChange , pagination}) => {
  const list = (<Table rowKey={record => record.id}
    dataSource={wrAdmaBList} columns={columns} onChange={onChange}
    pagination={pagination} />)
  const empty = (<div>暂时还没有[ 组织机构 ]信息</div>)
  return (
    <div>
      {wrAdmaBList.length > 0 ? list : empty}
    </div>
  )
}
export default WrAdmaBListComponent
