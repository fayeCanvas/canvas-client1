import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login } from '../../_slices/auth';
import ForgotPassword from './ForgotPassword';
import { clearMessage } from '../../_slices/message';
import { Spin, Typography, Button, Row, Col, Modal, Checkbox, Form as AntForm } from 'antd';
import '../_styles/login.css'

import Logout from './Logout';

const { Title, Text } = Typography;

const ClientLogin = (props) => {
    const [loading, setLoading] = useState(false);
    const [forgotPassword, setForgotPassword] = useState(false);
    const { message } = useSelector((state) => state.message);

    let history = useHistory()
    const initialValues = {
        email: "",
        password: ""
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().required("An email address is required for login").email(),
        password: Yup.string().required("Please enter your password")
    });
    const handleLogin = (formValue) => {
        const { email, password } = formValue;
        setLoading(true);
        if (email === "client@directive.com" && password === "client@123") {
            history.push('/action-plan-directive')
        }
        if (email === "client@observational.com" && password === "client@123") {
            history.push('/action-plan-observational')
        }

        // dispatch(login({ email, password }))
        //     .unwrap()
        //     .then((res) => {
        //         console.log('res', res.user.user.role == 'ADMIN')
        //         if (res.user.user.role === 'CLIENT') {
        //             props.history.push('/dashboard');
        //         } else if (res.user.user.role === 'ADMIN') {
        //             props.history.push('/admin')
        //         } else {
        //             console.log('here', res.user.role)
        //             props.history.push('/');
        //         }
        //     })
        //     .catch(() => {
        //         setLoading(false);
        //     });
    };

    return (
        <div className='login-page-wrapper'>
            <div className='login-content-wrapper'>
                {forgotPassword ?
                    <div>
                        <Text
                            className='forgot-pass-btn'
                            onClick={cancelForgotPassword}
                            style={{ cursor: "pointer", textDecoration: "underline" }}>
                            <p>Cancel</p>
                        </Text>
                    </div>
                    :
                    <div>
                        <Row type="flex" justify="center" align="middle">
                            <Col span={"lg"}>
                                <Title
                                    level={2}
                                    style={{ textAlign: "center", margin: "auto" }}
                                >Welcome to your Canvas Planner
                                </Title>
                                <div className='login-prompt' style={{ marginTop: "50px" }}>Login / Sign up</div>
                            </Col>
                        </Row>
                        <Row type='flex' justify='center' align='middle' style={{ marginTop: '2vh' }}>
                            <Col span={24}>
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={handleLogin}
                                >
                                    <Form className=''>
                                        <AntForm.Item layout={"vertical"} className="login-form ant-form">
                                            <Field
                                                name="email"
                                                type="text"
                                                className="email-input ant-input"
                                                placeholder="Email"
                                            />
                                            <ErrorMessage
                                                name="email"
                                                component="div"
                                                className="alert alert-danger"
                                                style={{ textAlign: "center" }}
                                            />
                                        </AntForm.Item>
                                        <AntForm.Item layout={"vertical"} className="login-form ant-form">
                                            <Field
                                                name="password"
                                                type="password"
                                                className="password-input ant-input"
                                                placeholder="Password"
                                            />
                                            <ErrorMessage
                                                name="password"
                                                component="div"
                                                className="alert alert-danger"
                                                style={{ textAlign: "center" }}
                                            />
                                        </AntForm.Item>
                                        <AntForm.Item>
                                            <Button
                                                className="button-primary"
                                                size='large'
                                                type={'primary'}
                                                htmlType="submit"
                                                style={{ width: "100%" }}>
                                                Login
                                            </Button>
                                        </AntForm.Item>
                                        {/* <Logout /> */}
                                        <div style={{ justifyContent: "center", display: "flex" }}>
                                            {loading && (
                                                <Spin size='large'></Spin>
                                            )}
                                        </div>
                                        {/* <Text className='forgot-pass-btn' onClick={handleForgotPassword} style={{ cursor: "pointer" }}><p>Forgot password?</p></Text> */}
                                    </Form>
                                </Formik>
                                {message && (
                                    <div className="form-group">
                                        <div className="alert alert-danger" role="alert">
                                            {message}
                                        </div>
                                    </div>
                                )}
                            </Col>
                        </Row>
                    </div>
                }
            </div>
        </div>
    );
};

export default ClientLogin;
