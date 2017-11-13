
import React, { Component } from 'react';
import {Input, Button} from 'antd'
import {connect} from 'react-redux'
import HwViewAddComponent from './add_component'

export default class HwViewAddContainer extends Component {
      constructor (props) {
          super(props)
      }


    render() {
        return (
            <HwViewAddComponent />
        );
    }
}
