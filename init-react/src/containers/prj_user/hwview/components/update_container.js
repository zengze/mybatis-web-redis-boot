import React, { Component } from 'react';
import { connect } from 'react-redux'
import HwViewUpdateComponent from './update_component'
import hwViewActions from '../actions'
import BaseComponent from '../../../../common/BaseComponent'
class HwViewUpdateContainer extends BaseComponent {
  constructor (props) {
      super(props)
      Object.assign(this.actions,hwViewActions)
  }
    render() {
    	const {hwView}= this.props
    
        const { hwRoleList,hwRoleListLoading } = this.props
	  	   
        return (
            <HwViewUpdateComponent data={ hwView}  hwRoleList={hwRoleList} hwRoleListLoading={hwRoleListLoading}  id={this.props.params.id}/>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
	
        const { data:hwRoleList,loading:hwRoleListLoading } = state.hwRoleListReducer.toJS();
	  	const {obj:hwView}=state.getHwViewReducer.toJS();
		return {
         hwView:hwView,
         hwRoleList:hwRoleList,
		 hwRoleListLoading: hwRoleListLoading,
	}
}
export default connect(mapStateToProps)(HwViewUpdateContainer);
