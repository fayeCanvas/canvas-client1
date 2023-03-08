import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import { Formik, Field, Form, ErrorMessage } from "formik";
import {Button, Row, Col, Typography, Form as AntForm, Input} from 'antd';
import { API_ROOT, CLIENT_ROOT } from '../../_helpers/set_root.js'
import {LockOutlined} from '@ant-design/icons';
import axios from 'axios';

const {Title, Text} = Typography;

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      error: '',

    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({password: e.target.value})
  }

  async handleFormSubmit(e) {
    e.preventDefault();
    let comp = this;
    let password = e.target.elements.password.value;
    await axios.post(`${API_ROOT}/auth/reset-password/${comp.props.match.params.token}`, { password })
    .then((response) => {
      window.location.href = `${CLIENT_ROOT}`
    })
    .catch((error) => {
      this.setState({error: error.response.data.error})
    });
  }

  renderAlert() {
    if (this.state.error) {
      return (
        <div>
          <span className='modal-text' data-testid="invalid-password-error">{this.state.error}</span>
        </div>
      );
    }
  }

  render() {

    const { handleSubmit } = this.props;

    return (
      <div>
        <Row type='flex' justify='center' align='middle' style={{marginTop: '2vh'}}>
          <Col xs={18} sm={18} md={10} lg={10} xl={5}>
          <Title data-testid='reset-password-title' level={3} className="instructions"> Create a new password.</Title>

          {this.renderAlert()}
          <Formik
            initialValues={this.state.initialValues}
            onSubmit={() => this.handleFormSubmit()}
            >
            <Form onSubmit={this.handleFormSubmit} layout={"vertical"} className="login-form">

              <AntForm.Item>
                <Input
                  data-testid='reset-password-form'
                  className="pInput"
                  name="password"
                  prefix={<LockOutlined type="mail"/>}
                  placeholder="new password"
                />
              </AntForm.Item>
              <AntForm.Item>
                <Button data-testid='reset-password-button' size="large" type={"submit"} htmlType="submit" className="button-primary" style={{width: '100%'}}>
                  Submit
                </Button>
              </AntForm.Item>
            </Form>
            </Formik>
          </Col>
        </Row>
      </div>
    )
  }

}


export default ResetPassword;
