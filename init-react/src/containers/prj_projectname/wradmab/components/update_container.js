import React, { Component } from 'react';
import { connect } from 'react-redux'
import WrAdmaBUpdateComponent from './update_component'
import wrAdmaBActions from '../actions'
import BaseComponent from '../../../../common/BaseComponent'
class WrAdmaBUpdateContainer extends BaseComponent {
  constructor (props) {
      super(props)
      Object.assign(this.actions,wrAdmaBActions)
  }
    render() {
    	const {wrAdmaB}= this.props
    
        const { wrAdmaBList,wrAdmaBListLoading } = this.props
	  	   
        return (
            <WrAdmaBUpdateComponent data={ wrAdmaB}  wrAdmaBList={wrAdmaBList} wrAdmaBListLoading={wrAdmaBListLoading}  id={this.props.params.id}/>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
	
        const { data:wrAdmaBList,loading:wrAdmaBListLoading } = state.wrAdmaBListReducer.toJS();
	  	const {obj:wrAdmaB}=state.getWrAdmaBReducer.toJS();
		return {
         wrAdmaB:wrAdmaB,
         wrAdmaBList:wrAdmaBList,
		 wrAdmaBListLoading: wrAdmaBListLoading,
	}
}
export default connect(mapStateToProps)(WrAdmaBUpdateContainer);
