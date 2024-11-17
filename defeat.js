const levelUp = require("./levelUp");

module.exports = async function defeat(box, playerId, botlevel){

    if(botlevel < 6){

        box[playerId + "Xp"] += 200;
    }else if(botlevel < 11){

        box[playerId + "Xp"] += 200;
    }else if(botlevel < 21){
        box[playerId + "Xp"] += 400;
    }else if(botlevel < 31){
        box[playerId + "Xp"] += 600;
    }else if(botlevel < 41){
        box[playerId + "Xp"] += 800;
    }else if(botlevel < 46){
        box[playerId + "Xp"] += 1000;
    }else if(botlevel < 51){
        box[playerId + "Xp"] += 1500;
    };

    if(box[playerId + "Level"] < 50 && box[playerId + "Xp"] >= box[playerId + "XpNeeded"]){

        const xp =  box[playerId + "Xp"] - box[playerId + "XpNeeded"];
        await levelUp(box, playerId, xp);
    };

    await box.save();
};