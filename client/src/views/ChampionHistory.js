import React from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import Scroll from '../components/Scroll';
import ChampionCardList from '../components/ChampionCardList';


class ChampionHistory extends React.Component {

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
            console.log("champions fetch response: ", response);
            return response.json();
        })
        .then(champions => {
            console.log(champions);
            this.setState({ champions: champions });
        })
    }

    render() {
        
        return !this.state.champions.length ?
        <h1>Loading</h1> :
        (
            <div>
                <Scroll>
                    <ErrorBoundary>
                        <ChampionCardList champions={this.state.champions} gameHistory={this.state.gameHistory} />
                    </ErrorBoundary>
                </Scroll>
            </div>
        ); 
    }

}

  
export default ChampionHistory;