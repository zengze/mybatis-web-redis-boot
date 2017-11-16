import React, {Component} from 'react';
import { Form, Input, Button, Checkbox ,AutoComplete ,Select,Icon } from 'antd';
import {connect} from 'react-redux'
import BaseComponent from '../../../../common/BaseComponent'
import { SearchableList} from '../../../../common/SearchableList'
import hwUserActions  from '../actions'
import hwRoleActions from '../../../prj_user/hwrole/actions'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 5 },
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 3 },
};
class HwUserAddComponent extends BaseComponent {
    constructor (props) {
        super(props)
        Object.assign(this.actions,hwUserActions)
    }
    state = {
        loging:false,
         isMorePower:true
    }
    handleSubmit = (e) => {
      e.preventDefault();
          this.props.form.validateFields((err, values) => {
          		if (!err) {
          			this.addObj(values)
          		}
          });
    }
    componentWillMount() {
    	const listParam = {
				current : "0",
				pageSize : "10",
				field : "",
				keywords:"",
				order:"",
				columnKey:""
		  }

		this.props.dispatch(hwRoleActions.getObjList(this.getQueryParams(listParam)))

    	}


	autoSeacrchHwRole = (token) => {
    	const listParam = {
				current : "0",
				pageSize : "10",
				field : "",
				keywords:"",
				order:"",
				columnKey:""
		  }
	this.props.dispatch(hwRoleActions.getObjList(this.getQueryParams(listParam)))
	}
    render() {

        const { data:hwRoleList,loading:hwRoleListLoading } = this.props.hwRoleListReducer

        return (
            <div>
              <Form layout='horizontal' onSubmit={this.handleSubmit}>
			      {this.input("用户名","username",null,true,formItemLayout)}
			      {this.input("密码","password",null,true,formItemLayout)}
			      {this.input("别名","alias",null,false,formItemLayout)}
			      {this.input("备注","nt",null,true,formItemLayout)}
			      {this.searchableList("角色","tokenOfRole",null,null,true,hwRoleList,this.autoSeacrchHwRole,formItemLayout,true)}
			      {this.searchableList("状态","state",null,null,true,[{token:"0",name:"禁用"},{token:"1",name:"启用"}],null,formItemLayout,false)}
				{this.submitForm("添加",formTailLayout)}
               </Form>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
  return  {

        hwRoleListReducer : state.hwRoleListReducer.toJS()

   }
}
const WrappedDynamicRule = Form.create()(HwUserAddComponent);
export default connect(mapStateToProps)(WrappedDynamicRule);
