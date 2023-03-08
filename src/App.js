import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Login from "./_components/Auth/Login";
import PasswordResetConfirmation from "./_components/Auth/PasswordResetConfirmation";
import Register from "./_components/Auth/Register";
import ResetPassword from "./_components/Auth/ResetPassword";
import { TherapistRoute } from "./TherapistRoute.js";
import { PrivateRoute } from "./PrivateRoute";
import { RedirectRoute } from "./RedirectRoute";
import { AdminRoute } from "./AdminRoute";
import "./App.css";
import "antd/dist/antd.css";

import TherapistDashboard from "./_components/Therapist/Dashboard.js";
import NoComponentFound from "./_components/NoComponentFound.js";
import AdminDashboard from "./_components/Admin/AdminDashboard.js";
// import PatientDashboard from "./_components/Therapist/PatientDashboard.js";
import PatientDashboard from "./_components/Client/Dashboard.js";
import FormList from "./_components/Therapist/fromList";
import userGoal from "./_components/Therapist/userGoal";
import ClientLogin from "./_components/Client/clientLogin";
import ActionPlan from "./_components/Client/actionPLan";
import ActionPlanObservational from "./_components/Client/actionPlanObservational";
import PatientProfile from "./_components/Client/PatientProfile"
import PATHS from "./_helpers/path";
import AddGoalAnswers from "./_components/Client/AddGoalAnswers";
import Disclosures from "./_components/page/Disclosures";

const App = () => (
    <Switch>
      <RedirectRoute exact path="/" component={TherapistDashboard} />
      <Route exact path={PATHS.LOGIN} component={Login} />
      <Route exact path={'/PasswordResetConfirmation'} component={PasswordResetConfirmation} />
      <Route exact path={'/resetpassword/:token'} component={ResetPassword} />
      <Route exact path={PATHS.PATIENT_DASHBOARD} component={PatientDashboard} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/client" component={ClientLogin} />
      <Route exact path="/action-plan-directive" component={ActionPlan} />
      <Route exact path="/action-plan-observational" component={ActionPlanObservational}  />
      <TherapistRoute path="/patient/profile/:id" component={PatientProfile} />
      <Route exact path={PATHS.PATIENT_ADD_GOAL_ANSWERS} component={AddGoalAnswers}/>
      // Therapist Routes
      <TherapistRoute exact path={PATHS.THERAPIST_DASHBOARD} component={TherapistDashboard} />
      <TherapistRoute exact path={PATHS.THERAPIST_PATIENT_PROFILE} component={FormList}/>
      <TherapistRoute exact path="/goal" component={userGoal} />
      <AdminRoute exact path="/admin" component={AdminDashboard} />
      {/* <AdminRoute exact path="/disclosures" component={Disclosures} /> */}
      <Route path="/disclosures" component={Disclosures}/>
      <Route path="*" component={NoComponentFound} />

    </Switch>
);

export default App;
