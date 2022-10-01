import React, { Component } from "react";
class Like extends React.Component {
  getClasses() {
    let classes = "fa fa-heart";
    if (this.props.liked === false) classes += "-o";
    return classes;
  }
  render() {
    return (
      <div>
        <i
          style={{ cursor: "pointer" }}
          onClick={this.props.onClick}
          className={this.getClasses()}
        ></i>
      </div>
    );
  }
}

export default Like;
