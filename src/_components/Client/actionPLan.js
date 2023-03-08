import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ParentComponentWithNavBar } from "../genericComponent/ParentComponentWithSideBar";

export default function ActionPlan() {
    const [val, setVal] = useState(0)
    return (
        <ParentComponentWithNavBar>

            <div className="row mt-5">
                <div className="col-12 text-center">
                    <h6>Welcome Back, Alicia!</h6>
                    <h6 className="my-4">Here’s Your Action Plan for the week !</h6>
                </div>
                {
                    val === 0
                    &&
                    <>
                        <div className="col-12 text-center">
                            <h4>Here’s Your Action Plan To Improve Your Focus !</h4>
                            <p style={{ fontSize: 120 }}>30:00</p>
                            <h6>Ready to share How it felt?</h6>
                        </div>
                        <div className="col-12 my-5 text-center">
                            <Button className="btn-secondary1" onClick={() => setVal(1)}>Let's Go</Button>
                        </div>
                    </>
                }
                {
                    val === 1
                    &&
                    <>
                        <div className="col-12 text-center mt-5">
                            <h5>How do you feel from a scale 0-10 ?</h5>
                        </div>
                        <div className="col-12">
                            <div className="row justify-content-center">
                                <div className="col-3">
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Control as="textarea" rows={5} />
                                    </Form.Group>
                                    <Button className="btn-primary w-100" onClick={() => setVal(2)}>Next Question</Button>
                                </div>
                            </div>
                        </div>
                    </>
                }
                {
                    val === 2
                    &&
                    <>
                        <div className="col-12 text-center mt-5">
                            <h5>How does your body feel?</h5>
                        </div>
                        <div className="col-12">
                            <div className="row justify-content-center">
                                <div className="col-3">
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Control as="textarea" rows={5} />
                                    </Form.Group>
                                    <Button className="btn-primary w-100" onClick={() => setVal(3)}>Next Question</Button>
                                </div>
                            </div>
                        </div>
                    </>
                }
                {
                    val === 3
                    &&
                    <>
                        <div className="col-12 text-center mt-3">
                            <h6 className="my-2">Observe your_______</h6>
                            <h5>Do you have any additional observations that  you’d lke to share?</h5>
                        </div>
                        <div className="col-12">
                            <div className="row justify-content-center">
                                <div className="col-3">
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Control as="textarea" rows={5} />
                                    </Form.Group>
                                    <Button className="btn-primary w-100" onClick={() => setVal(4)}>Next Question</Button>
                                </div>
                            </div>
                        </div>
                    </>
                }
                {
                    val === 4
                    &&
                    <>
                        <div className="col-12 text-center mt-5">
                            <h6 className="my-2">Here’s a tip for improvement!</h6>
                        </div>
                        <div className="col-12 my-3 text-center">
                            <h2>Try to wake up a bit earlier next  time!</h2>
                        </div>
                    </>
                }
            </div>

        </ParentComponentWithNavBar >
    )
}
