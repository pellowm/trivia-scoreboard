import { Outlet, Link } from "react-router-dom";
import React from 'react';
import fogLow from '../img/fog-low.png';

const Layout = () => {
  return (
    <>
    <div className="bg-image hogwarts-image"></div>
    <nav className="navbar navbar-expand-lg navbar-dark " style={{"background-color": "rgba(15, 15, 64, 0.7)"}}>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="nav navbar-nav mr-auto">
          <li className="nav-item active" >
              <Link className="nav-link" to="/">Current Game</Link>
          </li>
          <li className="nav-item">
              <Link className="nav-link" to="/games/history">Game History</Link>
          </li>
          <li className="nav-item">
              <Link className="nav-link" to="/champions/history">Champion History</Link>
          </li>
        </ul>
      </div>
      <div class="navbar-nav navbar-right mr auto">
          <ul className="navbar-nav navbar-right mrauto">
            <li className="nav-item" id="admin">
            </li>
          </ul>
        </div>
    </nav>
    <div>
        <div className="fog"></div>
        <div className="fog-low">
            <img src={fogLow} alt=""/>
        </div>
        <div className="fog-low right">
            <img src={fogLow} alt=""/>
        </div> 
    </div> 
    <Outlet />
    </>
  )
};

export default Layout;