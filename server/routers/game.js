const express = require("express");
const mongoose = require('mongoose');
const { Game } = require("../models/game");
const { Champion } = require("../models/champion");
const moment = require('moment');

const router = express.Router();

//get all game history
router.get("/", async (req, res) => {
    const allGames = await Game.find().sort({date: 'desc'});

    console.log(allGames);
    allGames.forEach(game => {
        let formattedDate = moment(game.date).format("dddd, MMMM Do YYYY, h:mm:ss a")
        game.displayDate = formattedDate;
    })
    console.log(allGames);
    res.status(200).json(allGames);
});

//find a current game
router.get("/current", async (req, res) => {
    let currentGames = [];
    currentGames = await Game.find({ 'inProgress': true });
    if (currentGames.length === 0)
    {
        res.status(200).json({});
    }
    else if (currentGames.length === 1)
    {
        res.status(200).json(currentGames[0]);
    }
    else
    {
        res.status(400).json({Error: "Multiple"});
    }
});

router.get("/:id", async (req, res) => {
    const foundGame = await Game.findById(req.params.id);
    res.status(200).json(foundGame);
});

router.post("/", async (req, res, next) => {
    try{
        //create new game
        req.body.date = Date();
        req.body.winner_name = "none";
        req.body.winner_id = "none";
        req.body.inProgress = true;
        req.body.players.forEach(e => {
            e.points = 0;
            e.rank = 1;
        });
        console.log("req.body:",req.body);
        const newGame = new Game(req.body);
        await newGame.save();
        const game_id = newGame._id.toString();
        
        //add to each player's list of games played
        await Promise.all(req.body.players.map(e => Champion.findByIdAndUpdate(e.player_id, { $push: {games_played: game_id}})))
       
        res.status(201).json(newGame);
    }
    catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            res.status(400).json({Error: e.message});
            return;
        }
        next(e);
    }
});

//add a winner to a game
router.post("/:id/winner", async (req, res, next) => {
    try {
        console.log(req.body);
        if (req.body.points != 0)
        {
            const updatedGame = await Game.findByIdAndUpdate(req.params.id, {winner_id: req.body.player_id, winner_name: req.body.name, inProgress: false}, {runValidators: true });
            let champ = await Champion.findById(req.body.player_id);
            champ.total_wins += 1;
            await Champion.findByIdAndUpdate(req.body.player_id, {total_wins: champ.total_wins, $push: {games_won: req.params.id}});
            res.status(200).json(updatedGame);
        }
        else 
        {
            console.log("hello from else", req.body);
            const updatedGame = await Game.findByIdAndUpdate(req.params.id, {inProgress: false}, {runValidators: true });
            console.log("updatedGame: ", updatedGame);
            res.status(200).json(updatedGame);
        }
        
    }
    catch (e){
        if (e instanceof mongoose.Error.ValidationError) {
            res.status(400).json({Error: e.message});
            return;
        }
        next(e);
    }
});

//add a player to a game
router.patch("/:id/champions", async (req, res, next) => {
    try {
        console.log("patch:", req.params.id, req.body)
        const updatedGame = await Game.findByIdAndUpdate(req.params.id, {$push: {players: {player_id: req.body._id, points: 0}}}, {runValidators: true, new:true });
        res.status(200).json(updatedGame);
    }
    catch (e){
        if (e instanceof mongoose.Error.ValidationError) {
            res.status(400).json({Error: e.message});
            return;
        }
        next(e);
    }
});

//add points to player
router.patch("/:game_id/champions/:champ_id", async (req, res, next) => {
    try {
        let number = 0;
        console.log("add/remove points",req.params.game_id, req.params.champ_id, req.body)
        const currentGame = await Game.findById(req.params.game_id);
        console.log(currentGame);
        let i = 0;
        for (i = 0; i < currentGame.players.length; i++)
        {
            if (currentGame.players[i].player_id == req.params.champ_id)
            {
                if (req.body.action === "add")
                {
                    number = 10;
                }
                else if (req.body.action === "undo")
                {
                    number = -10;
                }
                currentGame.players[i].points += number;
                break;
            }
        }

        console.log(currentGame);
        //calculate each player's new rank
        //copy players array into new array (since sort works "in place" and we want to preserve the original array order)
        let rankArray = [];
        for (let i = 0; i < currentGame.players.length; i++)
        {
            let player_data = {};
            player_data.player_id = currentGame.players[i].player_id;
            player_data.points = currentGame.players[i].points;
            
            rankArray.push(player_data);
           
        }

        console.log("rank array", rankArray);

        //sort the temp array descending
        rankArray.sort(function (a, b) {
            return b.points - a.points;
        });
        console.log("sorted rank array", rankArray);

        //calculate rank (including ties)
        let rankCounter = 1;
        for (let i = 0; i < rankArray.length; i++)
        {
            //base case (1st place)
            if (i === 0)
            {
                rankArray[i].rank = 1;
                rankCounter +=1;
            }
            //if tie, share rank with all others with same score
            else if (rankArray[i].points === rankArray[i-1].points)
            {
                rankArray[i].rank = rankArray[i-1].rank;
            }
            else{
                rankArray[i].rank = rankCounter;
                rankCounter +=1;
            }
        }

        //assign team array rank to current game object rank
        for (let i = 0; i < currentGame.players.length; i++)
        {
            //find the matching player id in the old array and assign the temp array element's index to it
            for (let j = 0; j < rankArray.length; j++)
            {
                if (rankArray[j].player_id === currentGame.players[i].player_id)
                {
                    currentGame.players[i].rank = rankArray[j].rank;
                }
            }
        }
        console.log("saving game:",currentGame);

        await currentGame.save();
        res.status(200).json(currentGame);
    }
    catch (e){
        if (e instanceof mongoose.Error.ValidationError) {
            res.status(400).json({Error: e.message});
            return;
        }
        next(e);
    }
});

router.delete("/:id", async (req, res) => {
    await Game.findByIdAndRemove(req.params.id);
    res.status(204).end();
});

//for debugging only
router.delete("/", async (req, res) => {
    await Game.deleteMany({});
    res.status(204).end();
});

module.exports = router;
