import React from 'react';

const GamesWon = (props) => {
    console.log("gameDate: ", props.gameDate);
        return (
            <div> 
                <ul>
                    <div className="row g-0">
                        <li className="row">
                            <h6 className="card-text">{props.gameDate}</h6>
                        </li>
                    </div>
                </ul>
            </div>
        )
    };

export default GamesWon;