import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import Layout from "./views/Layout";
import CurrentGame from './views/CurrentGame';
import GameHistory from "./views/GameHistory";
import ChampionHistory from "./views/ChampionHistory";
import NoPage from "./views/NoPage";

ReactDOM.render(
    <div>
        <BrowserRouter>
        <Routes>
            {/*TODO: how to get onClickAdmin={this.onClickAdmin} into Layout?*/}
            <Route path="/" element={<Layout />}>
            <Route index element={<CurrentGame />} />
            <Route path="games/history" element={<GameHistory />} />
            <Route path="champions/history" element={<ChampionHistory />} />
            <Route path="*" element={<NoPage />} />
            </Route>
        </Routes>
        </BrowserRouter>
    </div>
    ,
    document.getElementById('root')
);

