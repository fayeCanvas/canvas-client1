import React, { useEffect, useState } from "react";
import { ParentComponentWithNavBar } from "../genericComponent/ParentComponentWithSideBar";
import AddNewForm from "./addNewForm";
import { useHistory, useParams } from "react-router-dom";
import { Button, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getGoalByPatientId,
  getQuestionsByGoalId,
  getUserDetailsById,
} from "../../_slices";
import PATHS from "../../_helpers/path";
import AddNewGoal from "./addNewGoal";
import ViewGoalModal from "./viewGoalModal";
import SendTreat from "./SendTreat.js";
import { CLIENT_ROOT } from '../../_helpers/set_root'
import axios from 'axios';
import moment from 'moment'

import "../_styles/patient_dashboard.css";

const FormList = (props) => {
  const [goalId, setGoalId] = useState(null);
  const [show, setShow] = useState(false);
  let history = useHistory();
  const dispatch = useDispatch();
  const { isLoading, patientGoals } = useSelector((state) => state.goal);
  const { userDetail } = useSelector((state) => state.userDetail);
  let param = useParams();
  useEffect(() => {
    dispatch(getGoalByPatientId(param?.id));
  }, [param?.id]);
  useEffect(() => {
    dispatch(getUserDetailsById(param?.id));
  }, [param?.id]);
  useEffect(() => {
    if (goalId !== undefined && goalId !== null) {
      dispatch(getQuestionsByGoalId(goalId));
    }
  }, [goalId]);
  const columns = [
    {
      title: "Goal",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Type",
      dataIndex: "goalType",
      key: "goalType",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "isCompleted",
      key: "isCompleted",
      align: "center",
      render: (text) => {
        return (
          <Tag color={text === true ? "green" : "red"}>
            {text === true ? "Completed" : "Not Completed"}
          </Tag>
        );
      },
    },
    {
      title: "Suggestions",
      dataIndex: "suggestionTips",
      key: "suggestionTips",
      align: "center",
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: 'createdAt',
      align: 'center',
      render: ((date) => {
        // console.log('date', date)
       date = moment(date).format("MM/DD/YYYY hh:mm")
        return date
      }),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "Action",
      align: "center",
      render: (text, row) => {
        return (
          <Button
            type="primary"
            className='button-tertiary'
            onClick={() => {
              setGoalId(row?._id);
              setShow(true);
            }}
          >
            View
          </Button>
        );
      },
    },
  ];

  return (
    <ParentComponentWithNavBar>

      { userDetail ?
          <>
            <div className="page-heading">
              <h1 className='h1-heading'>{userDetail?.firstName + " " + userDetail?.lastName} </h1>
            </div>
            <div className="patient-dashboard-subheading">
              <AddNewGoal />
              <a className='button-primary link-button' href={`${CLIENT_ROOT}/patient/profile/${userDetail?._id}`}> See Profile </a>
              <SendTreat user={userDetail} />
            </div>
            <div className="col-lg-12 mt-3">
              <Table
                className="user-table"
                columns={columns}
                loading={isLoading}
                dataSource={patientGoals}
              />
            </div>
          <ViewGoalModal setShow={setShow} show={show} />
        </>
      :
        <p>Loading...</p>
      }
    </ParentComponentWithNavBar>
  );
};

export default FormList;
