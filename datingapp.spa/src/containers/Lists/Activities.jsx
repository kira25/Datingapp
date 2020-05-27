import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import alertify from 'alertifyjs';
import * as actions from '../../store/actions/actionsIndex';
import Form from '../../components/UI/Form'
import AddorEditActivitie from './AddorEditActivitie';

class Activities extends Component {
  state = {
    currentPage: 1,
    pageSize: 4,
    userActivities: null
  }

  componentDidMount() {
    const { currentPage, pageSize } = this.state;
    const { currentUser, onGetActivities } = this.props;

    const userActivities = { ...this.state.userActivities };
    onGetActivities(currentPage, pageSize, userActivities,currentUser.userId).then(() => {
      const { pagination, activities } = this.props;
      this.setState({ userActivities })
      this.setState({ currentPage: pagination.currentPage })
      console.log('activities', activities)
    }).catch(
      error => {
        if (this.props.error) {
          alertify.error('Problem getting activities')
          alertify.warning(this.props.error.response.statusText)
          this.props.history.push('/home')
        }
      }
    )


  }
  render() {



    return (<Fragment>
      <div className="container mt-4">

        <div className="row">
          <div className="col-sm-6">Lista de actividades</div>
        </div>

      </div>

    </Fragment>);
  }
}

const mapStateToProps = state => {
  return {
    activities: state.user.activities,
    currentUser: state.auth.currentUser,
    pagination: state.user.pagination,
    error: state.user.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetActivities: (pageNumber, pageSize, userActivities,userId) =>
      dispatch(actions.getActivities(pageNumber, pageSize, userActivities,userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Activities);
