import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ParentComponentWithNavBar } from "../genericComponent/ParentComponentWithSideBar";

export default function ActionPlanObservational() {
    const [val, setVal] = useState(0)
    return (
        <ParentComponentWithNavBar>

            <div className="row mt-5">
                <div className="col-12 text-center">
                    <h6>Welcome Back, Alicia!</h6>
                    <h6 className="my-4">Here’s Your Action Plan for the week !</h6>
                    <h6 className="my-2">Observe how you feel when you wake up in the morning</h6>
                </div>
                {
                    val === 0
                    &&
                    <>
                        <div className="col-12 text-center mt-5">
                            <h5>What are your thoughts?</h5>
                        </div>
                        <div className="col-12">
                            <div className="row justify-content-center">
                                <div className="col-3">
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Control as="textarea" rows={5} />
                                    </Form.Group>
                                    <Button className="btn-primary w-100" onClick={() => setVal(1)}>Next Question</Button>
                                </div>
                            </div>
                        </div>
                    </>
                }
                {
                    val === 1
                    &&
                    <>
                        <div className="col-12 text-center mt-5">
                            <h5>What did you do?</h5>
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
                            <h5>How do you feel from a scale 0-10 ??</h5>
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
                        <div className="col-12 text-center mt-5">
                            <h5>How does your body feel?</h5>
                        </div>
                        <div className="col-12 ">
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
                            <h5>Do you have any additional observations ?</h5>
                        </div>
                        <div className="col-12 ">
                            <div className="row justify-content-center">
                                <div className="col-3">
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Control as="textarea" rows={5} />
                                    </Form.Group>
                                    <Button className="btn-primary w-100" onClick={() => setVal(5)}>Next Question</Button>
                                </div>
                            </div>
                        </div>
                    </>
                }
                {
                    val === 5
                    &&
                    <>
                        <div className="col-12 text-center mt-5">
                            <h6 className="my-2">Thank you for your submission!</h6>
                        </div>
                    </>
                }
            </div>

        </ParentComponentWithNavBar >
    )
}
