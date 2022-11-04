import React, { useEffect, useInsertionEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Card,Rw,Col} from 'react-bootstrap';
import axios from 'axios';
import { setAlert } from '../../actions/alert';
import { getCreatedGroups} from '../../actions/creategroup';
import { setGroups } from '../../actions/group';
import Groups from '../layout/Groups';

const UserCreatedGroups = ({
    getCreatedGroups,
    group,
    setGroups,
}) =>{
    useEffect(() =>{
        setGroups([]);
        getCreatedGroups();
    },[]);
    useEffect (() =>{
        setGroups(group);
    },[group]);
    console.log(group); //array of groups = []
    return (
        <div>
            <Groups />
        </div>
    );
};
UserCreatedGroups.propTypes = {
    getCreatedGroups: PropTypes.func.isRequired,
    group: PropTypes.array.isRequired,
    setGroups: PropTypes.func.isRequired,
}
const mapStateToProps = (state) => ({
    group: state.creategroup.group,
});
export default connect(mapStateToProps,{
    getCreatedGroups,
    setGroups,
})(UserCreatedGroups);
