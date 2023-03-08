import React, { Component } from 'react';
import { useSelector } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from "formik";
import {
  Spin,
  Typography,
  Button,
  Row,
  Col,
  Modal,
  Checkbox,
  Input,
  Form as AntForm,
} from "antd";
import {MailOutlined} from '@ant-design/icons';
import * as Yup from "yup";
import axios from 'axios';
import { API_ROOT, CLIENT_ROOT } from '../../_helpers/set_root.js'
import '../_styles/forgotPassword.css'
import PasswordResetConfirmation from "./PasswordResetConfirmation";
import { getPasswordToken } from "../../_slices/auth";


const { Title } = Typography;

class ForgotPassword extends Component {
  constructor(props) {
      super(props);
      this.state = {
        email: '',
        errorMsg: '',
        passwordConfirm: null,
        initialValues: {email: ''}
      }
      this.handleFormSubmit = this.handleFormSubmit.bind(this)
      this.renderAlert = this.renderAlert.bind(this)
      this.validationSchema = this.validationSchema.bind(this)

    }

   validationSchema() {
     Yup.object().shape({email: Yup.string()
      .required("An email address is required for login")
      .email(),
    });
  }

  handleFormSubmit(e) {
    let email = e.target.elements.email.value
    return axios.post(`${API_ROOT}/auth/forgot-password`, { email })
      .then((response) => {
        window.location.href = `${CLIENT_ROOT}/passwordresetconfirmation`
      })
      .catch((error) => {
        console.log('There was an error submitting this form.',  error)
      });
  }


  renderAlert(){
    if ( this.state.errorMsg !== '') {
      let errorMessage = (errorMsg !== '') ? message : errorMsg
      switch(errorMessage) {
        case "Error: Request failed with status code 422":
          return (
              <div>
                <span className='modal-text' data-testid="incorrect-email-error">Hmm we cannot find that member in our system. Did you use your work email? Please try again. If you continue to have issues, please notify your Expert.</span>
              </div>
            );
        case "You must enter an email":
          return (
              <div>
                <span className='modal-text' data-testid="no-email-error">Please enter an email before pressing submit.</span>
              </div>
            );
        case "Error: Network Error":
          return (
            <div>
              <span data-testid='login-error' className='modal-text'>Something went wrong. Please contact your expert for support from our technical team.</span>
            </div>
          )
        default:
          return (
              <div>
                <span className='modal-text' data-testid="other-email-error">{errorMessage || 'Something went wrong. Please contact your expert.'}</span>
              </div>
            );
      }
    }
  }

  render() {
    return (
      <div>
        <div data-testid="forgot-password-wrapper">
          <Row type="flex" justify="center" align="middle" style={{marginTop: '5vh'}}>
            <Col span={22}>
              <Title level={3} data-testid="forgot-password-title" className="forgot-pwd-title"> Enter your email to reset your password.</Title>
              {this.renderAlert()}
            </Col>
          </Row>
          <Row type='flex' justify='center' align='middle' style={{marginTop: '2vh'}}>
            <Col span={22}>
              <Formik
                initialValues={this.state.initialValues}
                onSubmit={() => this.handleFormSubmit()}
                >
                <Form onSubmit={this.handleFormSubmit} layout={"vertical"} className="login-form">
                      <AntForm.Item>
                        <Input
                          data-testid="email-form"
                          className="eInput"
                          name="email"
                          prefix={<MailOutlined type="mail"/>}
                          placeholder="email address"
                        />
                      </AntForm.Item>
                      <AntForm.Item>
                        <Button data-testid="forgot-password-button" size="large" type={"primary"} htmlType="submit" className="btn btn-primary login-btn button-primary" style={{width: '100%', marginTop:'1vh'}}>
                          Submit
                        </Button>
                      </AntForm.Item>
                    </Form>
              </Formik>
              </Col>
            </Row>
          </div>
      </div>
    )
  }

}

export default ForgotPassword;
