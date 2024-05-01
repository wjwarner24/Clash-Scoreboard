
const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    _id: String, // player tag
    name: String, // player name
    opps: [String], // saved player tags
    battles: [mongoose.Schema.Types.Mixed] // all battles, uniqueness is ensured by battleTime
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;