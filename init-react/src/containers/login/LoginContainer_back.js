import React, {PropTypes} from 'react';
import LoginComponent from './components/LoginComponent'
import { connect } from 'react-redux'
import { loginAction } from './'

class LoginContainer extends React.Component {

  render() {
    const { login , data } = this.props;
    return (
      <LoginComponent
        onSubmit={login}
        data={data}
        />
    );
  }

}

function mapStateToProps(state){
  return {
    data : state.loginReduce.status
  }
}

function mapDispatchToProps(dispatch){
  return {
      login(userName,password){
        dispatch(loginAction.login(userName,password))
      }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(LoginContainer)
