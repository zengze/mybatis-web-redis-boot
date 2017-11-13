import React, {PropTypes} from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './styles.less'
const FormItem = Form.Item;


const LoginComponent = ({ form, userNameOnChange, passwordOnChange, onSubmit, data}) => {
    let userName = '';
    let password = '';
    const getValue = () => {

      const userName = form.getFieldValue('userName')
      const password = form.getFieldValue('password')

      onSubmit(userName,password)
    }
    return (
       <div className="login_container" id="login_container">
               <div className="login_header">
                   <div className="login_logo">爱美斯国际物流</div>
               </div>
               <div className="login_content">
                 <div className="login_enter">
                   <div className="login_enter_header">
                   </div>
                   <div className="login_enter_content">
                     <Form onSubmit={() => onSubmit(userName, password)} className="login-form">
                      <FormItem>
                        {form.getFieldDecorator('userName', {
                          rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                          <Input  prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                        )}
                      </FormItem>
                      <FormItem>
                        {form.getFieldDecorator('password', {
                          rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                          <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                        )}
                      </FormItem>
                      <FormItem>
                        {form.getFieldDecorator('remember', {
                          valuePropName: 'checked',
                          initialValue: true,
                        })(
                          <Checkbox>Remember me</Checkbox>
                        )}
                        <a className="login-form-forgot" href="" style={{float:"right"}}>忘记密码？</a>


                      </FormItem>
                      <Button type="primary" onClick={()=>{getValue()}}  className="login-form-button">
                        Log in
                      </Button>
                    </Form>
                   </div>
                 </div>
               </div>
               <div className="login_footer">

               </div>
            </div>

    )
}

export default Form.create()(LoginComponent);
