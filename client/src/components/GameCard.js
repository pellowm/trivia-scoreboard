import React from 'react';

const GameCard = (props) => {

    function comparePlayers( a, b ) {
        if ( a.rank < b.rank ){
          return -1;
        }
        if ( a.rank > b.rank ){
          return 1;
        }
        return 0;
    }
      
    props.players.sort( comparePlayers );

    return (
        <div className="col-md-12 col-sm-12"> 
            <div className="historyCard">
                <div className="row g-0">
                    <div className="historyCard-body text-center">
                        <div className="row mb-3">
                            <h3 className="card-text">{props.date}</h3>
                        </div>
                        <div className="row">
                            
                            <table>
                                <thead>
                                    <tr>
                                    <th scope="col">Rank</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Points</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.players.map((user,j) => {
                                        return (
                                            <tr>
                                                <td>{props.players[j].rank}</td>
                                                <td>{props.players[j].name}</td>
                                                <td>{props.players[j].points}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default GameCard;