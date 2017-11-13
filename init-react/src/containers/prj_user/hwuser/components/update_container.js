import React, { Component } from 'react';
import { connect } from 'react-redux'
import HwUserUpdateComponent from './update_component'
import hwUserActions from '../actions'
import BaseComponent from '../../../../common/BaseComponent'
class HwUserUpdateContainer extends BaseComponent {
  constructor (props) {
      super(props)
      Object.assign(this.actions,hwUserActions)
  }
    render() {
    	const {hwUser}= this.props
    
        const { hwRoleList,hwRoleListLoading } = this.props
	  	   
        return (
            <HwUserUpdateComponent data={ hwUser}  hwRoleList={hwRoleList} hwRoleListLoading={hwRoleListLoading}  id={this.props.params.id}/>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
	
        const { data:hwRoleList,loading:hwRoleListLoading } = state.hwRoleListReducer.toJS();
	  	const {obj:hwUser}=state.getHwUserReducer.toJS();
		return {
         hwUser:hwUser,
         hwRoleList:hwRoleList,
		 hwRoleListLoading: hwRoleListLoading,
	}
}
export default connect(mapStateToProps)(HwUserUpdateContainer);
