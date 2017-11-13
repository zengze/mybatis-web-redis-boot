import React, { Component } from 'react';
import { connect } from 'react-redux'
import HwModelUpdateComponent from './update_component'
import hwModelActions from '../actions'
import BaseComponent from '../../../../common/BaseComponent'
class HwModelUpdateContainer extends BaseComponent {
  constructor (props) {
      super(props)
      Object.assign(this.actions,hwModelActions)
  }
    render() {
    	const {hwModel}= this.props
      	   
        return (
            <HwModelUpdateComponent data={ hwModel}  id={this.props.params.id}/>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
	  	const {obj:hwModel}=state.getHwModelReducer.toJS();
		return {
         hwModel:hwModel,
      }
}
export default connect(mapStateToProps)(HwModelUpdateContainer);
