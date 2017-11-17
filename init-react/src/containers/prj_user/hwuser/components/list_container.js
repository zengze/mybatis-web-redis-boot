import React , {Component} from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button, AutoComplete ,Select,Icon } from 'antd';
import HwUserListComponent from './list_component'
import { NAVIGATE } from '../../../../constants/BaseAction'
import hwUserActions,{HW_USER} from '../actions'
import SearchHeader  from  '../../../main/components/SearchHeader'
import ObjectFields from '../structure'
import BaseComponent from '../../../../common/BaseComponent'
import NavigatorAction from '../../../../constants/NavigatorAction'
class HwUserListContainer extends BaseComponent {
    constructor (props) {
        super(props)
        Object.assign(this.actions,hwUserActions)
		this.state={
				listParam:{
				current : "0",
				pageSize : "10",
				field : "",
				keywords:"",
				order:"",
				columnKey:""
			  }
			}
    }
    componentWillMount() {
      this.getObjList(this.getQueryParams(this.state.listParam))
    }
    add = () => {
  		location.href = '#/'+HW_USER.URL+'/add'
  	}
    reload = () => {
	   const listParam = {
				current : "0",
				pageSize : "10",
				field : "",
				keywords:"",
				order:"",
				columnKey:""
		  }

		this.getObjList(this.getQueryParams(listParam));
	}
    onChange = (pagination, filters, sorter) =>{
        let values = Object.assign({},this.state.listParam,sorter?{order:sorter.order,columnKey:sorter.columnKey}:undefined)
        Object.assign(values,pagination);
        this.setState({listParam:values});
        let listParam = this.getQueryParams(values);
        this.getObjList(listParam)
    }
 render() {
        const { hwUserListReducer } = this.props;
        let pagination ={
        total: hwUserListReducer.param.total, //数据总数量
        pageSize: 10,  //显示几条一页
      }
        return (
          <div>
            <SearchHeader search={this.onChange} add={this.add} reload={this.reload} columns={this.filter4Search(ObjectFields)}/>
            <HwUserListComponent hwUserList={hwUserListReducer.data} loading={hwUserListReducer.loading} columns={this.addUpdateDelBnts(this.filter4List(ObjectFields))}
              onChange={this.onChange} pagination={pagination} />
          </div>
      );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        hwUserListReducer : state.hwUserListReducer.toJS()
    }
}
export default connect(mapStateToProps)(HwUserListContainer)
