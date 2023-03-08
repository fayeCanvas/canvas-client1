import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../_slices/auth';
import { Button } from 'antd';

const Logout = (props) => {

  const dispatch = useDispatch();

  const handleLogout = () => {
    console.log('logging out')
    dispatch(logout())
  }
  return(
      <Button
        className="button-primary"
        id="logout-btn"
        size='large'
        type={'primary'}
        htmlType="button"
        style={{width: "100%"}}
        onClick={handleLogout}>
        Logout
      </Button>
  );
}

export default Logout;
