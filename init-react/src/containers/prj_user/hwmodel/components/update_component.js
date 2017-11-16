import React, {Component} from 'react';
import {connect} from 'react-redux'
import { Form, Input, Button, Checkbox ,AutoComplete ,Select,Icon } from 'antd';
import BaseComponent from '../../../../common/BaseComponent'
import { SearchableList} from '../../../../common/SearchableList'
import hwModelActions  from '../actions'

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
class HwModelUpdateComponent extends BaseComponent {
    constructor (props) {
        super(props)
        Object.assign(this.actions,hwModelActions)
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

    	}


    render() {
        return (
            <div>
              <Form layout='horizontal' onSubmit={this.handleSubmit}>
			      {this.input("名称","name",this.props.data.name,true,formItemLayout)}
			      {this.input("内容","json",this.props.data.json,true,formItemLayout)}
			      {this.input("备注","nt",this.props.data.nt,true,formItemLayout)}
				{this.submitForm("更新",formTailLayout)}
               </Form>
            </div>
        );
    }
}
const WrappedDynamicRule = Form.create()(HwModelUpdateComponent);
export default connect()(WrappedDynamicRule);
