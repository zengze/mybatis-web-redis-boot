import React, {Component} from 'react';
import {connect} from 'react-redux'
import { Form, Input, Button, Checkbox ,AutoComplete ,Select,Icon } from 'antd';
import BaseComponent from '../../../../common/BaseComponent'
import { SearchableList} from '../../../../common/SearchableList'
import hwRoleActions  from '../actions'
import hwModelActions from '../../../prj_user/hwmodel/actions'

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
class HwRoleUpdateComponent extends BaseComponent {
    constructor (props) {
        super(props)
        Object.assign(this.actions,hwRoleActions)
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

		this.props.dispatch(hwModelActions.getObjList(this.getQueryParams(listParam)))

    	}


	autoSeacrchHwModel = (token) => {
    	const listParam = {
				current : "0",
				pageSize : "10",
				field : "",
				keywords:"",
				order:"",
				columnKey:""
		  }
	this.props.dispatch(hwModelActions.getObjList(this.getQueryParams(listParam)))
	}
    render() {
        return (
            <div>
              <Form layout='horizontal' onSubmit={this.handleSubmit}>
			      {this.input("名称","name",this.props.data.name,true,formItemLayout)}
			      {this.input("类型","type",this.props.data.type,true,formItemLayout)}
			      {this.input("备注","nt",this.props.data.nt,true,formItemLayout)}
			      {this.searchableList("配置","tokenOfModel",this.props.data.tokenOfModel,this.props.data.modelDesp,true,this.props.hwModelList,this.autoSeacrchHwModel,formItemLayout,true)}
				{this.submitForm("更新",formTailLayout)}
               </Form>
            </div>
        );
    }
}
const WrappedDynamicRule = Form.create()(HwRoleUpdateComponent);
export default connect()(WrappedDynamicRule);
