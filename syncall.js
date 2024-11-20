const Ability = require("./models/Ability.js");
const Box = require("./models/Box.js");
const Character = require("./models/Character.js");
const Team = require("./models/Team.js");

Ability.sync({force: true});
Box.sync({force: true});
Character.sync({force: true});
Team.sync({force: true});

