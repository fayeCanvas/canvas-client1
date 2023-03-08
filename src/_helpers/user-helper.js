import axios from 'axios';
import authHeader from './auth-header';
import {API_ROOT} from './set_root'

const getUserDetails = async (id) => {
    const response = await axios.get(API_ROOT + `/api/patients/${id}`, {
        headers: authHeader(),
    });

    const patient = response.data.data.filter(item=>item._id === id)[0]
    return patient;
};

const UserHelper = {
    getUserDetails,
};

export default UserHelper;
