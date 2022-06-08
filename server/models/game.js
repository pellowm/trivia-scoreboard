const mongoose = require('mongoose');
const gamePlayersSchema = new mongoose.Schema({
    player_id: 
    { type: String, required: true}, 
    name: 
    { type: String, required: true},
    points:     
    { type: Number, required: true},
    rank:     
    { type: Number, required: true},
});

const gameSchema = new mongoose.Schema({
    date: 
    { type: Date, required: true},
    displayDate: String,
    players: [gamePlayersSchema],
    winner_name: 
    { type: String, required: true, default: "none"},
    winner_id: 
    { type: String, required: true, default: "none"},
    inProgress: Boolean
});

const Game = mongoose.model('Game', gameSchema);

module.exports.Game = Game;