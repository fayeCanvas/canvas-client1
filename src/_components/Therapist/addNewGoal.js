import React, { useState } from "react";
// import { Button, FloatingLabel, Form, } from 'react-bootstrap';
// import Modal from 'react-bootstrap/Modal';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { v4 as uuid } from "uuid";
import {
  Spin,
  Typography,
  Button,
  Row,
  Col,
  Checkbox,
  Dropdown,
  Menu,
  Modal,
  Radio,
  Form as AntForm,
  Select,
} from "antd";
import moment from 'moment';
import { TimePicker } from "antd";
import { DatePicker, Space } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { addGoals, getGoalByPatientId } from "../../_slices";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";



export default function AddNewGoal() {
  let param = useParams();
  let dispatch = useDispatch();
  const [addressCount, setAddressCount] = useState([
    {
      id: uuid(),
    },
  ]);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [goalTypeSelected, setGoalType] = useState();
  const [howLongActivityTake, setHowLongActivityTake] = useState();
  const [emotionsExperiencing, setEmotionsExperiencing] = useState();
  const [howDoesFeel, setHowDoesFeel] = useState();
  // const [goalTypeSelected2, setGoalType2] = useState("Directive");
  const initialValues = {
    name: "",
    // firstName: "",
    // lastName: "",
  };

    const validationSchema = Yup.object().shape({
      name: Yup.string().required("Please enter a goal"),
    // firstName: Yup.string().required("Please enter first name"),
    // lastName: Yup.string().required("Please enter last name"),
  });
  const addGoalSuccess = () => {
    setShow(false);
    dispatch(getGoalByPatientId(param.id));
  };


  const emailNotification = () => {
    setShow(false);
    dispatch(sendEmail(param.id));
  };

  const OnGoalAdd = (data, callBack) => {
    const extraQuestions = data.questions ? data.questions.map((item) => {
      return {
        question: item.question,
        goalId: 0,
        answer: "",
      };
    }) : [];

    let finalData = {
      name: data.name,
      patientId: param?.id,
      notifiedDate: moment(date).format('MM/DD/YYYY HH:mm:ss'),
      // notifiedTime: time,
      isArchived: false,
      goalType: goalTypeSelected,
      suggestionTips: data.suggestionTips,
      isCompleted: false,
      questions: extraQuestions,
      activityTake: howLongActivityTake,
      emotionsExperience: emotionsExperiencing,
      feel: howDoesFeel,
      moreQuestions: data.addMoreQuestions,
    };
    console.log('final data', finalData)
    dispatch(
      addGoals({
        payload: finalData,
        callBackFun: callBack,
        onSuccessFunc: addGoalSuccess,
        notification: emailNotification,
      })
    );
  };

  const onChange = (date, dateString) => {
    setDate(date._d);
  };
  const onChangeTime = (time, timeString) => {
    setTime(time._d);
  };

  const onChangeType = (e) => {
    setGoalType(e.target.value);
  };

  const onChangeTypeActive = (value) => {
    setHowLongActivityTake(value);
  };

  const onChangeEmotionsExperiencing = (value) => {
    setEmotionsExperiencing(value);
  };

  const onChangeHowDoesFeel = (value) => {
    setHowDoesFeel(value);
  };

  const addMoreField = () => {
    setAddressCount([
      ...addressCount,
      {
        id: uuid(),
      },
    ]);
  };
  const deleteMoreField = (id) => () => {
    setAddressCount(addressCount.filter((address) => address.id !== id));
  };

  return (
    <>
      <>
        <Button type="primary" className='button-primary' onClick={() => setShow(true)}>
          Add New Goal
        </Button>
        <Modal
          title="Add New Goal"
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
              OnGoalAdd(values, resetForm);
            }}
          >
            <Form className="">
              <AntForm.Item layout={"vertical"} className="login-form ant-form">
                <label htmlFor="name">What is their goal:</label>
                <Field
                  name="name"
                  type="text"
                  className="email-input ant-input"
                  placeholder="e.g. Go to sleep earlier"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-danger"
                  // style={{ textAlign: "center" }}
                />
              </AntForm.Item>
              <label htmlFor="goalType">
                Is this observational or directive?
              </label>
              <AntForm.Item>
                <Radio.Group onChange={onChangeType} value={goalTypeSelected}>
                  <Radio value={"Observational"}>Observational</Radio>
                  <Radio value={"Directive"}>Directive</Radio>
                </Radio.Group>
                <ErrorMessage
                  name="goalType"
                  component="div"
                  className="text-danger"
                  // style={{ textAlign: "center" }}
                />

          {goalTypeSelected == "Directive" ?
              <div className="goaltypeselected">
                <label htmlFor="directive2">
                  How long should this activity take ?
                </label>
                <Select placeholder="Please select your time" onChange={onChangeTypeActive}>
                  <Select.Option value="15">15 Min</Select.Option>
                  <Select.Option value="30">30 Min</Select.Option>
                  <Select.Option value="45">45 Min</Select.Option>
                  <Select.Option value="60">1 Hour</Select.Option>
                </Select>
              </div>: ""
              }
              </AntForm.Item>

              {/* <AntForm.Item>
              {goalTypeSelected == "Directive" ?
              <div>
                <label htmlFor="directive2">
                  How long should this activity take ?
                </label>
                <Radio.Group onChange={onChangeTypeActive} value={howLongActivityTake}>
                  <Radio value={"Observational"}>Observational</Radio>
                  <Radio value={"Directive"}>Directive</Radio>
                </Radio.Group>

                <Select name="howLongActivityTake" placeholder="Please select your time" onChange={onChangeTypeActive} value={howLongActivityTake}>
                  <Option value="15">15 Min</Option>
                  <Option value="30">30 Min</Option>
                  <Option value="45">45 Min</Option>
                  <Option value="60">1 Hour</Option>
                </Select>

                <Select placeholder="Please select your time" onChange={onChangeTypeActive}>
                  <Option value="15">15 Min</Option>
                  <Option value="30">30 Min</Option>
                  <Option value="45">45 Min</Option>
                  <Option value="60">1 Hour</Option>
                </Select>

                <Select
                  showSearch
                  placeholder="Select a person"
                  optionFilterProp="children"
                  onChange={onChange2}
                >
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="tom">Tom</Option>
                </Select>

              </div>: ""
              }
              </AntForm.Item> */}


              <AntForm.Item layout={"vertical"} className="login-form ant-form">
                <label htmlFor="notifiedDate">
                  When should they be notified?
                </label>
                <div>
                  <DatePicker
                    onChange={onChange}
                    className="date-picker"
                    format="MM-DD-YYYY hh:mm"
                    showTime={{ format: "hh:mm" }}
                    timeFormat="hh:mm"
                    timeIntervals={15}
                    use12Hours
                    placeholderText="Select date and time"/>
                {//  <TimePicker use12Hours onChange={onChangeTime} defaultValue={moment("08:00", "HH:mm")} format="HH:mm" />
                }
                  </div>
                  <ErrorMessage
                    name="notifiedDate"
                    component="div"
                    className="text-danger"
                    // style={{ textAlign: "center" }}
                  />
              </AntForm.Item>
              {/* <label htmlFor="password" className='my-2'>Add Notification +</label> */}
              <AntForm.Item layout={"vertical"} className="login-form ant-form">
                <label htmlFor="suggestionTips">
                  What Suggestions / tips do you want to share?
                </label>
                <Field
                  name="suggestionTips"
                  type="text"
                  className="email-input ant-input"
                  placeholder="Enter here"
                />
                <ErrorMessage
                  name="suggestionTips"
                  component="div"
                  className="text-danger"
                  // style={{ textAlign: "center" }}
                />
              </AntForm.Item>

              <AntForm.Item layout={"vertical"} className="login-form ant-form" hidden={true}>
                <label htmlFor="emotions">
                  What emotions are you experiencing?
                </label>
                <Select name="emotions" placeholder="Please select a emotions" onChange={onChangeEmotionsExperiencing}>
                  <Select.Option value="Aggressive">Aggressive</Select.Option>
                  <Select.Option value="Agonized">Agonized</Select.Option>
                  <Select.Option value="Anxious">Anxious</Select.Option>
                  <Select.Option value="Apologetic">Apologetic</Select.Option>
                  <Select.Option value="Arrogant">Arrogant</Select.Option>
                  <Select.Option value="Bashful">Bashful</Select.Option>
                  <Select.Option value="Blissful">Blissful</Select.Option>
                  <Select.Option value="Bored">Bored</Select.Option>
                  <Select.Option value="Cautious">Cautious</Select.Option>
                  <Select.Option value="Cold">Cold</Select.Option>
                  <Select.Option value="Concentrating">Concentrating</Select.Option>
                  <Select.Option value="Confident">Confident</Select.Option>
                  <Select.Option value="Curious">Curious</Select.Option>
                  <Select.Option value="Demure">Demure</Select.Option>
                  <Select.Option value="Determined">Determined</Select.Option>
                  <Select.Option value="Disappointed">Disappointed</Select.Option>
                  <Select.Option value="Disapproving">Disapproving</Select.Option>
                  <Select.Option value="Disbeliving">Disbeliving</Select.Option>
                  <Select.Option value="Disgusting">Disgusting</Select.Option>
                  <Select.Option value="Distasteful">Distasteful</Select.Option>
                  <Select.Option value="Eavesdropping">Eavesdropping</Select.Option>
                  <Select.Option value="Ecstatic">Ecstatic</Select.Option>
                  <Select.Option value="Enraged">Enraged</Select.Option>
                  <Select.Option value="APOLOGETIC">APOLOGETIC</Select.Option>
                  <Select.Option value="Envious">Envious</Select.Option>
                  <Select.Option value="Exasperated">Exasperated</Select.Option>
                  <Select.Option value="Exhausted">Exhausted</Select.Option>
                  <Select.Option value="Frightened">Frightened</Select.Option>
                  <Select.Option value="Frustrated">Frustrated</Select.Option>
                  <Select.Option value="Grieving">Grieving</Select.Option>
                  <Select.Option value="Guilty">Guilty</Select.Option>
                  <Select.Option value="Happy">Happy</Select.Option>
                  <Select.Option value="Horrified">Horrified</Select.Option>
                  <Select.Option value="Hot">Hot</Select.Option>
                  <Select.Option value="Hungover">Hungover</Select.Option>
                  <Select.Option value="Hurt">Hurt</Select.Option>
                  <Select.Option value="Hysterical">Hysterical</Select.Option>
                  <Select.Option value="Indiffferent">Indiffferent</Select.Option>
                  <Select.Option value="Idiotic">Idiotic</Select.Option>
                  <Select.Option value="Innocent">Innocent</Select.Option>
                  <Select.Option value="Interested">Interested</Select.Option>
                  <Select.Option value="Jealous">Jealous</Select.Option>
                  <Select.Option value="Joyful">Joyful</Select.Option>
                  <Select.Option value="Loaded">Loaded</Select.Option>
                  <Select.Option value="Lonely">Lonely</Select.Option>
                  <Select.Option value="Lovestruck">Lovestruck</Select.Option>
                  <Select.Option value="Meditative">Meditative</Select.Option>
                  <Select.Option value="Mischievious">Mischievious</Select.Option>
                  <Select.Option value="Miserable">Miserable</Select.Option>
                  <Select.Option value="Negative">Negative</Select.Option>
                  <Select.Option value="Obstinate">Obstinate</Select.Option>
                  <Select.Option value="Optimistic">Optimistic</Select.Option>
                  <Select.Option value="Pained">Pained</Select.Option>
                  <Select.Option value="Paranoid">Paranoid</Select.Option>
                  <Select.Option value="Perplexed">Perplexed</Select.Option>
                  <Select.Option value="Prudish">Prudish</Select.Option>
                  <Select.Option value="Puzzled">Puzzled</Select.Option>
                  <Select.Option value="Regretful">Regretful</Select.Option>
                  <Select.Option value="Relieved">Relieved</Select.Option>
                  <Select.Option value="Sad">Sad</Select.Option>
                  <Select.Option value="Satisfied">Satisfied</Select.Option>
                  <Select.Option value="Shocked">Shocked</Select.Option>
                  <Select.Option value="Sheepish">Sheepish</Select.Option>
                  <Select.Option value="Smug">Smug</Select.Option>
                  <Select.Option value="Surly">Surly</Select.Option>
                  <Select.Option value="Surprised">Surprised</Select.Option>
                  <Select.Option value="Suspicious">Suspicious</Select.Option>
                  <Select.Option value="Sympathetic">Sympathetic</Select.Option>
                  <Select.Option value="Thoughtful">Thoughtful</Select.Option>
                  <Select.Option value="Undecided">Undecided</Select.Option>
                  <Select.Option value="Withdrawn">Withdrawn</Select.Option>
                </Select>
                {<ErrorMessage
                  name="emotions"
                  component="div"
                  className="text-danger"
                  // style={{ textAlign: "center" }}
                />}
              </AntForm.Item>

              <AntForm.Item layout={"vertical"} className="login-form ant-form" hidden={true}>
                <label htmlFor="bodyfeel">
                  How does your body feel?
                </label>
                <Field
                  name="bodyfeel"
                  type="text"
                  className="email-input ant-input"
                  placeholder="e.g. John"
                />
               <Select name="category" placeholder="Please select a body feel" onChange={onChangeHowDoesFeel}>
                  <Select.Option value="Unberably upset. Can not function">Unberably upset. Can not function</Select.Option>
                  <Select.Option value="Extremely distressed">Extremely distressed</Select.Option>
                  <Select.Option value="Very distressed. Trouble focusing.">Very distressed. Trouble focusing.</Select.Option>
                  <Select.Option value="Quite distressed. Discomfort interfering with functioning.">Quite distressed. Discomfort interfering with functioning.</Select.Option>
                  <Select.Option value="Moderate to strong distress.">Moderate to strong distress.</Select.Option>
                  <Select.Option value="Moderate distresss. Uncomfortable but still functional">Moderate distresss. Uncomfortable but still functional</Select.Option>
                  <Select.Option value="Mid to moderate distress.">Mid to moderate distress.</Select.Option>
                  <Select.Option value="Mid distress but able to function">Mid distress but able to function</Select.Option>
                  <Select.Option value="Slightly distressed, sad or anxious">Slightly distressed, sad or anxious</Select.Option>
                  <Select.Option value="No distress. Alert, concentrating.">No distress. Alert, concentrating.</Select.Option>
                  <Select.Option value="Peace. No distress. Complete Calm">Peace. No distress. Complete Calm</Select.Option>
                </Select>
                <ErrorMessage
                  name="suggestionTips"
                  component="div"
                  className="text-danger"
                  // style={{ textAlign: "center" }}
                />
              </AntForm.Item>
              <AntForm.Item>
                <label htmlFor="password" className="">
                  Add More Questions
                </label>
                <Row>
                  {addressCount.map((item, index) => {
                    const fieldName = `questions[${index}]`;
                    return (
                      <AddQuestionFieldComponent
                        fieldName={fieldName}
                        key={`questions-${item.id}`}
                        index={index}
                        item={item.id}
                        deleteMoreField={deleteMoreField}
                      />
                    );
                  })}

                <Col lg={3} className="d-flex">
                  <span className="plus-icon" onClick={addMoreField} style={{paddingTop: "1vh"}}>
                    <PlusOutlined size={15} />
                  </span>
                </Col>
              </Row>
              </AntForm.Item>
              <AntForm.Item>
                <Button
                  className="button-primary"
                  size="large"
                  type={"primary"}
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  Add
                </Button>
              </AntForm.Item>
            </Form>
          </Formik>
        </Modal>
      </>
    </>
  );
}
export function AddQuestionFieldComponent(props) {
  return (
    <>
      <Col lg={18} className="mt-2">
        <AntForm.Item>
          <Field
            name={`${props.fieldName}.question`}
            type="text"
            className="email-input ant-input"
            placeholder="Enter custom question here."
          />
        </AntForm.Item>
      </Col>
      <Col lg={3} className="d-flex">
        <span
          className="cross-icon"
          style={{paddingTop: "1vh", marginRight: "2px !important"}}
          onClick={props.deleteMoreField(props.item)}
        >  <DeleteOutlined size={15} />
        </span>
      </Col>
    </>
  );
}
