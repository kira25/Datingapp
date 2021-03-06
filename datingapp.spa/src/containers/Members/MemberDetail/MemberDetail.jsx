import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col
} from 'reactstrap';
import alertify from 'alertifyjs';
import classnames from 'classnames';
import * as actions from '../../../store/actions/actionsIndex';
import UserCard from '../../../components/Cards/UserCard/UserCard';
import PhotoGallery from '../../../components/PhotoGallery/PhotoGallery';

class MemberDetail extends Component {
  state = {
    activeTab: '1'
  };

  async componentDidMount() {
    const { id: userId } = this.props.match.params;
    try {
      await this.props.onGetUser(userId);
    } catch (error) {
      alertify.error(error);
    }
  }

  handleToggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  };

  render() {
    const { user } = this.props;
    let userProfile = <p>Nothing to see here</p>;
    if (user) {
      userProfile = <h1>{user.knownAs}'s Profile</h1>;
    }
    let userCard = <p>User Information</p>;
    let tabTitle = 'About';
    let about = <p>Information about the user</p>;
    let interests = <p>User interests</p>;
    let photoGallery = <p>Photo Gallery</p>;
    if (user) {
      userCard = <UserCard user={user} />;
      tabTitle = 'About ' + user.knownAs;
      about = (
        <div className='card'>
          <div className='card-body'>
            <h4>Description</h4>
            <p>{user.introduction}</p>
            <h4>Looking For</h4>
            <p>{user.lookingFor}</p>
          </div>
        </div>
      );
      interests = (
        <div className='card'>
          <div className='card-body'>
            <h4>Interests</h4>
            <p>{user.interests}</p>
          </div>
        </div>
      );
      photoGallery = <PhotoGallery photos={user.photos} />;
    }

    return (
      <React.Fragment>
        <div className='container mt-4'>
          <div className='row'>{userProfile}</div>
        </div>
        <div className='row'>
          <div className='col-sm-4'>{userCard}</div>
          <div className='col-sm-8'>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames(
                    {
                      active: this.state.activeTab === '1'
                    },
                    {
                      'navlink-active': this.state.activeTab === '1'
                    }
                  )}
                  onClick={() => {
                    this.handleToggle('1');
                  }}
                >
                  {tabTitle}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames(
                    {
                      active: this.state.activeTab === '2'
                    },
                    {
                      'navlink-active': this.state.activeTab === '2'
                    }
                  )}
                  onClick={() => {
                    this.handleToggle('2');
                  }}
                >
                  Interes
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames(
                    {
                      active: this.state.activeTab === '3'
                    },
                    {
                      'navlink-active': this.state.activeTab === '3'
                    }
                  )}
                  onClick={() => {
                    this.handleToggle('3');
                  }}
                >
                  Photos
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId='1'>
                <Row>
                  <Col sm='12'>{about}</Col>
                </Row>
              </TabPane>
              <TabPane tabId='2'>
                <Row>
                  <Col sm='12'>{interests}</Col>
                </Row>
              </TabPane>
              <TabPane tabId='3'>
                <Row>
                  <Col sm='12'>{photoGallery}</Col>
                </Row>
              </TabPane>
            </TabContent>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
    user: state.user.user,
    decodedToken: state.auth.decodedToken,
    error: state.user.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetUser: id => dispatch(actions.getUser(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberDetail);
