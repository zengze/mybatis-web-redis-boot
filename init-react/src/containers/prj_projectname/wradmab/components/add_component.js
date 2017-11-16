import React, {Component} from 'react';
import { Form, Input, Button, Checkbox ,AutoComplete ,Select,Icon } from 'antd';
import {connect} from 'react-redux'
import BaseComponent from '../../../../common/BaseComponent'
import { SearchableList} from '../../../../common/SearchableList'
import wrAdmaBActions  from '../actions'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 5 },
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 3 },
};
class WrAdmaBAddComponent extends BaseComponent {
    constructor (props) {
        super(props)
        Object.assign(this.actions,wrAdmaBActions)
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


	autoSeacrchWrAdmaB = (token) => {
    	const listParam = {
				current : "0",
				pageSize : "10",
				field : "",
				keywords:"",
				order:"",
				columnKey:""
		  }
	this.props.dispatch(wrAdmaBActions.getObjList(this.getQueryParams(listParam)))
	}
    render() {

        const { data:wrAdmaBList,loading:wrAdmaBListLoading } = this.props.wrAdmaBListReducer

        return (
            <div>
              <Form layout='horizontal' onSubmit={this.handleSubmit}>
			      {this.input("组织机构代码","orgCd",null,true,formItemLayout)}
			      {this.input("机构名称","orgNm",null,true,formItemLayout)}
			      {this.input("机构简称","orgShnm",null,false,formItemLayout)}
			      {this.input("机构简称(字母)","partdomain",null,true,formItemLayout)}
			      {this.input("机构全简称(英文)","fulldomain",null,true,formItemLayout)}
			      {this.searchableList("所属机构类型","orgTp",null,null,true,[{token:"1",name:"国家机关（行政主管部门）"},{token:"2",name:"事业单位"},{token:"3",name:"企业"},{token:"4",name:"社会团体"},{token:"5",name:"乡镇水利管理单位"},{token:"9",name:"其他"}],null,formItemLayout,false)}
			      {this.input("法人代表","lrNm",null,false,formItemLayout)}
			      {this.searchableList("机构规格","orgScal",null,null,true,[{token:"1",name:"正部（省）级"},{token:"2",name:"副部（省）级"},{token:"3",name:"正厅级"},{token:"4",name:"副厅级"},{token:"5",name:"正处级"},{token:"6",name:"副处级"},{token:"7",name:"正科级"},{token:"8",name:"副科级"},{token:"9",name:"其他"}],null,formItemLayout,false)}
			      {this.searchableList("隶属关系","menb",null,null,true,[{token:"1",name:"隶属于中央"},{token:"2",name:"隶属于省（自治区、直辖市）"},{token:"3",name:"隶属于地（区、市、州、盟）"},{token:"4",name:"隶属于县（区、市、旗）"},{token:"9",name:"其他"}],null,formItemLayout,false)}
			      {this.input("网址","web",null,false,formItemLayout)}
			      {this.searchableList("上级机构","tokenOfParent",null,null,false,wrAdmaBList,this.autoSeacrchWrAdmaB,formItemLayout,true)}
			      {this.input("邮箱","email",null,false,formItemLayout)}
			      {this.input("地址","addr",null,false,formItemLayout)}
			      {this.input("邮编","zip",null,false,formItemLayout)}
			      {this.input("办公室电话","tel",null,false,formItemLayout)}
			      {this.input("传真号码","fax",null,false,formItemLayout)}
			      {this.input("备注","nt",null,false,formItemLayout)}
				{this.submitForm("添加",formTailLayout)}
               </Form>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
  return  {

        wrAdmaBListReducer : state.wrAdmaBListReducer.toJS()

   }
}
const WrappedDynamicRule = Form.create()(WrAdmaBAddComponent);
export default connect(mapStateToProps)(WrappedDynamicRule);
