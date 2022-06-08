import React from 'react';
import GamePlayers from './GamePlayers';

const GameCard = (props) => {
        return (
            <div className="col-md-12 col-sm-12"> 
                <div className="historyCard">
                    <div className="row g-0">
                        <div className="historyCard-body text-center">
                            <div className="row">
                                <h3 className="card-text">Date: {props.date}</h3>
                            </div>
                            <div className="row">
                                <h2 className="card-text">Winner: {props.winner}</h2>
                            </div>
                            <div className="row">
                                <h4 className="card-text">Players: </h4>
                                {props.players.map((user,j) => {
                                    return (
                                        <GamePlayers
                                            name={props.players[j].name}
                                            points={props.players[j].points}
                                            rank={props.players[j].rank}
                                        />
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };

export default GameCard;