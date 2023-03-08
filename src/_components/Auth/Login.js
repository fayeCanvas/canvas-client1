import React, { useState, useEffect } from "react";
import { ParentComponentWithNavBar } from "../genericComponent/ParentComponentWithSideBar";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useLocation, Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { login } from "../../_slices/auth";
import ForgotPassword from "./ForgotPassword";
import {MailOutlined} from '@ant-design/icons';
import { clearMessage } from "../../_slices/message";
import {
  Spin,
  Typography,
  Button,
  Row,
  Col,
  Modal,
  Checkbox,
  Form as AntForm,
} from "antd";
import Header from "../common/Header.js";
import "../_styles/login.css";
import Logout from "./Logout";
import PATHS from "../../_helpers/path";

const { Title, Text } = Typography;

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();
  const history = useHistory();
  // const { pathname } = useLocation();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("An email address is required for login")
      .email(),
    password: Yup.string().required("Please enter your password"),
  });

  const handleForgotPassword = () => {
    setForgotPassword(true);
  };

  const cancelForgotPassword = () => {
    setForgotPassword(false);
  };

  // const handleSwapLogin = () => {
  //   history.push(
  //     pathname === PATHS.PATIENT_LOGIN
  //       ? PATHS.THERAPIST_LOGIN
  //       : PATHS.PATIENT_LOGIN
  //   );
  // };

  const handleLogin = (formValue) => {
    const { email, password } = formValue;
    setLoading(true);
    dispatch(login({ email, password }))
      .unwrap()
      .then((res) => {
        if (res.user.user.role === "THERAPIST") {
          // props.history.push(PATHS.THERAPIST_DASHBOARD);
          window.location = PATHS.THERAPIST_DASHBOARD;
        } else if (res.user.user.role === "PATIENT") {
          props.history.push(PATHS.PATIENT_DASHBOARD);
        } else {
          props.history.push("/");
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <ParentComponentWithNavBar>
      <div className="login-page-wrapper">
        <div className="login-content-wrapper">
          {forgotPassword ? (
            <div>
              <ForgotPassword />
              <Text
                className="forgot-pass-btn"
                onClick={cancelForgotPassword}
                style={{ cursor: "pointer", textDecoration: "underline" }}
              >
                <p>Cancel</p>
              </Text>
            </div>
          ) : (
            <div>
              <Row type="flex" justify="center" align="middle">
                <Col span={"lg"}>
                  <Title
                    level={2}
                    style={{ textAlign: "center", margin: "auto" }}
                  >
                    Welcome to your Canvas Planner
                  </Title>

                </Col>
              </Row>
              <Row
                type="flex"
                justify="center"
                align="middle"
                style={{ marginTop: "2vh" }}
              >
                <Col span={24}>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleLogin}
                  >
                    <Form className="form">
                      <AntForm.Item
                        layout={"vertical"}
                        className="login-form ant-form"
                        prefix={<MailOutlined type="mail"/>}
                      >
                        <Field
                          name="email"
                          prefix={<MailOutlined type="mail"/>}
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
                      <AntForm.Item
                        layout={"vertical"}
                        className="login-form ant-form"
                      >
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
                          className="btn btn-primary login-btn button-primary"
                          size="large"
                          type={"primary"}
                          htmlType="submit"
                          style={{ width: "100%" }}
                        >
                          {/* {pathname === "/login/patient"
                            ? "START TRIAL"
                            : "LOGIN"} */}
                            LOGIN
                        </Button>
                      </AntForm.Item>
                      <div className="conditions">
                        <input type="Checkbox" checked="checked" readOnly />
                         By continuing, you agree to Canvas Pads <Link to="/disclosures">Policy</Link>.
                      </div>
                      {/* <Logout /> */}
                      <div
                        style={{ justifyContent: "center", display: "flex" }}
                      >
                        {loading && <Spin size="large"></Spin>}
                      </div>
                      <p
                        className="login-prompt"
                        style={{ marginTop:"10px", cursor: "pointer" }}

                        onClick={() => history.push("/register")}
                      >
                        Click Here to Register
                      </p>
                      <Text
                        className="forgot-pass-btn"
                        onClick={handleForgotPassword}
                        style={{ cursor: "pointer" }}
                      >
                        <p className="mb-1">Forgot password?</p>
                      </Text>
                      {/* <Text
                        className="forgot-pass-btn"
                        onClick={handleSwapLogin}
                        style={{ cursor: "pointer" }}
                      >
                        <p>
                          {pathname === "/login/patient"
                            ? "Therapist Login"
                            : "Patient Login"}
                        </p>
                      </Text> */}
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
          )}
        </div>
      </div>
    </ParentComponentWithNavBar>
  );
};

export default Login;
