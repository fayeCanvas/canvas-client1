import React, { useEffect } from "react";
// import { notification } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { getUserRole } from "../../helpers";

import { Link } from "react-router-dom";
import PATHS from "../../_helpers/path";

import { ParentComponentWithNavBar } from "../genericComponent/ParentComponentWithSideBar";


const Disclosures = (props) => {
  const user = getUserRole();
  const dispatch = useDispatch();
  
  return (
    <ParentComponentWithNavBar>
      <div className="row mt-3">
        <h1>Disclosure content:</h1>
        <p>Canvas Planner (CP) is not meant to be used in place of therapy.  It is a tool that is linked to your current treatment.  Canvas planner is not a cure for symptoms.  Canvas planner is optimally used as a support for your existing treatment with your current treatment provider .  CP is a tool for tracking your experience of symptoms.  While the goal is to help decrease symptoms over time with the support of your therapy and CP, we recognize CP as one factor that may help to support your progress. </p> 
            <br />
        <p>In consenting to use CP, I acknowledge the limitations and recommended use of CP.</p>
      </div>
    </ParentComponentWithNavBar>
  );
};

export default Disclosures;
