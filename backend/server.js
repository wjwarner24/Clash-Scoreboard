// All routes seem to be working in PostMan
// some example player tags for testing:

// Me: 2LJ9R9LQ
// Eli: 9RGGQQG0
// Liam: 2JUYQUCP0
// Noah: 802UCY2QQ
// demonslime: Q98CV9UC
// clashmaster: 29J0V9098
// gaut: Y8OUJLCYV


const express = require('express');
const mongoose = require('mongoose');
const Player = require('./models/Player');
const RoyaleAPI = require("royale-api");
const cors = require('cors');
require('dotenv').config();

const cr = new RoyaleAPI(process.env.CLASH_ROYALE_API_TOKEN, "");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {}).then(() => console.log('MongoDB connected')).catch(err => console.log(err));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


// POST a new player with an id
app.post('/player/:id', async (req, res) => {
    const { id } = req.params;
    try {
        let player = await Player.findById(id);
        if (!player) {
            const name = await get_name(id);
            if (name) {
                const battles = await get_battles(id);
                player = new Player({
                    _id: id,
                    name: name,
                    opps: [],
                    battles: battles
                });
                await player.save();
                res.status(201).send('Player created id: ' + id);
            }
            else {
                res.status(200).send('Invalid player tag');
            }
        } else {
            res.status(200).send('Player already exists');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});


// GET all players
app.get('/players', async (req, res) => {
    try {
        const players = await Player.find({}); // Fetches all players from the database
        res.status(200).json(players);
    } catch (err) {
        res.status(500).send(err.message); // Send a server error response if something goes wrong
    }
});

// DELETE all players
app.delete('/players', async (req, res) => {
    try {
        const result = await Player.deleteMany({}); // Deletes all documents in the players collection
        res.status(200).json({
            message: "All players removed",
            count: result.deletedCount // Provides the number of documents removed
        });
    } catch (err) {
        res.status(500).send(err.message); // Send a server error response if something goes wrong
    }
});

// GET a player by id
app.get('/player/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const player = await Player.findById(id);
        if (player) {
            res.status(200).json(player); // Send the player data in JSON format if found
        } else {
            res.status(404).send('Player not found'); // Send a 404 status if no player is found
        }
    } catch (err) {
        res.status(500).send(err.message); // Send a 500 status if there is a server error
    }
});

// GET a players clanmates
app.get('/player/:id/clanmates', async (req, res) => {
    const { id } = req.params;
    try {
        const player = await Player.findById(id);
        if (player) {
            const mates = await get_clanmates(id);
            res.status(200).json(mates);
        } else {
            res.status(404).send('Player not found'); // Send a 404 status if no player is found
        }
    } catch (err) {
        res.status(500).send(err.message); // Send a 500 status if there is a server error
    }
});


// PUT to update a players battles
app.put('/player/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const player = await Player.findById(id);
        if (player) {
            await update_battles(player);
            res.send('Update successful');
        } else {
            res.status(404).send('Player not found'); // Send a 404 status if no player is found
        }
    } catch (err) {
        res.status(500).send(err.message); // Send a 500 status if there is a server error
    }
});

// PUT to add opp to a player's saved tags
app.put('/player/:id/add-opp/:tag', async (req, res) => {
    const { id, tag } = req.params;
    try {
        const player = await Player.findById(id);
        if (player) {
            if (player.opps.includes(tag)) {
                res.send('tag already exists');
            } 
            else {
                player.opps.push(tag);
                await player.save();
                res.send('succesfully added tag');
            }
        }
        else {
            res.status(404).send('Player not found');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// DELETE a player given the id
app.delete('/player/:id', async (req, res) => {
    const { id } = req.params; // Get the ID from the URL parameters
    try {
        const result = await Player.findByIdAndDelete(id); // Mongoose method to find and remove the document
        if (result) {
            res.status(200).send('Player removed');
        } else {
            res.status(404).send('Player not found');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// PUT to remove an opp from saved opps
app.put('/player/:id/remove-opp/:tag', async (req, res) => {
    const { id, tag } = req.params;
    try {
        const player = await Player.findById(id);
        if (player) {
            if (player.opps.includes(tag)) {
                player.opps = player.opps.filter(item => item !== tag);
                await player.save();
                res.send('succesfully removed tag');
            } 
            else {
                res.send('tag does not exist');
            }
        } else {
            res.status(404).send('Player not found');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// GET the scores for a player
app.get('/player/:id/scores', async (req, res) => {
    const { id } = req.params;
    try {
        const player = await Player.findById(id);
        if (player) {
            let enemies = await get_clanmates(id);
            for (const opp of player.opps) {
                if (!enemies.includes(opp)) {
                    enemies.push(opp);
                }
            }

            let scores_map = new Map();
            for (const enemy of enemies) {
                let name = await get_name(enemy);
                let score = {
                    name: name,
                    wins: 0,
                    losses: 0,
                    ties: 0,
                    remove_option: false
                };
                scores_map.set(enemy, score);
            }
            for (const battle of player.battles) { 
                for (const opp of battle.opponent) {
                    let opp_name = opp.tag.substring(1);
                    if (scores_map.has(opp_name)) {
                        let result = await get_result(battle);
                        let score = scores_map.get(opp_name);
                        if (result === "win") {
                            score.wins++;
                        } else if (result === "lose") {
                            score.losses++;
                        } else {
                            score.ties++;
                        }
                        scores_map.set(opp_name, score);
                    }
                }
            }
            scores_map.forEach((value, key) => {
                if ((value.wins + value.losses + value.ties) == 0 && !player.opps.includes(key)) {
                    scores_map.delete(key);
                }
                else if (player.opps.includes(key)) {
                    value.remove_option = true;
                }
            });

            let obj = {
                name: player.name,
                data: Array.from(scores_map).map(([key, value]) => ({
                    id: key,
                    ...value
                }))
            };

            res.status(200).json(obj);

        } else {
            res.status(404).send('Player not found');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});



// function to get a player's battles given an id
async function get_battles(id) {
    try {
        const battle_log = await cr.getPlayerBattleLog('#' + id);
        return battle_log.data;
    } catch (error) {
        console.error("Failed to retrieve battle log:", error);
        return null;
    }
}

// function to update a player's battles
async function update_battles(player) {
    try {
        const new_battles = await get_battles('#' + player._id);
        const battleMap = new Map();

        player.battles.forEach(battle => {
            battleMap.set(battle.battleTime, battle);
        });

        new_battles.forEach(battle => {
            if (!battleMap.has(battle.battleTime)) {
                battleMap.set(battle.battleTime, battle);
            }
        });

        player.battles = Array.from(battleMap.values());
        await player.save();
        return null;

    } catch (error) {
        console.error("Failed to update player battles:", error);
        return null;
    }
}

// function to get a player's clanmates by id
async function get_clanmates(id) {
    try {
        const player = await cr.getPlayer('#' + id);
        const clan_id = player.data.clan.tag;
        const members = await cr.getClanMembers(clan_id, "");
        var num_members = get_num_members(members);
        var tags = [];
        for (let i = 0; i < num_members; i++) {
            let str = members.data.items[i].tag.substring(1);
            if (str != id) {
                tags.push(members.data.items[i].tag.substring(1));
            }
        }
        return tags;
    } catch (error) {
        console.error("Failed to retrieve clanmates: ", error);
        return null;
    }
}

// gets the number of members bcuz i cant figure out how to do this better
function get_num_members(members) {
    var count = 0;
    for (member in members.data.items) {
        count++;
    }
    return count;
}

// gets the name of a player given an id
async function get_name(id) {
    try {
        const player = await cr.getPlayer('#' + id);
        return player.data.name;
    } catch (error) {
        console.error("Failed to get name from id: ", error);
        return null;
    }
}

// gets the result of a battle, either "win", "lose", or "tie"
function get_result(battle) {
    let my_crowns = battle.team[0].crowns;
    let opp_crowns = battle.opponent[0].crowns;
    if (my_crowns > opp_crowns) {
        return "win";
    }
    else if (my_crowns < opp_crowns) {
        return "lose";
    }
    else {
        return "tie";
    }
}