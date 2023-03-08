import React, { useState, useRef, Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ParentComponentWithNavBar } from "../genericComponent/ParentComponentWithSideBar";
import { register } from "../../_slices/auth";
import { Form, Input, Button, Row, Col, Checkbox } from "antd";
import { Link, useHistory, useParams } from "react-router-dom";
import Header from "../common/Header";
import PATHS from "../../_helpers/path";

const Register = (props) => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const history = useHistory();
  // let userType = useParams()

  const onFinish = (values) => {
    const { email, password, firstName, lastName } = values;
    let user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      role: "THERAPIST",
    };

    dispatch(register(user))
      .unwrap()
      .then((response) => {
        if (response.user.role === "THERAPIST") {
          history.push(PATHS.THERAPIST_DASHBOARD);
        } else if (response.user.role === "Admin") {
          history.push("/admin");
        } else {
          history.push("/");
        }
        // window.location.reload();
      })
      .catch((err) => {
        setLoading(false);
        console.log("error", err);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <ParentComponentWithNavBar>
      <div className="login-page-wrapper">
        <div className="login-content-wrapper">
          <Row type="flex" justify="center" align="middle">
            <Col span={24}>
              <h2 className="text-center ant-typography">
                {" "}
                Register for Canvas Pad
              </h2>
              <div
                className="login-prompt"
                style={{ marginTop: "20px", cursor: "pointer" }}
                onClick={() => props.history.push("/")}
              >
                Already have an account?
              </div>
            </Col>
          </Row>
          <Row type="flex" justify="center" align="middle">
            <Col span={24} className="d-flex justify-content-center">
              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}
              <Form
                name="Registration"
                // labelCol={{ span: 6 }}
                wrapperCol={{ span: 24 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className="canvas-reg"
              >
                <Form.Item
                  // label="First Name"
                  name="firstName"
                  rules={[
                    { required: true, message: "Please enter your first name." },
                  ]}
                >
                  <Input placeholder="First Name" />
                </Form.Item>
                <Form.Item
                  // label="Last Name"
                  name="lastName"
                  // rules={[
                  //   { required: true, message: "Please enter your last name" },
                  // ]}
                  rules={[
                    {
                      required: true,
                      type: "lastName",
                      message: "Please enter your last name."
                    }
                  ]}
                >
                  <Input placeholder="Last Name" />
                </Form.Item>
                <Form.Item
                  // label="Email"
                  name="email"
                  // rules={[
                  //   { required: true, message: "Please enter your email" },
                  // ]}
                  rules={[
                    {
                      type: 'email',
                      message: 'The input is not a valid email address',
                    },
                    {
                      required: true,
                      message: 'Please enter your email.',
                    },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                  // label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please enter your password!" },
                  ]}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item>
                  <Button
                    className="button-primary login-btn"
                    size="large"
                    type={"primary"}
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    Register
                  </Button>
                </Form.Item>
                <div className="conditions">
                  <input type="Checkbox" checked="checked" readOnly/>
                  By continuing, you agree to Canvas Pads <Link to="/disclosures">Policy</Link>
                </div>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    </ParentComponentWithNavBar>
  );
};

export default Register;
