import React from 'react';
import '../_styles/Header.css';
import { Row, Col, Menu, Icon, Dropdown} from 'antd';
import { PlusCircleOutlined, MenuOutlined} from '@ant-design/icons'
import Cookies from 'universal-cookie';

import { Link } from 'react-router-dom';
import Login from '../Auth/Login.js';
import Logout from '../Auth/Logout.js';
import Responsive from 'react-responsive';
const { SubMenu } = Menu;
const cookie = new Cookies();
import { connect } from 'react-redux';



// const Desktop = props => <Responsive {...props} maxWidth={992} />;
const Mobile = props => <Responsive {...props} maxWidth={991} />;


class Header extends React.Component {

  constructor(props) {
    super(props)

    this.state={
      current: '',
      user: ''
    }
  }

  componentDidMount() {
    const user = cookie.get("user") || "";
    if (user !== null) {
      this.setState({ user: user });
    }

  }

  handleClick = e => {
   this.setState({
     current: e.key,
   });
 };

  render() {
    const items  = [
      { label: 'Home', key: 'home' }, // remember to pass the key prop
      { label: 'Dashboard', key: 'dashboard' },
    ]
    return  (
      <div className='header-wrapper'>
        <Link to={'/'}>
          {// <img src='canvas-image.png' />
          }
          <h1>CanvasPad</h1>
        </Link>
        <Menu mode={'horizontal'} items={items} />
      </div>
    )
  }
}

function mapState(state) {
  return state
}

export default connect(mapState)(Header);
