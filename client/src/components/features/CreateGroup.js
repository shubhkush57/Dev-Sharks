import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { creategroup } from '../../actions/creategroup';

const CreateGroup = ({setAlert,creategroup,isAuthenticated}) =>{
    const [groupData,setGroupData] = useState({
        title: '',
        descp:'',
        tags: '',
    });
    const {title,descp,tags} = groupData;
    const onChange = (e)=>
        setGroupData({...groupData,[e.target.name]: e.target.value});
    const onSubmit = async (e) =>{
        e.preventDefault();
        creategroup({title,descp,tags});
        setAlert('Group Created','Success');
    };
    // if(isAuthenticated){
    //     return <Navigate to = '/dashboard' />
    // }
    return (
        <Fragment>
        <p className='lead'>
            <i className='fas fa-user'></i> Create Group
        </p>
        <form className='form' onSubmit={(e) => onSubmit(e)}>
            <div className='form-group'>
            <input
                type='text'
                placeholder='title'
                name='title'
                value={title}
                required
                onChange={(e) => onChange(e)}
            />
            </div>
            <div className='form-group'>
            <input
                type='text'
                placeholder='Description of the Group'
                name='descp'
                value={descp}
                required
                onChange={(e) => onChange(e)}
            />
            </div>
            <div className='form-group'>
            <input
                type='text'
                placeholder='Attach Tags to the Group'
                name='tags'
                minLength='4'
                value={tags}
                required
                onChange={(e) => onChange(e)}
            />
            </div>
            <input type='submit' className='btn btn-primary' value='Create' />
        </form>
        
        </Fragment>
    );
};
const mapStateToProps = (state)=>({
    isAuthenticated: state.auth.isAuthenticated,
});
CreateGroup.propTypes = {
    setAlert: PropTypes.func.isRequired,
    creategroup: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}
export default connect(mapStateToProps,{setAlert,creategroup})(CreateGroup);

