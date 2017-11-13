import React, { Component } from 'react';
import {Input, Button} from 'antd'
import {connect} from 'react-redux'
import WrAdmaBAddComponent from './add_component'
export default class WrAdmaBAddContainer extends Component {
      constructor (props) {
          super(props)
      }
    render() {
        return (
            <WrAdmaBAddComponent />
        );
    }
}
