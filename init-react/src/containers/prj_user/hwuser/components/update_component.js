import React, {Component} from 'react';
import {connect} from 'react-redux'
import { Form, Input, Button, Checkbox ,AutoComplete ,Select,Icon } from 'antd';
import BaseComponent from '../../../../common/BaseComponent'
import { SearchableList} from '../../../../common/SearchableList'
import hwUserActions  from '../actions'
import hwRoleActions from '../../../prj_user/hwrole/actions'

const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 5 },
};
const formAuthorizationLayout = {
  labelCol: { span: 1 },
  wrapperCol: { span: 10 },
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 3 },
};
class HwUserUpdateComponent extends BaseComponent {
    constructor (props) {
        super(props)
        Object.assign(this.actions,hwUserActions)
    }
    handleSubmit = (e) => {
      e.preventDefault();
          this.props.form.validateFields((err, values) => {
          		if (!err) {
          			values.token = this.props.id
          			this.updateObj(values);
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
        return (
            <div>
              <Form layout='horizontal' onSubmit={this.handleSubmit}>
			      {this.input("用户名","username",this.props.data.username,true,formItemLayout)}
			      {this.input("密码","password",this.props.data.password,true,formItemLayout)}
			      {this.input("别名","alias",this.props.data.alias,false,formItemLayout)}
			      {this.input("备注","nt",this.props.data.nt,true,formItemLayout)}
			      {this.searchableList("角色","tokenOfRole",this.props.data.tokenOfRole,this.props.data.roleDesp,true,this.props.hwRoleList,this.autoSeacrchHwRole,formItemLayout,true)}
			      {this.searchableList("状态","state",this.props.data.state,"启用",true,[{token:"0",name:"禁用"},{token:"1",name:"启用"}],null,formItemLayout,false)}
				{this.submitForm("更新",formTailLayout)}
               </Form>
            </div>
        );
    }
}
const WrappedDynamicRule = Form.create()(HwUserUpdateComponent);
export default connect()(WrappedDynamicRule);
