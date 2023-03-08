import React, { useEffect } from "react";
// import { notification } from "antd";
import { ParentComponentWithNavBar } from "../genericComponent/ParentComponentWithSideBar";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUserRole } from "../../helpers";
import AddNewPatient from "./addNewPatientModal";
import { getAllPatients } from "../../_slices";
import { Link } from "react-router-dom";
import PATHS from "../../_helpers/path";

const TherapistDashboard = (props) => {
  const user = getUserRole();
  const dispatch = useDispatch();
  const { patients, isLoading } = useSelector((state) => state.patients);
  useEffect(async() => {
   await dispatch(getAllPatients(user));
  }, []);

  const columns = [
    {
      title: "Patient Name",
      dataIndex: "firstName",
      key: "firstName",
      render: (text, row) => {
        return (
            <Link key={`${row._id}`} to={PATHS.THERAPIST_PATIENT_PROFILE.replace(":id", row?._id)}>{row.firstName + " " + row.lastName}</Link>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];

  const noPatientcolumns = [
    {
      title: "Add your first patient by clicking the 'Add New Patient' button",
      dataIndex: "email",
      key: "email",
    },
  ];

  return (
    <ParentComponentWithNavBar>
      <div className="row mt-3">
        <div className="col-lg-12 d-flex justify-content-end align-items-center">
          {/* <p>View All Patients</p > /} */}
          < AddNewPatient />
          {/* <Button variant="primary" size="sm">Add New Patients</Button>  */}
        </div>
        <div className="col-lg-12 mt-3">
        {/* {isLoading ? 'loading' :  */}
        {isLoading == false  ?
          <Table
            className="user-table"
            columns={columns}
            loading={isLoading}
            dataSource={patients}
          />
          :
          <Table
            className="user-table-patient"
            columns={noPatientcolumns}
          />
        }
        {/* } */}
        </div>
      </div>
    </ParentComponentWithNavBar>
  );
};

export default TherapistDashboard;
