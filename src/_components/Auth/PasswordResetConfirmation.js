import React, { Component } from 'react';
import {Button, Row, Col, Typography, Spin} from 'antd';
import { browserHistory } from 'react-router';
import '../_styles/forgotPassword.css'

const {Text} = Typography;


class PasswordResetConfirmation extends Component {
  constructor(props) {
    super(props)
  }

  handleOkay=()=>{
    // this.props.closeLoginModal();
    this.props.history.goBack()
  }

  render() {

    return (
      <div className='login-page-wrapper'>
        <div className='login-content-wrapper'>
          <Row type="flex" justify="center" align="middle" style={{marginTop: '5vh'}}>
            <Col span={22}>
              <Text data-testid='reset_info'> Please check your email for password reset instructions. Email us if you need further help.</Text>
            </Col>
          </Row>
          <Row type='flex' justify='center' align='middle' style={{marginTop: '2vh'}}>
            <Col span={22}>
                <Button data-testid='reset-confirm-button' onClick={this.handleOkay} size="large" type={"primary"} className="btn btn-primary" htmlType="submit" style={{width: '100%', marginTop:'1vh',}}>
                  Okay
                </Button>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default PasswordResetConfirmation;
