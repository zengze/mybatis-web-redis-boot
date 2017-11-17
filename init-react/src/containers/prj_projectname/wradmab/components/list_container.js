import React , {Component} from 'react'
import { connect } from 'react-redux'
import WrAdmaBListComponent from './list_component'
import { NAVIGATE } from '../../../../constants/BaseAction'
import wrAdmaBActions,{WR_ADMA_B} from '../actions'
import SearchHeader  from  '../../../main/components/SearchHeader'
import ObjectFields from '../structure'
import BaseComponent from '../../../../common/BaseComponent'
import NavigatorAction from '../../../../constants/NavigatorAction'
class WrAdmaBListContainer extends BaseComponent {
    constructor (props) {
        super(props)
        Object.assign(this.actions,wrAdmaBActions)
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
		location.href = '#/'+WR_ADMA_B.URL+'/add';
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
        const { wrAdmaBListReducer } = this.props;
        let pagination ={
        total: wrAdmaBListReducer.param.total, //数据总数量
        pageSize: 10,  //显示几条一页
      }
        return (
          <div>
            <SearchHeader search={this.onChange} add={this.add} reload={this.reload}  columns={this.filter4Search(ObjectFields)}/>
            <WrAdmaBListComponent wrAdmaBList={wrAdmaBListReducer.data} loading={wrAdmaBListReducer.loading} columns={this.addUpdateDelBnts(this.filter4List(ObjectFields))}
              onChange={this.onChange} pagination={pagination} />
          </div>
      );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        wrAdmaBListReducer : state.wrAdmaBListReducer.toJS()
    }
}
export default connect(mapStateToProps)(WrAdmaBListContainer)
