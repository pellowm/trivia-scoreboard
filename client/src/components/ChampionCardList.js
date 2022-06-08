import React from 'react';
import ChampionCard from './ChampionCard';
import '../index.css'


const GameCardList = ({ champions, gameHistory }) => {

    //hashmap to connect previous game information with player
    const gameIdHash = {};
    for (const game of gameHistory) {
         gameIdHash[game._id] = game.displayDate;
         console.log(`Id: ${game._id} Date: ${gameIdHash[game._id]}`);
    } 

    return (
        <div className="container-fluid champions text-center">
            <div className="row">
                <div className="col-md-3 col-sm-12"/> 
                <div className="col-md-6 col-sm-12"> 
                    {champions.map((eachChamp, i) => {
                        return (
                            <ChampionCard 
                                champion_id={champions[i]._id}
                                name={champions[i].name}
                                house={champions[i].house}
                                total_wins={champions[i].total_wins}
                                games_played={champions[i].games_played}
                                games_won={champions[i].games_won}
                                gameIdHash={gameIdHash}
                            />
                        )
                    })}
                </div>
                <div className="col-md-3 col-sm-12"/> 
            </div>
        </div>
    );
};

export default GameCardList;