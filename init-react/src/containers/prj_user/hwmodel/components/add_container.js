
import React, { Component } from 'react';
import {Input, Button} from 'antd'
import {connect} from 'react-redux'
import HwModelAddComponent from './add_component'

export default class HwModelAddContainer extends Component {
      constructor (props) {
          super(props)
      }


    render() {
        return (
            <HwModelAddComponent />
        );
    }
}
