import { Layout } from 'antd';
import React from 'react';
import Header from '../common/Header.js';

const {Footer, Sider, Content } = Layout;

import { useDispatch, useSelector } from 'react-redux';
import '../_styles/therapist_dashboard.css'


const PatientDashboard = (props) => {
  const {state} = useSelector((state) => state)

  const styles= {
    backgroundColor: 'pink'
  }
  return(
    <>
      <Header />
      <Layout className='page-wrapper'>
        <Sider theme='light' className='admin-home-content'>
          <h1>View Patient Data</h1>
        </Sider>
        <Content>
          <h1> Patient Main Page</h1>
          <p>Important information</p>
        </Content>
    </Layout>
    </>
  )
}

export default PatientDashboard;
