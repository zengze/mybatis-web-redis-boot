import React, {Component, PropTypes} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider} from 'react-redux';
import Router from './store/router'; //路由配置
import store from './store/store';
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap/dist/js/bootstrap.min.js'
import './style.less'
render(
    <Provider store={store}>
    <Router/>
</Provider>, document.getElementById('react-content'));
