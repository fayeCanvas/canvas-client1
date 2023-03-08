import React from 'react';
import { ParentComponentWithNavBar } from "../genericComponent/ParentComponentWithSideBar";
import {Button, Modal, Form, message, Input} from 'antd';
import '../_styles/profile.css';
import { API_ROOT } from '../../_helpers/set_root'
import axios from 'axios';

class PatientProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      profile: {},
      loading: true,
      isModalOpen: false,
    }
    this.showModal = this.showModal.bind(this)
    this.updateProfile = this.updateProfile.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.loadProfile(this.props.match.params.id)
  }

  showModal() {
    this.setState({isModalOpen: !this.state.isModalOpen})
  }

  loadProfile() {
    axios.get(`${API_ROOT}/api/patient/profile/${this.props.match.params.id}`)
    .then((profile) => {
      let myprofile;
      if (profile.data.length === 0) {
        myprofile = {}
      } else {
        myprofile = profile.data[0]
      }
      this.setState({profile: myprofile, loading: false})
    }).catch((err) => {
      this.setState({error: err, loading: false})
    })
  }

  updateProfile(e) {
    let profile = {
      firstName: this.state.profile.user.firstName,
      lastName: this.state.profile.user.lastName,
      gender:this.state.profile.gender,
      birthday: this.state.profile.birthday,
      diagnosis:this.state.profile.diagnosis,
      goals: this.state.profile.goals,
      strengths: this.state.profile.strengths,
      challenges: this.state.profile.challenges,
      location: this.state.profile.location,
      user: this.props.match.params.id
    }
    axios.post(`${API_ROOT}/api/patient/profile/${this.props.match.params.id}`,profile)
    .then((profile) => {
      this.setState({profile: profile.data})
      this.showModal()
    }).catch((err) => {
      this.setState({error: err})
    })
  }

  handleChange(e) {
    let name= e.target.id
    let field = this.state.profile[name]
    let profile = this.state.profile
    profile[name] = e.target.value
    this.setState({profile: profile})
  }


  render() {
    return (
      <ParentComponentWithNavBar>
       {this.state.loading ?
         <>Please Wait While Content Loads</>
         :
        <>
          <div className='profile-header-wrapper'>
            <h4>{this.state.profile.user ? `${this.state.profile.user.firstName}'s` : ""} Profile</h4>
            <Button onClick={() => this.showModal()}>Edit Profile</Button>
          </div>
          <p className='profile-label'><span id='profile-label-title'>First Name:</span> {this.state.profile.user.firstName ? this.state.profile.user.firstName : 'None Provided'} </p>
          <p className='profile-label'><span id='profile-label-title'>Last Name:</span> {this.state.profile.user.lastName ? this.state.profile.user.lastName : 'None Provided'} </p>
          <p className='profile-label'><span id='profile-label-title'>Birthday:</span> {this.state.profile.birthday ? this.state.profile.birthday : 'None Provided'} </p>
          <p className='profile-label'><span id='profile-label-title'>Gender:</span> {this.state.profile.gender ? this.state.profile.gender : 'None Provided'} </p>
          <p className='profile-label'><span id='profile-label-title'>Diagnosis:</span> {this.state.profile.diagnosis ? this.state.profile.diagnosis : 'None Provided'} </p>
          <p className='profile-label'><span id='profile-label-title'>Goals:</span> {this.state.profile.goals ? this.state.profile.goals : 'None Provided'} </p>
          <p className='profile-label'><span id='profile-label-title'>Strengths:</span> {this.state.profile.strengths ? this.state.profile.strengths : 'None Provided'} </p>
          <p className='profile-label'><span id='profile-label-title'>Challenges:</span> {this.state.profile.challenges ? this.state.profile.challenges : 'None Provided'} </p>
          <p className='profile-label'><span id='profile-label-title'>Location:</span> {this.state.profile.location ? this.state.profile.location : 'None Provided'} </p>

          <Modal
            visible={this.state.isModalOpen}
            footer={null}
            mask={true}
            maskClosable={true}
            closable={true}
            >
            <h1>Edit Profile</h1>
            <Form onFinish={() => this.updateProfile()}>
              <Form.Item
                name="firstName"
                label='First Name'
                initialValue={this.state.profile.user.firstName ? this.state.profile.user.firstName : ''}>
                <Input onChange={this.handleChange}/>
              </Form.Item>
              <Form.Item
                name="lastName"
                label='Last Name'
                initialValue={this.state.profile.user.lastName ? this.state.profile.user.lastName : ''}>
                <Input/>
              </Form.Item>
              <Form.Item
                name="birthday"
                label='Birthday'
                initialValue={this.state.profile.birthday ? this.state.profile.birthday : ''}>
                <Input onChange={this.handleChange}/>
              </Form.Item>
              <Form.Item
                name="gender"
                label='Gender'
                initialValue={this.state.profile.gender ? this.state.profile.gender : ''}>
                <Input onChange={this.handleChange}/>
              </Form.Item>
              <Form.Item
                name="diagnosis"
                label='Diagnosis'
                initialValue={this.state.profile.diagnosis ? this.state.profile.diagnosis : ''}>
                <Input onChange={this.handleChange}/>
              </Form.Item>
              <Form.Item
                name="goals"
                label='Goals'
                initialValue={this.state.profile.goals ? this.state.profile.goals : ''}>
                <Input onChange={this.handleChange}/>
              </Form.Item>
              <Form.Item
                name="strengths"
                label='Strengths'
                initialValue={this.state.profile.strengths ? this.state.profile.strengths : ''}>
                <Input onChange={this.handleChange}/>
              </Form.Item>
              <Form.Item
                name="challenges"
                label='Challenges'
                initialValue={this.state.profile.challenges ? this.state.profile.challenges : ''}>
                <Input onChange={this.handleChange}/>
              </Form.Item>
              <Form.Item
                name="location"
                label='Location'
                initialValue={this.state.profile.location ? this.state.profile.location : ''}>
                <Input onChange={this.handleChange}/>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="button-tertiary" style={{ width: "100% !important" }}>
                  Update Profile
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </>
      }

      </ParentComponentWithNavBar>
    )
  }
}



export default PatientProfile;
