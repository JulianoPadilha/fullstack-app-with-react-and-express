import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';

 const Nagivation = () => (
   <div>
     <Link to='/dashboard'>
        <h1>My Application</h1>
     </Link>
   </div>
 )

 const mapStateToProps = state => {
   return state;
 }

 export const ConnectedNavigation = connect(mapStateToProps)(Nagivation);