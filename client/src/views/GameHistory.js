import React from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import Scroll from '../components/Scroll';
import GameCardList from '../components/GameCardList';

class GameHistory extends React.Component {

    constructor() {
        super()
        this.state = {
            gameHistory: [],
            champions: []
        }
    }

    componentDidMount() {
        fetch('/games')
        .then(response => {
            return response.json();
        })
        .then(gameHistory => {
            console.log(gameHistory)
            this.setState({ gameHistory: gameHistory });
        })

        fetch('/champions')
        .then(response => {
            return response.json();
        })
        .then(champions => {
            console.log(champions)
            this.setState({ champions: champions });
        })
    }

    render() {
        
        return !this.state.gameHistory.length ?
        <h1>Loading</h1> :
        (
            <div>
                <Scroll> 
                    <ErrorBoundary>
                        <GameCardList champions={this.state.champions} gameHistory={this.state.gameHistory} /> 
                    </ErrorBoundary>
                </Scroll>
            </div>
        ); 
    }
}

export default GameHistory;