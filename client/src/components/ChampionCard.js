import React from 'react';
import GamesPlayed from './GamesPlayed';
import GamesWon from './GamesWon';


const ChampionCard = (props) => {
        return (
            <div className="col-md-12 col-sm-12"> 
                <div className="historyCard">
                    <div className="row g-0">
                        <div className="historyCard-body text-center">
                            <div className="row">
                                <h2 className="card-text">{props.name}</h2>
                            </div>
                            <div className="row">
                                <h3 className="card-text">House: {props.house}</h3>
                            </div>
                            <div className="row">
                                <h3 className="card-text">Total Wins: {props.total_wins}</h3>
                            </div>
                            <div className="row">
                                <h4 className="card-text">Games Won: </h4>
                                <ul>
                                    {props.games_won.map((game,j) => {
                                        return (
                                            <GamesWon
                                                gameDate={props.gameIdHash[props.games_won[j]]}
                                            />
                                        )
                                    })}
                                </ul>
                            </div>
                            <div className="row">
                                <h4 className="card-text">Games Played: </h4>
                                <ul>
                                    {props.games_played.map((game,k) => {
                                        return (
                                            <GamesPlayed
                                                gameDate={props.gameIdHash[props.games_played[k]]}
                                            />                                            
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };


export default ChampionCard;