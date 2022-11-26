import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { setAlert } from '../../actions/alert';
import {setGroups,setLoading} from '../../actions/group';
import { joinGroup } from '../../actions/joingroups';
import "./style.css";
import { Link } from 'react-router-dom';
const JoinedGroups =({
    groups,
    loading,
    setGroups,
    joinGroup,
    setLoading,
}) =>{
    const handleAddToJoinTeams = (group) =>{
       const { _id } = group;
       console.log('Join Team Button Clicked...');
       console.log({ _id });
        joinGroup({ _id });
        setAlert('Group Joined');
    }
    return (
        <div>
        <Row>
          
        {groups.map((group) => (
        
        <Col key={group.id} sm={12} md={6} lg={4} xl={3}>
            <Card
              className='my-3 p-3 rounded'
              style={{ cursor: 'pointer' }}
              key={group.key}
            >
              <Card.Body>
                <Card.Title>
                  <strong>{group.title}</strong>
                </Card.Title>
                <div>Descp: {group.descp}</div>
              </Card.Body>
            </Card>
            <div class="d-grid gap-2 col-6 mx-auto">
                <button class="btn btn-primary" type="button" onClick={()=>handleAddToJoinTeams(group)}>Join Team</button>
            </div>
          </Col>
        ))}
      </Row>
        </div>
    )
};
const mapStateToProps = (state) =>({
    groups: state.groups.groups,
    loding: state.groups.loading,
})
JoinedGroups.propTypes = {
    groups: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    setLoading: PropTypes.func.isRequired,
    setGroups: PropTypes.func.isRequired,
    joinGroup: PropTypes.func.isRequired,
}
export default connect(mapStateToProps,{
    setLoading,
    setGroups,
    joinGroup,
})(JoinedGroups);