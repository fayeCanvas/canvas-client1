import React, { useState } from "react";
// import { Button, Form } from 'react-bootstrap';
// import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Spin,
  Typography,
  Button,
  Row,
  Col,
  Checkbox,
  Modal,
  Form as AntForm,
} from "antd";
import { useDispatch } from "react-redux";
import { getUserRole } from "../../helpers";
import { useCookies } from "react-cookie";
// import { useAuth } from "../Auth/provideAuth";
import { addPatient, getAllPatients } from "../../_slices";

export default function AddNewPatient() {
  // const { handleSubmit, register, formState: { errors }, } = useForm();
  const [show, setShow] = useState(false);
  // const [cookie, setCookie] = useCookies();
  // let auth = useAuth();
  let dispatch = useDispatch();
  const user = getUserRole();
  // console.log("auth", auth);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const initialValues = {
    email: "",
    firstName: "",
    lastName: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Please enter email address").email(),
    firstName: Yup.string().required("Please enter first name"),
    lastName: Yup.string().required("Please enter last name"),
  });

  const patientAddCallBack = () =>{
    handleClose()
    dispatch(getAllPatients());
  }
  const OnPatientAdd = (data, callBack) => {
    let finalData = {
      email: data.email,
      // password: data.password,
      password: data.firstName,
      firstName: data.firstName,
      lastName: data.lastName,
      // createdById: req.user_id,
      role: "PATIENT",
    };
    dispatch(
      addPatient({
        payload: finalData,
        callBackFun: callBack,
        modalClose: patientAddCallBack,
      })
    );
  };
  return (
    <>
      <Button type="primary" onClick={() => setShow(true)}>
        Add New Patient
      </Button>
      <Modal
        title="Add New Patient"
        centered
        visible={show}
        footer={null}
        // onOk={() => setShow(false)}
        onCancel={() => setShow(false)}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {

            OnPatientAdd(values, resetForm);
          }}
        >
          <Form className="">
            <AntForm.Item layout={"vertical"} className="login-form ant-form">
              <label htmlFor="firstName">First Name</label>
              <Field
                name="firstName"
                type="text"
                className="email-input ant-input"
                placeholder="e.g. John"
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-danger"
                // style={{ textAlign: "center" }}
              />
            </AntForm.Item>
            <AntForm.Item layout={"vertical"} className="login-form ant-form">
              <label htmlFor="lastName">Last Name</label>
              <Field
                name="lastName"
                type="text"
                className="email-input ant-input"
                placeholder="e.g. Dones"
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-danger"
                // style={{ textAlign: "center" }}
              />
            </AntForm.Item>
            <AntForm.Item layout={"vertical"} className="login-form ant-form">
              <label htmlFor="email">Email</label>
              <Field
                name="email"
                type="text"
                className="email-input ant-input"
                placeholder="e.g. mailto:john.dohn@gmail.com"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger"
                // style={{ textAlign: "center" }}
              />
            </AntForm.Item>
            <AntForm.Item layout={"vertical"} className="login-form ant-form" hidden>
              {/* <label htmlFor="password">Password</label> */}
              <Field
                name="firstName"
                className="email-input ant-input"
                placeholder="e.g. John"
                type="hidden"
              />
              <Field
                name="password"
                type="text"
                className="email-input ant-input"
                placeholder="e.g. P@$$w*rd"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-danger"
                // style={{ textAlign: "center" }}
              />
            </AntForm.Item>
            <AntForm.Item>
              <Button
                className="btn btn-primary login-btn"
                size="large"
                type={"primary"}
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Add
              </Button>
            </AntForm.Item>
            {/* <Text className='forgot-pass-btn' onClick={handleForgotPassword} style={{ cursor: "pointer" }}><p>Forgot password?</p></Text> /} */}
          </Form>
        </Formik>
      </Modal>
    </>
  );
}
