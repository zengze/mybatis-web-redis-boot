
import React, {Component} from 'react';
import { Form, Input, Button, Checkbox ,AutoComplete ,Select,Icon } from 'antd';
import {connect} from 'react-redux'
import BaseComponent from '../../../../common/BaseComponent'
import { SearchableList} from '../../../../common/SearchableList'
import hwModelActions  from '../actions'


const FormItem = Form.Item
const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 5 },
};
const formTailLayout = {
  wrapperCol: { span: 8, offset: 3 },
};

class HwModelAddComponent extends BaseComponent {

    constructor (props) {
        super(props)
        Object.assign(this.actions,hwModelActions)
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

    	}



    render() {

        return (
            <div>
              <Form layout='horizontal' onSubmit={this.handleSubmit}>
			      {this.input("名称","name",null,true,formItemLayout)}
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

   }
}

const WrappedDynamicRule = Form.create()(HwModelAddComponent);
export default connect(mapStateToProps)(WrappedDynamicRule);
