import React from 'react';


const ChampionCard = (props) => {
        return (
            <div className="col-md-12 col-sm-12"> 
                <div className="historyCard">
                    <div className="row g-0">
                        <div className="historyCard-body text-center">
                            <div className="row">
                                <h1 className="card-text">{props.name}</h1>
                            </div>
                            <div className="row">
                                <h1 className="card-text"> {props.house}</h1>
                            </div>
                            <div className="row my-3">
                                <h2 className="card-text">Wins: {props.total_wins}</h2>
                            </div>
                            <div className="row">
                                <ul>
                                    {props.games_won.map((game,j) => {
                                        return (
                                            <div>
                                                <ul>
                                                    <div className="row g-0">
                                                        <li className="row">
                                                            <h6 className="card-text">{props.gameIdHash[props.games_won[j]]}</h6>
                                                        </li>
                                                    </div>
                                                </ul>
                                            </div>
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