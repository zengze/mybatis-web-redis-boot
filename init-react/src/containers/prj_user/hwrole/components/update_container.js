import React, { Component } from 'react';
import { connect } from 'react-redux'
import HwRoleUpdateComponent from './update_component'
import hwRoleActions from '../actions'
import BaseComponent from '../../../../common/BaseComponent'
class HwRoleUpdateContainer extends BaseComponent {
  constructor (props) {
      super(props)
      Object.assign(this.actions,hwRoleActions)
  }
    render() {
    	const {hwRole}= this.props
    
        const { hwModelList,hwModelListLoading } = this.props
	  	   
        return (
            <HwRoleUpdateComponent data={ hwRole}  hwModelList={hwModelList} hwModelListLoading={hwModelListLoading}  id={this.props.params.id}/>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
	
        const { data:hwModelList,loading:hwModelListLoading } = state.hwModelListReducer.toJS();
	  	const {obj:hwRole}=state.getHwRoleReducer.toJS();
		return {
         hwRole:hwRole,
         hwModelList:hwModelList,
		 hwModelListLoading: hwModelListLoading,
	}
}
export default connect(mapStateToProps)(HwRoleUpdateContainer);
