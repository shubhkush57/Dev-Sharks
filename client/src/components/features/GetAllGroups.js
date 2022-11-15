import React, { useEffect, useInsertionEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Card,Rw,Col} from 'react-bootstrap';
import axios from 'axios';
import { setAlert } from '../../actions/alert';
import { getAllGroups } from '../../actions/allgroups';
import { setGroups } from '../../actions/group';
import Groups from '../layout/Groups';
import JoinedGroups from '../layout/JoinGroup';

const GetAllGroups = ({
    getAllGroups,
    group,
    setGroups,
}) =>{
    console.log('Incoming data in  all groups');
    console.log(group);
    useEffect(() =>{
        setGroups([]);
        getAllGroups();
    },[]);
    useEffect (() =>{
        setGroups(group);
    },[group]);
    return (
        <div>
            <h1>ALL GROUPS</h1>
            <JoinedGroups />
        </div>
    );
};
GetAllGroups.propTypes = {
    getAllGroups: PropTypes.func.isRequired,
    group: PropTypes.array.isRequired,
    setGroups: PropTypes.func.isRequired,
}
const mapStateToProps = (state) => ({
    group: state.allgroup.group,
});
export default connect(mapStateToProps,{
    getAllGroups,
    setGroups,
})(GetAllGroups);