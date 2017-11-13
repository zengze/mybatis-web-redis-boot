import React, { PropTypes } from 'react'
import { Table, Input, Icon, Button, Popconfirm } from 'antd';
import {browserHistory} from 'react-router'
const HwModelListComponent = ({ hwModelList ,loading , onSelHandle ,onUpdateById,columns,onChange , pagination}) => {
  const list = (<Table rowKey={record => record.id} title={() => '配置'}
    dataSource={hwModelList} columns={columns} onChange={onChange}
    pagination={pagination} size="middle"  className="table-striped" />)
  const empty = (<div>暂时还没有配置信息</div>)
  return (
    <div>
      {hwModelList.length > 0 ? list : empty}
    </div>
  )
}
export default HwModelListComponent
