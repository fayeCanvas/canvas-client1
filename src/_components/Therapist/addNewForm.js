import React, { useState } from 'react';
import { Button, Form, } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

export default function AddNewForm() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <h6 onClick={handleShow} style={{ cursor: 'pointer' }}><u>Add New Form</u></h6>
            <Modal show={show} onHide={handleClose} className="custom-modal">
                <Modal.Body>
                    <div className='row'>
                        <div className='col-12 text-center h6 my-4'>Add New Goal</div>
                        <div className='col-12'>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Thoughts</Form.Label>
                                    <Form.Control type="text" placeholder="Describe..." />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>What they did:</Form.Label>
                                    <Form.Control type="text" placeholder="Describe..." />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>How they feel:</Form.Label>
                                    <Form.Control type="text" placeholder="Describe..." />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>How they felt in their body:</Form.Label>
                                    <Form.Control type="text" placeholder="Describe..." />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Other:</Form.Label>
                                    <Form.Control type="text" placeholder="Describe..." />
                                </Form.Group>

                            </Form>
                        </div>
                    </div>
                    <div className='row my-4'>
                        <div className='col-12 d-flex justify-content-center'>
                            <Button className="mx-1" variant="secondary" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button className="mx-1" variant="primary" onClick={handleClose}>
                                Add Form
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
