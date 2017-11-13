
import React, { Component } from 'react';
import {Input, Button} from 'antd'
import {connect} from 'react-redux'
import HwUserAddComponent from './add_component'

export default class HwUserAddContainer extends Component {
      constructor (props) {
          super(props)
      }


    render() {
        return (
            <HwUserAddComponent />
        );
    }
}
