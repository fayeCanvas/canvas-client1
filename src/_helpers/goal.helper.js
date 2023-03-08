import axios from "axios";
import authHeader from "./auth-header";
import { API_ROOT } from './set_root'

const getGoalByPatientId = async (id) => {
  // let token = authHeader();
  const response = await axios.get(API_ROOT + '/api/' + `goals/${id}`, {
    headers: authHeader(),
  });
  return response.data.data;
};

const getQuestionsByGoalId = async (id) => {
  const response = await axios.get(API_ROOT + '/api/' + `goalQuestions/${id}`, {
    headers: authHeader(),
  });
   ;

  return response.data.data;
};
const addGoalAnswer = async (data) => {
  // let token = authHeader();
  const response = await axios.put(
    API_ROOT + '/api/' + `goalQuestions/${data.id}`,
    { answer: data.answer },
    {
      headers: authHeader(),
    }
  );

  return response.data.data;
};
const markGoalAsCompleted = async (id) => {
  // let token = authHeader();
   ;
  const response = await axios.get(API_ROOT + '/api/' + `goals/goalCompleted/${id}`, {
    headers: authHeader(),
  });
   ;
  return response.data.data;
};


const createGoals = async (data) => {
  const response = await axios.post(API_ROOT + '/api/' + `goals`, data, {
    headers: authHeader(),
  })
  return response.data.data;
};


const GoalHelper = {
  getGoalByPatientId,
  getQuestionsByGoalId,
  addGoalAnswer,
  markGoalAsCompleted,
  createGoals
};

export default GoalHelper;
