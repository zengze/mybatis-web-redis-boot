import React , {Component} from 'react'
import { connect } from 'react-redux'
import HwModelListComponent from './list_component'
import { NAVIGATE } from '../../../../constants/BaseAction'
import hwModelActions,{HW_MODEL} from '../actions'
import SearchHeader  from  '../../../main/components/SearchHeader'
import ObjectFields from '../structure'
import BaseComponent from '../../../../common/BaseComponent'
import NavigatorAction from '../../../../constants/NavigatorAction'
class HwModelListContainer extends BaseComponent {
    constructor (props) {
        super(props)
        Object.assign(this.actions,hwModelActions)
		this.state={
				listParam:{
				current : "0",
				pageSize : "10",
				field : "",
				keywords:"",
				order:"",
				columnKey:""
			  }
			}
    }
    componentWillMount() {
      this.getObjList(this.getQueryParams(this.state.listParam))
    }

    onChange = (pagination, filters, sorter) =>{
        let values = Object.assign({},this.state.listParam,sorter?{order:sorter.order,columnKey:sorter.columnKey}:undefined)
        Object.assign(values,pagination);
        this.setState({listParam:values});
        let listParam = this.getQueryParams(values);
        this.getObjList(listParam)
    }
    add = () => {
  		location.href = '#/'+HW_MODEL.URL+'/add'
  	}
    reload = () => {
	   const listParam = {
				current : "0",
				pageSize : "10",
				field : "",
				keywords:"",
				order:"",
				columnKey:""
		  }

		this.getObjList(this.getQueryParams(listParam));
	}
 render() {
        const { hwModelListReducer } = this.props;
        let pagination ={
        total: hwModelListReducer.param.total, //数据总数量
        pageSize: 10,  //显示几条一页
      }
        return (
          <div>
            <SearchHeader search={this.onChange}  add={this.add} reload={this.reload} columns={this.filter4Search(ObjectFields)}/>
            <HwModelListComponent hwModelList={hwModelListReducer.data} loading={hwModelListReducer.loading} columns={this.addUpdateDelBnts(this.filter4List(ObjectFields))}
              onChange={this.onChange} pagination={pagination} />
          </div>
      );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        hwModelListReducer : state.hwModelListReducer.toJS()
    }
}
export default connect(mapStateToProps)(HwModelListContainer)
