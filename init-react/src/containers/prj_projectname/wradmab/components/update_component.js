import React, {Component} from 'react';
import {connect} from 'react-redux'
import { Form, Input, Button, Checkbox ,AutoComplete ,Select,Icon } from 'antd';
import BaseComponent from '../../../../common/BaseComponent'
import { SearchableList} from '../../../../common/SearchableList'
import wrAdmaBActions  from '../actions'

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
class WrAdmaBUpdateComponent extends BaseComponent {
    constructor (props) {
        super(props)
        Object.assign(this.actions,wrAdmaBActions)
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
        return (
            <div>
              <Form layout='horizontal' onSubmit={this.handleSubmit}>
			      {this.input("组织机构代码","orgCd",this.props.data.orgCd,true,formItemLayout)}
			      {this.input("机构名称","orgNm",this.props.data.orgNm,true,formItemLayout)}
			      {this.input("机构简称","orgShnm",this.props.data.orgShnm,false,formItemLayout)}
			      {this.input("机构简称(字母)","partdomain",this.props.data.partdomain,true,formItemLayout)}
			      {this.input("机构全简称(英文)","fulldomain",this.props.data.fulldomain,true,formItemLayout)}
			      {this.searchableList("所属机构类型","orgTp",this.props.data.orgTp,"启用",true,[{token:"1",name:"国家机关（行政主管部门）"},{token:"2",name:"事业单位"},{token:"3",name:"企业"},{token:"4",name:"社会团体"},{token:"5",name:"乡镇水利管理单位"},{token:"9",name:"其他"}],null,formItemLayout,false)}
			      {this.input("法人代表","lrNm",this.props.data.lrNm,false,formItemLayout)}
			      {this.searchableList("机构规格","orgScal",this.props.data.orgScal,"启用",true,[{token:"1",name:"正部（省）级"},{token:"2",name:"副部（省）级"},{token:"3",name:"正厅级"},{token:"4",name:"副厅级"},{token:"5",name:"正处级"},{token:"6",name:"副处级"},{token:"7",name:"正科级"},{token:"8",name:"副科级"},{token:"9",name:"其他"}],null,formItemLayout,false)}
			      {this.searchableList("隶属关系","menb",this.props.data.menb,"启用",true,[{token:"1",name:"隶属于中央"},{token:"2",name:"隶属于省（自治区、直辖市）"},{token:"3",name:"隶属于地（区、市、州、盟）"},{token:"4",name:"隶属于县（区、市、旗）"},{token:"9",name:"其他"}],null,formItemLayout,false)}
			      {this.input("网址","web",this.props.data.web,false,formItemLayout)}
			      {this.searchableList("上级机构","tokenOfParent",this.props.data.tokenOfParent,this.props.data.parentDesp,false,this.props.wrAdmaBList,this.autoSeacrchWrAdmaB,formItemLayout,true)}
			      {this.input("邮箱","email",this.props.data.email,false,formItemLayout)}
			      {this.input("地址","addr",this.props.data.addr,false,formItemLayout)}
			      {this.input("邮编","zip",this.props.data.zip,false,formItemLayout)}
			      {this.input("办公室电话","tel",this.props.data.tel,false,formItemLayout)}
			      {this.input("传真号码","fax",this.props.data.fax,false,formItemLayout)}
			      {this.input("备注","nt",this.props.data.nt,false,formItemLayout)}
				{this.submitForm("更新",formTailLayout)}
               </Form>
            </div>
        );
    }
}
const WrappedDynamicRule = Form.create()(WrAdmaBUpdateComponent);
export default connect()(WrappedDynamicRule);
