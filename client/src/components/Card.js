import React from 'react';


const Card = (props) => {
    return (
        <div className="col-md-4 col-sm-12 mb-4"> 
            <div className="card h-100">
                <div className="row g-0 card-body">
                    <div className="col-4">
                        <div className="portrait ">
                            <img src={process.env.PUBLIC_URL + props.portrait} className="card-img img-fluid img-thumbnail mx-auto d-block" alt="Champion"/>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className=" text-center">
                            <div className="row">
                                <h3 className="card-text">{props.name}</h3>
                                { props.rank === 1 && !props.isGameOn && 
                                    <span className="fs-1 position-absolute top-0 start-100 translate-middle badge">
                                        🥇
                                    </span>
                                }
                                { props.rank === 2 && !props.isGameOn && 
                                    <span className="fs-1 position-absolute top-0 start-100 translate-middle badge">
                                        🥈
                                    </span>
                                }
                                { props.rank === 3 && !props.isGameOn && 
                                    <span className="fs-1 position-absolute top-0 start-100 translate-middle badge">
                                        🥉
                                    </span>
                                }
                            </div>
                            <div className="row">
                                <h6 className="card-text">{props.house}</h6>
                            </div>
                            <div className="row">
                                <h6 className="card-text">Rank: {props.rank}</h6>
                            </div>
                            <div className="row">
                                <h3 className="card-text points">{props.points}</h3>
                            </div>
                            <div>
                                { props.isGameOn && props.admin &&
                                    <button className="btn addPointsButtons" onClick={(event)=>{
                                                        console.log(`You clicked ${event.target} for ${props.id}`);
                                                        props.onAddPoints(props.id)
                                                    }}>
                                        Award Point
                                    </button> 
                                }
                                { props.isGameOn && props.admin &&
                                    <button className="btn addPointsButtons" onClick={(event)=>{
                                                        console.log(`You clicked ${event.target} for ${props.id}`);
                                                        if (props.points >= 10)
                                                        {
                                                            props.onUndoPoints(props.id)
                                                        }
                                                    }}>
                                        Undo Point
                                    </button> 
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};


export default Card;