import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

// class Dashboard extends Component {
//   constructor(props) {
//     super(props);
//   }
//   renderWidgets(props) {
//     const socket = socketIOClient(`http://${window.location.host}`);
//     return React.Children.map(props.children, child => React.cloneElement(child, { socket }));
//   }
//   render() {
//     return <div className="dashboard">{this.renderWidgets(this.props)}</div>;
//   }
// }

function renderWidgets(props) {
  const socket = socketIOClient(`http://${window.location.host}`);
  return React.Children.map(props.children, child => React.cloneElement(child, { socket }));
}

function Dashboard(props) {
  const imgStyle = {
    margin: 'auto',
    'margin-top': '10px',
    width: '100%',
  };
  return (
    <div>
      <div className="dashboard">
        {renderWidgets(props)}
      </div>
      <img src="https://enginegroup.com/uk/wp-content/uploads/2019/08/logo-white.svg" alt="Engine" height={100} style={imgStyle} />
    </div>);
}

export default Dashboard;
