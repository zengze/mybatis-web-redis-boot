
import React, { Component } from 'react';
import {Input, Button} from 'antd'
import {connect} from 'react-redux'
import HwRoleAddComponent from './add_component'

export default class HwRoleAddContainer extends Component {
      constructor (props) {
          super(props)
      }


    render() {
        return (
            <HwRoleAddComponent />
        );
    }
}
