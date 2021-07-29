import React, { Component } from 'react';

// When using SFC instead of class don't use `this.props`
// Instead use `props` only
// and then pass in `props` as argument
const Like = (props) => {
  let classes = "fa fa-heart";
  if (!props.liked) classes += "-o" 
  return (
    <i className={classes} style={{ cursor: 'pointer' }} onClick={props.onClick} aria-hidden="true"></i>
   );
}
 
export default Like;
