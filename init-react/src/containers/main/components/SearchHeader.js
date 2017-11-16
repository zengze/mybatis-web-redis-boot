import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Form, Input, Button, Checkbox ,AutoComplete ,Select,Icon } from 'antd';
const Option = Select.Option;
class SearchHeader  extends Component {
    constructor (props) {
        super(props);
      }

    handleSubmit = (e) => {
          e.preventDefault();
              this.props.form.validateFields((err, values) => {
              if (!err) {
                 values.current = 0;
                 this.props.search(values)
              }
            });
        }
    render() {
      const getFieldDecorator =this.props.form.getFieldDecorator
      return (
          <Form  onSubmit={this.handleSubmit} style={{marginBottom:"20px"}} id="user-list">

              {getFieldDecorator('keywords', {
                rules: [{
                  required: true,
                  message: '请输入关键字',

                }]

              })(
                <Input   />
              )}
              {getFieldDecorator('field', {

                rules: [{
                  required: true,
                  message: '请输入关键字',
                }]

              })(
                <Select placeholder="选择字段"  >
                  <Option value={""} >无</Option>
                  {

                    this.props.columns.map((i,index)=>{

                      return (
                          <Option value={i.key} key={index}>{i.title}</Option>
                      )
                    })

                  }
                </Select>
              )}
			  <Button type="primary" htmlType="submit">
  				<Icon type="search" />
          查询
			  </Button>
			  {this.props.reload && (<Button onClick={this.props.reload} ><Icon type="reload" />刷新</Button>)}
			  {this.props.add && <Button onClick={this.props.add} ><Icon type="plus" />新增</Button>}
            </Form>

        );
    }
}
const WrappedDynamicRule = Form.create()(SearchHeader);
export default WrappedDynamicRule;
