import React, {Component} from 'react';
import { Form, Input, Button, Checkbox ,AutoComplete ,Select,Icon } from 'antd';
import {connect} from 'react-redux'
import BaseComponent from '../../../../common/BaseComponent'
import { SearchableList} from '../../../../common/SearchableList'
import hwViewActions  from '../actions'
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
class HwViewAddComponent extends BaseComponent {
    constructor (props) {
        super(props)
        Object.assign(this.actions,hwViewActions)
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
			      {this.input("名称","name",null,true,formItemLayout)}
			      {this.searchableList("角色","tokenOfRole",null,null,true,hwRoleList,this.autoSeacrchHwRole,formItemLayout,true)}
			      {this.input("模块","module",null,true,formItemLayout)}
			      {this.input("内容","json",null,true,formItemLayout)}
			      {this.input("备注","nt",null,true,formItemLayout)}
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
const WrappedDynamicRule = Form.create()(HwViewAddComponent);
export default connect(mapStateToProps)(WrappedDynamicRule);
