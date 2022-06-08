import React from 'react';
import GameCard from './GameCard';
import '../index.css'


const GameCardList = ({ gameHistory, champions }) => {

    console.log("gameHistory", gameHistory);

    return (
        <div className="container-fluid champions text-center">
            <div className="row">
            <div className="col-md-3 col-sm-12"/> 
            <div className="col-md-6 col-sm-12">  
                <div className="row">
                    {gameHistory.map((eachGame, i) => {
                        return (
                            <GameCard 
                                game_id={gameHistory[i]._id}
                                date={gameHistory[i].displayDate}
                                winner={gameHistory[i].winner_name}
                                players={gameHistory[i].players}
                            />
                        )
                    })}
                </div>
            </div>
            <div className="col-md-3 col-sm-12"/> 
            </div>
            
        </div>
    );
};

export default GameCardList;