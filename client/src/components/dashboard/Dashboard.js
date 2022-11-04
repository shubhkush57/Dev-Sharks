import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserCreatedGroups from '../features/GetUserCreatedGroups';
import axios from 'axios';

const Dashboard = () => {
  return (
    <div>
      <h1>Created Groups</h1>
      <UserCreatedGroups />
    </div>
  );
};
export default(Dashboard);
