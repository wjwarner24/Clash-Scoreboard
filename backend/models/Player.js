
const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    _id: String, // player tag
    opps: [String], // saved player tags, not including clan mates
    battles: [mongoose.Schema.Types.Mixed] // all battles, uniqueness is ensured by battleTime
});

const Player = mongoose.model('Player', playerSchema);

//export default Player;

module.exports = Player;