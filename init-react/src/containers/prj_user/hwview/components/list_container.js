import React , {Component} from 'react'
import { connect } from 'react-redux'
import HwViewListComponent from './list_component'
import { NAVIGATE } from '../../../../constants/BaseAction'
import hwViewActions,{HW_VIEW} from '../actions'
import SearchHeader  from  '../../../main/components/SearchHeader'
import ObjectFields from '../structure'
import BaseComponent from '../../../../common/BaseComponent'
import NavigatorAction from '../../../../constants/NavigatorAction'
class HwViewListContainer extends BaseComponent {
    constructor (props) {
        super(props)
        Object.assign(this.actions,hwViewActions)
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
  		location.href = '#/'+HW_VIEW.URL+'/add'
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
        const { hwViewListReducer } = this.props;
        let pagination ={
        total: hwViewListReducer.param.total, //数据总数量
        pageSize: 10,  //显示几条一页
      }
        return (
          <div>
            <SearchHeader search={this.onChange}  add={this.add} reload={this.reload} columns={this.filter4Search(ObjectFields)}/>
            <HwViewListComponent hwViewList={hwViewListReducer.data} loading={hwViewListReducer.loading} columns={this.addUpdateDelBnts(this.filter4List(ObjectFields))}
              onChange={this.onChange} pagination={pagination} />
          </div>
      );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        hwViewListReducer : state.hwViewListReducer.toJS()
    }
}
export default connect(mapStateToProps)(HwViewListContainer)
