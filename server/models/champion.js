const mongoose = require('mongoose');

const championSchema = new mongoose.Schema({
    name: 
    { type: String, required: true, maxLength: 30, minLength: 1 },
    house:     
    { type: String, required: true, maxLength: 30, minLength: 1 },
    portrait: String,
    total_wins: 
    { type: Number, default: 0, min: 0},
    games_played: [String], //list of game ids
    games_won:[String], //list of game ids
});

const Champion = mongoose.model('Champion', championSchema);

module.exports.Champion = Champion;