import React from 'react';

class StartButton extends React.Component {

    render() {
        let button = '';
        if (this.props.admin && this.props.isGameOn) {
            button = ' ✨ End ✨ ';
        } else if (!this.props.isGameOn) {
            button = ' ✨ Start ✨ ';
        }

        if (button !== '') {
            return (
                <div className="container text-center"> 
                    <button className="btn fs-4 wizButtons" onClick={this.props.onStartGame}>
                        {button}
                    </button>
                </div>
            );
        }

      return (null);
    }
}

export default StartButton;