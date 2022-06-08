import React from 'react';

const GamePlayers = (props) => {
        return (
            <div > 
                <ul>
                    <div className="row g-0">
                        <li className="row">
                            <h6 className="card-text">{props.name}</h6>
                        </li>
                        <li className="row">
                            <h6 className="card-text">Rank: {props.rank}</h6>
                        </li>
                        <li className="row">
                            <h6 className="card-text">Points: {props.points}</h6>
                        </li>
                    </div>
                </ul>
            </div>
        )
    };

export default GamePlayers;