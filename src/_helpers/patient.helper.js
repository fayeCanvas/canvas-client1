import axios from "axios";
import authHeader from "./auth-header";
import { API_ROOT } from './set_root';

const getAllPatients = async (user) => {
  try {
    const response = await axios.get(`${API_ROOT}/api/therapist/patients/${user._id}`, {
      headers: authHeader(),
    });
    return response.data.data;

  } catch (err) {
    return err
  }
};

const addPatient = async (patient) => {
    const response = await axios.post(`${API_ROOT}/api/patients`, patient, {
    headers: authHeader(),
  });

  return response.data.data;
};

const PatientHelper = {
  getAllPatients,
  addPatient,
};

export default PatientHelper;
