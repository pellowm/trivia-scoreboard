import React from 'react';


class AddPointsButton extends React.Component {
  
    render() {
      return (
        <button onClick={this.props.onStartGame}>
          {this.props.isGameOn ? 'End' : 'Start'}
        </button>
      );
    }
  }

export default AddPointsButton;