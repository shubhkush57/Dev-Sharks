import React, { useEffect, useState ,useNavigate} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserCreatedGroups from '../features/GetUserCreatedGroups';
import axios from 'axios';
import { Card, Row, Col,form,Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <Link to={`/group`}>
      <button type="button" class="btn btn-primary btn-sm" >Create A Team</button>
      </Link>
      <Link to={`/allgroups`}>
      <button type="button" class="btn btn-secondary btn-sm">Join A Team</button>
      </Link>
      <h1>Created Groups</h1>
      <UserCreatedGroups />
    </div>
  );
};
export default(Dashboard);
