import React from 'react';
import { ParentComponentWithNavBar } from '../genericComponent/ParentComponentWithSideBar';
import { Button, Table } from 'react-bootstrap';
import AddNewGoal from './addNewGoal';
const userGoal = (props) => {
    return (
        <ParentComponentWithNavBar>
            <div className='row mt-5'>
                <div className='col-lg-12 d-flex justify-content-between mb-5'>
                    <div className='h4'><span className='avatar '></span>Leslie Jackson</div>
                    <AddNewGoal />
                </div>
                <div className='col-4'>
                    <div className='border p-3' style={{ borderRadius: 24 }}>
                        <p>Thoughts:</p>
                        <p>What they did ?</p>
                        <p>How they feel?</p>
                        <p>How they felt in their body?</p>
                        <p>other:</p>
                    </div>
                </div>
                <div className='col-4'>
                    <div className='border p-3' style={{ borderRadius: 24 }}>
                        <p>Thoughts:</p>
                        <p>What they did ?</p>
                        <p>How they feel?</p>
                        <p>How they felt in their body?</p>
                        <p>other:</p>
                    </div>
                </div>
                <div className='col-4'>
                    <div className='border p-3' style={{ borderRadius: 24 }}>
                        <p>Thoughts:</p>
                        <p>What they did ?</p>
                        <p>How they feel?</p>
                        <p>How they felt in their body?</p>
                        <p>other:</p>
                    </div>
                </div>

            </div>
        </ParentComponentWithNavBar >

    )
}

export default userGoal;

