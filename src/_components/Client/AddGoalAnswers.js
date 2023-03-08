import { useDispatch, useSelector } from "react-redux";
import { Form as AntForm, Button,  Radio } from "antd";
import { ParentComponentWithNavBar } from "../genericComponent/ParentComponentWithSideBar";
import { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Select } from 'antd';
import {
  addGoalAnswer,
  getQuestionsByGoalId,
  markGoalAsCompleted,
} from "../../_slices";
import { useHistory, useParams,useLocation } from "react-router-dom";
import * as Yup from "yup";
import Swal from "sweetalert2";
import PATHS from "../../_helpers/path";

import PomView from "../Client/PomView";
import { select } from "react-cookies";


export default function AddGoalAnswers(props) {
  const { user } = useSelector((state) => {
      return  state.auth
    });
  const { goalsQuestions } = useSelector((state) => state.goal);
  const params = useParams();

  const [isShow, setIsShow] = React.useState(false);
  const {name} = useLocation()
  const dispatch = useDispatch();
  const history = useHistory();
  const [questionData, setQuestionData] = useState({
    currentIndex: 0,
    goal: null,
  });

  const initialValues = {
    answer: "",
  };
  const validationSchema = Yup.object().shape({
    answer: Yup.string().required("Please enter answer"),
  });

  useEffect(() => {
    dispatch(getQuestionsByGoalId(params.id));
  }, []);

  useEffect(() => {
     ;
    if (goalsQuestions.length > 0) {
      let obj = {
        currentIndex: 0,
        goal: goalsQuestions[0],
      };
      setQuestionData(obj);
    }
  }, [goalsQuestions]);

  useEffect(() => {
    if (questionData.goal?.goalId?.goalType == 'Observational') {
      setIsShow(true)
    }
  })

  const onGoalCompleted = () => {
    Swal.fire({
      title: "Goal Completed!",
      text: "",
      icon: "success",
      confirmButtonColor: "#3085d6",
    }).then((result) => {
      history.push(PATHS.PATIENT_DASHBOARD);
    });
  };
  const answerSubmitCallback = () => {
     ;
    if (questionData.currentIndex < goalsQuestions.length - 1) {
       ;

      let obj = {
        currentIndex: questionData.currentIndex + 1,
        goal: goalsQuestions[questionData.currentIndex + 1],
      };
      setQuestionData(obj);
    } else if (questionData.currentIndex === goalsQuestions.length - 1) {
       ;
      dispatch(
        markGoalAsCompleted({ id: params.id, callBackFun: onGoalCompleted })
      );
    }
  };
  const onHandleAnswer = (answer, resetForm) => {
    let payload = {
      id: questionData.goal._id,
      answer: answer,
    };
    dispatch(addGoalAnswer({ payload, resetForm, answerSubmitCallback }));
  };

  const readyToShare = () => {
    setIsShow(!isShow);
  };
  if (questionData.goal == null) {
    return (
      <ParentComponentWithNavBar>
        <p>Please wait..</p>
      </ParentComponentWithNavBar>
    )
  } else {
    return (
        <ParentComponentWithNavBar>
          <div className="row mt-3">
            <div className="col-12 text-center">
              { (isShow == false) ?
                <div className="counter_section">
                  <div className="col-12 text-center">
                    <h5 className="count-header"><span>{`${props.location?.state?.name ? `Your focus: ${props.location.state.name}` : 'Focus...'}`}</span> </h5>
                    <div className="col-5 m-auto">
                      <div className="row justify-content-center">
                        <PomView readytoShare={readyToShare} timer={questionData.goal.goalId.activityTake} />
                      </div>
                    </div>
                  </div>

                  <button className="button-tertiary" id='time-button-ready' onClick={readyToShare}>Ready to share how it felt?</button>
                </div>
                :
                  <div className="col-12 text-center">
                    <div className="col-5 m-auto">
                      <div className="row justify-content-center">
                        <div className="col-12 text-center mt-5">
                          <h5>{questionData?.goal?.question}</h5>
                        </div>
                        <div className="col-12 mt-2">
                          <Formik
                            initialValues={initialValues}
                            // validationSchema={validationSchema}
                            onSubmit={(values, { resetForm }) => {
                              // const onSuccessCallback = async () => {
                              //   await sleep();
                              //   resetForm();
                              // };
                              onHandleAnswer(values.answer, resetForm);
                              // dispatch(
                              //   addCareGiverAction(finalValues, onSuccessCallback)
                              // );
                            }}
                          >
                            <Form className="">
                              <AntForm.Item
                                layout={"vertical"}
                                className="login-form ant-form"
                              >
                                {questionData?.goal?.question == "What emotions are you experiencing?" ?
                                  <div>
                                  <Select name="answer"
                                    className=""
                                    placeholder="Please select a emotions">
                                      <Option value="Aggressive">Aggressive</Option>
                                      <Option value="Agonized">Agonized</Option>
                                      <Option value="Anxious">Anxious</Option>
                                      <Option value="Apologetic">Apologetic</Option>
                                      <Option value="Arrogant">Arrogant</Option>
                                      <Option value="Bashful">Bashful</Option>
                                      <Option value="Blissful">Blissful</Option>
                                      <Option value="Bored">Bored</Option>
                                      <Option value="Cautious">Cautious</Option>
                                      <Option value="Cold">Cold</Option>
                                      <Option value="Concentrating">Concentrating</Option>
                                      <Option value="Confident">Confident</Option>
                                      <Option value="Curious">Curious</Option>
                                      <Option value="Demure">Demure</Option>
                                      <Option value="Determined">Determined</Option>
                                      <Option value="Disappointed">Disappointed</Option>
                                      <Option value="Disapproving">Disapproving</Option>
                                      <Option value="Disbeliving">Disbeliving</Option>
                                      <Option value="Disgusting">Disgusting</Option>
                                      <Option value="Distasteful">Distasteful</Option>
                                      <Option value="Eavesdropping">Eavesdropping</Option>
                                      <Option value="Ecstatic">Ecstatic</Option>
                                      <Option value="Energized">Energized</Option>
                                      <Option value="Enraged">Enraged</Option>
                                      <Option value="Apologetic">Apologetic</Option>
                                      <Option value="Envious">Envious</Option>
                                      <Option value="Exasperated">Exasperated</Option>
                                      <Option value="Exhausted">Exhausted</Option>
                                      <Option value="Frightened">Frightened</Option>
                                      <Option value="Frustrated">Frustrated</Option>
                                      <Option value="Grieving">Grieving</Option>
                                      <Option value="Guilty">Guilty</Option>
                                      <Option value="Happy">Happy</Option>
                                      <Option value="Horrified">Horrified</Option>
                                      <Option value="Hot">Hot</Option>
                                      <Option value="Hungover">Hungover</Option>
                                      <Option value="Hurt">Hurt</Option>
                                      <Option value="Hysterical">Hysterical</Option>
                                      <Option value="Indiffferent">Indiffferent</Option>
                                      <Option value="Idiotic">Idiotic</Option>
                                      <Option value="Innocent">Innocent</Option>
                                      <Option value="Interested">Interested</Option>
                                      <Option value="Jealous">Jealous</Option>
                                      <Option value="Joyful">Joyful</Option>
                                      <Option value="Loaded">Loaded</Option>
                                      <Option value="Lonely">Lonely</Option>
                                      <Option value="Lovestruck">Lovestruck</Option>
                                      <Option value="Meditative">Meditative</Option>
                                      <Option value="Mischievious">Mischievious</Option>
                                      <Option value="Miserable">Miserable</Option>
                                      <Option value="Negative">Negative</Option>
                                      <Option value="Obstinate">Obstinate</Option>
                                      <Option value="Optimistic">Optimistic</Option>
                                      <Option value="Pained">Pained</Option>
                                      <Option value="Paranoid">Paranoid</Option>
                                      <Option value="Perplexed">Perplexed</Option>
                                      <Option value="Prudish">Prudish</Option>
                                      <Option value="Puzzled">Puzzled</Option>
                                      <Option value="Regretful">Regretful</Option>
                                      <Option value="Relieved">Relieved</Option>
                                      <Option value="Sad">Sad</Option>
                                      <Option value="Satisfied">Satisfied</Option>
                                      <Option value="Shocked">Shocked</Option>
                                      <Option value="Sheepish">Sheepish</Option>
                                      <Option value="Smug">Smug</Option>
                                      <Option value="Surly">Surly</Option>
                                      <Option value="Surprised">Surprised</Option>
                                      <Option value="Suspicious">Suspicious</Option>
                                      <Option value="Sympathetic">Sympathetic</Option>
                                      <Option value="Thoughtful">Thoughtful</Option>
                                      <Option value="Undecided">Undecided</Option>
                                      <Option value="Withdrawn">Withdrawn</Option>
                                  </Select>
                                  </div>
                                  :
                                 <>
                                  {questionData?.goal?.question.includes("How does your body feel") || questionData?.goal?.question.includes("How did your body feel")  ? <>
                                    <div>
                                      <Select name="answer"
                                      className=""
                                      placeholder="Please select a body feel">
                                          <Option value="Unbearably upset. Can not function">Unbearably upset. Can not function</Option>
                                          <Option value="Extremely distressed">Extremely distressed</Option>
                                          <Option value="Very distressed. Trouble focusing.">Very distressed. Trouble focusing.</Option>
                                          <Option value="Quite distressed. Discomfort interfering with functioning.">Quite distressed. Discomfort interfering with functioning.</Option>
                                          <Option value="Moderate to strong distress.">Moderate to strong distress.</Option>
                                          <Option value="Moderate distresss. Uncomfortable but still functional">Moderate distresss. Uncomfortable but still functional</Option>
                                          <Option value="Mid to moderate distress.">Mid to moderate distress.</Option>
                                          <Option value="Mid distress but able to function">Mid distress but able to function</Option>
                                          <Option value="Slightly distressed, sad or anxious">Slightly distressed, sad or anxious</Option>
                                          <Option value="No distress. Alert, concentrating.">No distress. Alert, concentrating.</Option>
                                          <Option value="Peace. No distress. Complete Calm">Peace. No distress. Complete Calm</Option>
                                      </Select>
                                    </div>
                                    </>
                                    : <>
                                        {questionData?.goal?.question.includes("What physical sensations are you experiencing?") ? <>
                                      <div>
                                      <Select name="answer"
                                        className=""
                                        placeholder="Please select a sensations below">
                                        <Option value="Achy">Achy</Option>
                                        <Option value="Airy">Airy</Option>
                                        <Option value="Alive">Alive</Option>
                                        <Option value="Bloated">Bloated</Option>
                                        <Option value="Blocked">Blocked</Option>
                                        <Option value="Breathless">Breathless</Option>
                                        <Option value="Brittle">Brittle</Option>
                                        <Option value="Bubbly">Bubbly</Option>
                                        <Option value="Burning">Burning</Option>
                                        <Option value="Buzzing">Buzzing</Option>
                                        <Option value="Chilled">Chilled</Option>
                                        <Option value="Clammy">Clammy</Option>
                                        <Option value="Closed">Closed</Option>
                                        <Option value="Cold">Cold</Option>
                                        <Option value="Congested">Congested</Option>
                                        <Option value="Constricted">Constricted</Option>
                                        <Option value="Constricted Breathing">Constricted Breathing</Option>
                                        <Option value="Contracted">Contracted</Option>
                                        <Option value="Cool">Cool</Option>
                                        <Option value="Cozy">Cozy</Option>
                                        <Option value="Cramped">Cramped</Option>
                                        <Option value="Dense">Dense</Option>
                                        <Option value="Dizzy">Dizzy</Option>
                                        <Option value="Dull">Dull</Option>
                                        <Option value="Flexible">Flexible</Option>
                                        <Option value="Electric">Electric</Option>
                                        <Option value="Empty">Empty</Option>
                                        <Option value="Energized">Energized</Option>
                                        <Option value="Faint">Faint</Option>
                                        <Option value="Fluid">Fluid</Option>
                                        <Option value="Flushed">Flushed</Option>
                                        <Option value="Fluttery">Fluttery</Option>
                                        <Option value="Frantic">Frantic</Option>
                                        <Option value="Frozen">Frozen</Option>
                                        <Option value="Full">Full</Option>
                                        <Option value="Fuzzy">Fuzzy</Option>
                                        <Option value="Goose Bumpy">Goose Bumpy</Option>
                                        <Option value="Hard">Hard</Option>
                                        <Option value="Heavy">Heavy</Option>
                                        <Option value="Hot">Hot</Option>
                                        <Option value="Icy">Icy</Option>
                                        <Option value="Intense">Intense</Option>
                                        <Option value="Itchy">Itchy</Option>
                                        <Option value="Cloudy">Cloudy</Option>
                                        <Option value="Jittery">Jittery</Option>
                                        <Option value="Jumbly">Jumbly</Option>
                                        <Option value="Jumpy">Jumpy</Option>
                                        <Option value="Knotted">Knotted</Option>
                                        <Option value="Light">Light</Option>
                                        <Option value="Limp">Limp</Option>
                                        <Option value="Loose">Loose</Option>
                                        <Option value="Nauseous">Nauseous</Option>
                                        <Option value="Numb">Numb</Option>
                                        <Option value="Open">Open</Option>
                                        <Option value="Paralyzed">Paralyzed</Option>
                                        <Option value="Pounding">Pounding</Option>
                                        <Option value="Pressure">Pressure</Option>
                                        <Option value="Prickly">Prickly</Option>
                                        <Option value="Puffy">Puffy</Option>
                                        <Option value="Pulled">Pulled</Option>
                                        <Option value="Pulsing">Pulsing</Option>
                                        <Option value="Quaking">Quaking</Option>
                                        <Option value="Quiet">Quiet</Option>
                                        <Option value="Quivering">Quivering</Option>
                                        <Option value="Radiating">Radiating</Option>
                                        <Option value="Ragged">Ragged</Option>
                                        <Option value="Raw">Raw</Option>
                                        <Option value="Shaky">Shaky</Option>
                                        <Option value="Sharpness">Sharpness</Option>
                                        <Option value="Shimmering">Shimmering</Option>
                                        <Option value="Shivery">Shivery</Option>
                                        <Option value="Shudder">Shudder</Option>
                                        <Option value="Silky">Silky</Option>
                                        <Option value="Smooth">Smooth</Option>
                                        <Option value="Soft">Soft</Option>
                                        <Option value="Spacious">Spacious</Option>
                                        <Option value="Spacious Breathing">Spacious Breathing</Option>
                                        <Option value="Spasming">Spasming</Option>
                                        <Option value="Sticky">Sticky</Option>
                                        <Option value="Still">Still</Option>
                                        <Option value="Strong">Strong</Option>
                                        <Option value="Suffocating">Suffocating</Option>
                                        <Option value="Sweaty">Sweaty</Option>
                                        <Option value="Tender">Tender</Option>
                                        <Option value="Tense">Tense</Option>
                                        <Option value="Throbbing">Throbbing</Option>
                                        <Option value="Tickly">Tickly</Option>
                                        <Option value="Tight">Tight</Option>
                                        <Option value="Tightness of skin">Tightness of skin</Option>
                                        <Option value="Tingling">Tingling</Option>
                                        <Option value="Trembling">Trembling</Option>
                                        <Option value="Twitchy">Twitchy</Option>
                                        <Option value="Vibration">Vibration</Option>
                                        <Option value="Warm">Warm</Option>
                                        <Option value="Weak">Weak</Option>
                                        <Option value="Wobbly">Wobbly</Option>
                                      </Select>
                                    </div>
                                    </>
                                  :
                                    <>
                                      {questionData?.goal?.question.includes("How do you feel from a scale of 0-10")  ?
                                      <>
                                        <div>
                                          <Radio.Group name="radiogroup" defaultValue={1}>
                                            <Radio value={1}>1</Radio>
                                            <Radio value={2}>2</Radio>
                                            <Radio value={3}>3</Radio>
                                            <Radio value={4}>4</Radio>
                                            <Radio value={5}>5</Radio>
                                            <Radio value={6}>6</Radio>
                                            <Radio value={7}>7</Radio>
                                            <Radio value={8}>8</Radio>
                                            <Radio value={9}>9</Radio>
                                            <Radio value={10}>10</Radio>
                                          </Radio.Group>
                                        </div>
                                    </>  :
                                    <>
                                      <Field
                                        name="answer"
                                        type="textarea"
                                        className="email-input ant-input"
                                        placeholder="type your answer here"
                                        />
                                    </> }
                                   </> }
                                  </>
                                }</>
                                }
                                <ErrorMessage
                                  name="answer"
                                  component="div"
                                  className="text-danger"
                                  // style={{ textAlign: "center" }}
                                />
                              </AntForm.Item>
                              <AntForm.Item>
                                <Button
                                  className="button-primary"
                                  size="large"
                                  type={"primary"}
                                  htmlType="submit"
                                  style={{ width: "100%" }}
                                >
                                  {questionData?.currentIndex ===
                                  goalsQuestions?.length - 1
                                    ? "Submit"
                                    : "Next Question"}
                                </Button>
                              </AntForm.Item>
                            </Form>
                          </Formik>

                          <stopwatch name="timer1"/>
                          <stopwatch name="timer1" action="elapsed"/>
                          <stopwatch name="timer1" action="total"/>
                        </div>
                      </div>
                    </div>
                  </div>
                }
            </div>
          </div>
        </ParentComponentWithNavBar>
      )
  }
}
