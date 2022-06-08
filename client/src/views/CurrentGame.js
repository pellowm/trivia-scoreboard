import React from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import Scroll from '../components/Scroll';
import CardList from '../components/CardList';
import StartButton from '../components/StartButton';
import GameCardList from '../components/GameCardList';

class CurrentGame extends React.Component {

    constructor() {
        super()
        this.state = {
            champions: [],
            searchfield: '',
            isGameOn: false,
            game: {},
            showGameModal: false,
            gameHistory: [],
            championHistory: [],
            admin: false
        }
    }

     componentDidMount() {
        fetch('/champions')
        .then(response => {
            return response.json();
        })
        .then(users => {
            console.log(users)
            this.setState({ champions: users });
        })
        
        fetch('/games/current')
        .then(response => {
            return response.json();
        })
        .then(currentGame => {
            console.log(currentGame)
            if (!currentGame.Error && Object.keys(currentGame).length !== 0)
            {
                this.setState({ game: currentGame, isGameOn: true });
            }
        })
    }

    onStartGame = (event) => {

        if (!this.state.isGameOn)
        {
            let gameData = { players: this.state.champions.map( champ => ({
                player_id: champ._id, 
                name: champ.name
            })) };
            console.log(gameData);
            fetch('/games', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(gameData)
            })
            .then(response => {
                return response.json();
            })
            .then(gameData => {
                console.log(gameData)
                this.setState({ game: gameData });
            })
    
            this.setState(prevState => ({
                isGameOn: !prevState.isGameOn, 
                admin: true
            }));
        }
        else
        {
            //find player with greatest points
            let winner = {player_id: 0, points:0, name: "none"};
            this.state.game.players.forEach(player => {
                if (player.points > winner.points)
                {
                    winner.points = player.points;
                    winner.player_id = player.player_id;
                    winner.name = player.name;
                }
            })
            console.log(winner);
            //find rank and post medals here
            fetch(`/games/${this.state.game._id}/winner`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(winner)
            })
            .then(response => {
                return response.json();
            })

            this.setState(prevState => ({
                isGameOn: !prevState.isGameOn, 
                admin: false
            }));
        }
    }

    onAddPoints = (player_id) => {
        let request = {action: "add"};
        console.log('hello from onAddPoints!');
        console.log(this.state.game);
        fetch(`/games/${this.state.game._id}/champions/${player_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        })
        .then(response => {
            return response.json();
        })
        .then(gameData => {
            console.log(gameData)
            this.setState({ game: gameData });
        })
    }

    onUndoPoints = (player_id) => {
            let request = {action: "undo"};
            console.log('hello from onUndoPoints!');
            console.log(this.state.game);
            fetch(`/games/${this.state.game._id}/champions/${player_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            })
            .then(response => {
                return response.json();
            })
            .then(gameData => {
                console.log(gameData)
                this.setState({ game: gameData });
            })
    }

    onShowGameModal  = (event) => {
        console.log('hello from onShowGameModal!');

        fetch(`/games/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            return response.json();
        })
        this.setState(prevState => ({
            isGameOn: !prevState.showGameModal
        }));
    }

    onClickAdmin  = (event) => {
        console.log(this.state);
        this.setState({ admin: true });
        console.log(this.state);
    }
 
    render() {

        return !this.state.champions.length ?
            <h1>Loading</h1> :
        (
            <div>
                <div className="container tournament">
                    <div className="row text-center">
                        <div className="col-md-12 col-sm-12"> 
                            <h1 id="welcome">Welcome to the Tri-State Wizard Tournament</h1>
                            <h3>Test your knowledge of the wizarding <span onClick={this.onClickAdmin}>world</span></h3>
                        </div>
                    </div>
                </div>
                <StartButton isGameOn={this.state.isGameOn} admin={this.state.admin} onStartGame={this.onStartGame}/>
                <Scroll>
                    <ErrorBoundary>
                        <CardList champions={this.state.champions} 
                            onAddPoints={this.onAddPoints} 
                            onUndoPoints={this.onUndoPoints}
                            game={this.state.game}
                            isGameOn={this.state.isGameOn}
                            admin={this.state.admin}/>
                        <GameCardList gameHistory={this.state.gameHistory}
                            champions={this.state.champions}/>
                    </ErrorBoundary>
                </Scroll>
            </div>
        );
    }
}

export default CurrentGame;