import React, {Component} from 'react';
import { Form, Input, Button, Checkbox ,AutoComplete ,Select,Icon } from 'antd';
import {connect} from 'react-redux'
import BaseComponent from '../../../../common/BaseComponent'
import { SearchableList} from '../../../../common/SearchableList'
import hwRoleActions  from '../actions'
import hwModelActions from '../../../prj_user/hwmodel/actions'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 5 },
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 3 },
};
class HwRoleAddComponent extends BaseComponent {
    constructor (props) {
        super(props)
        Object.assign(this.actions,hwRoleActions)
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

        const { data:hwModelList,loading:hwModelListLoading } = this.props.hwModelListReducer

        return (
            <div>
              <Form layout='horizontal' onSubmit={this.handleSubmit}>
			      {this.input("名称","name",null,true,formItemLayout)}
			      {this.input("类型","type",null,true,formItemLayout)}
			      {this.input("备注","nt",null,true,formItemLayout)}
			      {this.searchableList("配置","tokenOfModel",null,null,true,hwModelList,this.autoSeacrchHwModel,formItemLayout,true)}
				{this.submitForm("添加",formTailLayout)}
               </Form>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
  return  {

        hwModelListReducer : state.hwModelListReducer.toJS()

   }
}
const WrappedDynamicRule = Form.create()(HwRoleAddComponent);
export default connect(mapStateToProps)(WrappedDynamicRule);
