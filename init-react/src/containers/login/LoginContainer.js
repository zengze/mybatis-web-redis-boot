import React, { Component } from 'react';
import { connect } from 'react-redux'
import { loginAction } from './'

import { Form, Input, Tabs, Button, Icon, Checkbox, Row, Col, Alert } from 'antd';
const FormItem = Form.Item;
const { TabPane } = Tabs;

import './Login.less';

class LoginContainer extends Component {

  state = {
    count: 0,
    type: 'account',
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data != this.props.data) {
      this.setState({
        status: nextProps.data,
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onSwitch = (key) => {
    this.setState({
      type: key,
    });
  }

  onGetCaptcha = () => {
    let count = 59;
    this.setState({ count });
    this.interval = setInterval(() => {
      count -= 1;
      this.setState({ count });
      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { getFieldValue, validateFields } = this.props.form;

    const userName = getFieldValue('userName');
    const password = getFieldValue('password');

    validateFields({ force: true },
      (err, values) => {
        if (!err) {
          this.props.login(userName,password);
        }
      }
    );
  }

  renderMessage = (message) => {
    return (
      <Alert
        style={{ marginBottom: 24 }}
        message={message}
        type="error"
        showIcon
      />
    );
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { count, type, status } = this.state;

    return (
      <div className="login-container">
        <div className="login-top">
          <div className="login-header">
            <a href="">
              <img alt="" className="login-logo" src="https://gw.alipayobjects.com/zos/rmsportal/NGCCBOENpgTXpBWUIPnI.svg" />
              <span className="login-title">爱美斯国际物流</span>
            </a>
          </div>
        </div>
        <div className="login-main">
          <Form onSubmit={this.handleSubmit}>
            <Tabs animated={false} className="tabs" activeKey={type} onChange={this.onSwitch}>
              <TabPane tab="账户密码登录" key="account">
                {/* {
                  status === 'REQUEST' &&
                  type === 'account' &&
                  this.renderMessage('账户或密码错误')
                } */}
                <FormItem>
                  {getFieldDecorator('userName', {
                    rules: [{
                      required: type === 'account', message: '请输入账户名！',
                    }],
                  })(
                    <Input
                      size="large"
                      prefix={<Icon type="user" className="prefixIcon" />}
                      placeholder="用户名"
                    />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('password', {
                    rules: [{
                      required: type === 'account', message: '请输入密码！',
                    }],
                  })(
                    <Input
                      size="large"
                      prefix={<Icon type="lock" className="prefixIcon" />}
                      type="password"
                      placeholder="密码"
                    />
                  )}
                </FormItem>
              </TabPane>
              <TabPane tab="手机号登录" key="mobile">
                {/* {
                  status === 'REQUEST' &&
                  type === 'mobile' &&
                  this.renderMessage('验证码错误')
                } */}
                <FormItem>
                  {getFieldDecorator('mobile', {
                    rules: [{
                      required: type === 'mobile', message: '请输入手机号！',
                    }, {
                      pattern: /^1\d{10}$/, message: '手机号格式错误！',
                    }],
                  })(
                    <Input
                      size="large"
                      prefix={<Icon type="mobile" className="prefixIcon" />}
                      placeholder="手机号"
                    />
                  )}
                </FormItem>
                <FormItem>
                  <Row gutter={8}>
                    <Col span={16}>
                      {getFieldDecorator('captcha', {
                        rules: [{
                          required: type === 'mobile', message: '请输入验证码！',
                        }],
                      })(
                        <Input
                          size="large"
                          prefix={<Icon type="mail" className="prefixIcon" />}
                          placeholder="验证码"
                        />
                      )}
                    </Col>
                    <Col span={8}>
                      <Button
                        disabled={count}
                        className="getCaptcha"
                        size="large"
                        onClick={this.onGetCaptcha}
                      >
                        {count ? `${count} s` : '获取验证码'}
                      </Button>
                    </Col>
                  </Row>
                </FormItem>
              </TabPane>
            </Tabs>
            <FormItem className="additional">
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox style={{ marginBottom: 0 }}>自动登录</Checkbox>
              )}
              <a className="forgot" href="">忘记密码</a>
              <Button size="large" className="submit" type="primary" htmlType="submit">
                登录
              </Button>
            </FormItem>
          </Form>
          <div className="other">
            其他登录方式
            {/* 需要加到 Icon 中 */}
            <span className="iconAlipay" />
            <span className="iconTaobao" />
            <span className="iconWeibo" />
            <a className="register" href="">注册账户</a>
          </div>
        </div>
        <div className="login-footer">
          南京鼎盛合力水利技术有限公司 Copyright © 2016 - 2019
        </div>
      </div>
    );
  }

}

function mapStateToProps(state){
  return {
    data: state.loginReduce.status
  }
}

function mapDispatchToProps(dispatch){
  return {
      login(userName,password){
        dispatch(loginAction.login(userName,password))
      }
  }
}

LoginContainer = Form.create()(LoginContainer);

export default connect(mapStateToProps,mapDispatchToProps)(LoginContainer)
