import React from 'react';
import { connect } from 'react-redux';

const LoginComponent = () => {
  return <div>Login here!</div>
};

const mapStateToProps = state => state;

export const ConnectedLogin = connect(mapStateToProps)(LoginComponent);