import React from 'react';
import Card from '../components/Card';
import '../index.css'

const CardList = ({champions, onAddPoints, onUndoPoints, game, isGameOn, admin}) => {

    return (
        <div className="container-fluid champions text-center">
            <div className="row">
                {champions.map((user,i) => {
                    return (
                        <Card 
                            key={i}
                            id={champions[i]._id}
                            name={champions[i].name}
                            house={champions[i].house}
                            points={game.players?.find(e => {
                                                        return e.player_id === champions[i]._id
                                                    })?.points}
                            rank={game.players?.find(e => {
                                                        return e.player_id === champions[i]._id
                                                    })?.rank}
                            portrait={champions[i].portrait ?? "/img/dumbledore.svg"}
                            onAddPoints={onAddPoints}
                            onUndoPoints={onUndoPoints}
                            isGameOn={isGameOn}
                            admin={admin}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default CardList;