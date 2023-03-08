import React, { useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { getUserRole } from "../../helpers";
import { useCookies } from "react-cookie";

export default function ViewGoalModal({ show, setShow }) {
    const { goalsQuestions } = useSelector((state) => state.goal);

    return (
        <>
            <Modal
                title="Goal"
                centered
                visible={show}
                footer={null}
                // onOk={() => setShow(false)}
                onCancel={() => setShow(false)}
            >
                {
                    goalsQuestions?.map((item, index) => {
                        return (
                            <Row key={index}>
                                <Col lg={24} className='border-bottom py-2'>
                                    <h5>Question: {item.question}</h5>
                                    <h6>Answer: {item.answer ? item.answer : "Not answered yet"}</h6>
                                </Col>
                            </Row>
                        )
                    })

                }
            </Modal>
        </>
    );
}
