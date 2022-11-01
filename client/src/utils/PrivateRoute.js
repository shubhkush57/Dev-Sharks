import { Outlet, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ auth: { isAuthenticated, loading } }) => {
  let auth = !isAuthenticated && !loading;
  if (auth) {
    return <Navigate to='/login' />;
  }
  return <Outlet />;
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(PrivateRoute);
