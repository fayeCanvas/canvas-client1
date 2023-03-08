import React, { useEffect } from "react";
import { Button, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ParentComponentWithNavBar } from "../genericComponent/ParentComponentWithSideBar";
import { getGoalByPatientId } from "../../_slices";
import PATHS from "../../_helpers/path";

export default function PatientDashboard() {
  let { user } = useSelector((state) => state.auth);
  const { patientGoals, isLoading } = useSelector((state) => state.goal);
  if (user && user?.id) {
    user = user
  } else {
    user = user.user
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGoalByPatientId(user._id));
  }, []);

  const patientGoals_type = patientGoals.map((dt) =>
  <li>{dt.goalType}</li>
  );

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
      sorter: (a, b) => a.createdDate - b.createdDate,
    sortDirections: ['descend'],
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "Action",
      align: "center",
      render: (text, row) => {
        return (


          <Link to={{pathname:PATHS.PATIENT_ADD_GOAL_ANSWERS.replace(":id", row._id), state: {name: row.name}}}>
            <Button type="primary" className='button-tertiary' disabled={row.isCompleted}>
              Answer
            </Button>
          </Link>
        );
      },
    },
  ];

  const data = [];
  return (
    <ParentComponentWithNavBar>
      <div className="row mt-3">
        <div className="col-12 text-center">
          <h2>Welcome Back {user?.firstName}</h2>
        </div>
        <div className="col-lg-12 d-flex justify-content-end align-items-center">
        </div>
        <div className="col-lg-12 mt-3">
          <Table
            className="user-table"
            columns={columns}
            loading={isLoading}
            dataSource={patientGoals}
          />
        </div>
      </div>

    </ParentComponentWithNavBar>
  );
}
