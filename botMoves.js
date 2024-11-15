const Character = require("./models/Character");
const Ability = require("./models/Ability");

async function botMoves(charid, level){

    const movesChosen = [];
    const char = await Character.findOne({where: {id: charid}});
    const ability = await Ability.findOne({where: {id: char.ability}});
    const movesKnown = [char.move1];

    if(level > 5){

        movesKnown.push(ability.move1);
    };
    if(level > 9){

        movesKnown.push(char.move2);
    };
    if(level > 19){

        movesKnown.push(char.move3);
    };
    if(level > 29){

        movesKnown.push(char.move4);
    };
    if(level > 39){

        movesKnown.push(ability.move2);
    };
    if(level > 49){

        movesKnown.push(char.move5);
    };

    let moveCount = movesKnown.length;
    if(moveCount > 3){

        moveCount = 3;
    };

    for(let i = 0; i < moveCount; i++){

        const roll = Math.floor(Math.random() * movesKnown.length);
        movesChosen.push(movesKnown[roll]);

    };

    return movesChosen;

};

module.exports = botMoves;