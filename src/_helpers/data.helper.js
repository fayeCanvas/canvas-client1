import axios from 'axios';
import authHeader from './auth-header';
import { API_ROOT } from './set_root'

const getPublicContent = () => {
  return axios.get(API_ROOT + "all");
  // const API_URL = "http://localhost:5001/api/"
}

// const getPublicContent = () => {
//   return axios.get(API_URL + "all");
// };

const getPatientBoard = () => {
  return axios.get(API_ROOT + "patient", { headers: authHeader() });
}

const getTherapistBoard = () => {
  return axios.get(API_ROOT + "therapist", { headers: authHeader() });
}

const getAdminBoard = () => {
  return axios.get(API_ROOT + "admin", { headers: authHeader() });
}

const addPatient = (data) => {
  return axios.post(API_ROOT + '/api/' + "patients", data, { headers: authHeader() });
}

const userHelper = {
  getPublicContent,
  getPatientBoard,
  getTherapistBoard,
  getAdminBoard,
  addPatient
};

export default userHelper;
