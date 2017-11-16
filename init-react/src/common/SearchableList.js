import React, {Component} from 'react';
import { Form, Input, Button, AutoComplete ,Select,Icon } from 'antd';

const OptionAuto = AutoComplete.Option;
const Option = Select.Option;

export class SearchableList extends React.Component {
  constructor(props) {
    super(props);

    const value = this.props.value || {};
    this.state = {
      isMoreRole:true,
      clickName:"搜索",
      icon:"search"
    };
  }

  handleNumberChange = (data) => {
    this.triggerChange(data);
  }
  handleCurrencyChange = (data) => {
    this.triggerChange(data);
  }

  handleChange =(currency)=>{

    if(currency&&currency!=null){
      this.props.AutoSeacrch(currency)
    }

  }
  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(changedValue);
    }
  }

  moreClick = () =>{
    if(this.state.clickName =="搜索"){
      this.setState({
        isMoreRole:false,
        clickName:"列表",
        icon:"menu-fold"
      })
    }else{
      this.setState({
        isMoreRole:true,
        clickName:"搜索",
        icon:"search"
      })
    }

  }
  render() {
    const { size } = this.props;
    const state = this.state;

    const dataSourceAuto = this.props.dataSource
    const options = dataSourceAuto.map((group,index) =>
          <OptionAuto key={index} value={group.token}>
            {group.name}
          </OptionAuto>
        )
    return (
      <span id="auto-complete">
        <Select
          defaultValue={this.props.selectLabel}
          placeholder="请选择"
          optionFilterProp="children"
          onChange={this.handleNumberChange}
          style={{ width: '80%',marginRight: '3%',display:this.state.isMoreRole?"inline-block":"none" }}
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
        {
           dataSourceAuto.map((i,index)=>
           <Option key={index} value={i.token}>{i.name}</Option>
        )
      }

        </Select>
        <AutoComplete
         placeholder="请输入关键字`"
         style={{ width: '80%', marginRight: '3%',display:this.state.isMoreRole?"none":"inline-block"}}
         onSearch={this.handleCurrencyChange}
         onChange={this.handleChange}
         filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
       >
       { options }
       </AutoComplete>


		<Button type="primary" style={{ display:this.props.hasMoreButton?"inline-block":"none", padding:'0 10px',marginTop: '3%' }} onClick={this.moreClick}><Icon type={this.state.icon} style={{ fontSize: 13 }} />{/*this.state.clickName*/}</Button>

	</span>
    );
  }
}
