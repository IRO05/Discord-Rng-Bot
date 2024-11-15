const level = require("./commands/utility/level");
const Character = require("./models/Character");

async function levelUp(box, charId, xp) {
    const char = await Character.findOne({where: {id: charId}});
    const hpMod = char.baseHp / 10;
    const spdMod = char.baseSpd / 10;
    const pwrMod = char.basePwr / 10;

    if(!xp){

        xp = 0;
    };
    let currLevel = box[charId + "Level"];
    if (currLevel < 5) {

        box[charId + "Hp"] += Math.round(5 * hpMod);
        box[charId + "Spd"] += Math.round(5 * spdMod);
        box[charId + "Pwr"] += Math.round(5 * pwrMod);
        box[charId + "XpNeeded"] = 1000 - xp;
        box[charId + "Level"] += 1;

    } else if (currLevel < 10) {

        box[charId + "Hp"] += Math.round(10 * hpMod);
        box[charId + "Spd"] += Math.round(10 * spdMod);
        box[charId + "Pwr"] += Math.round(10 * pwrMod);
        box[charId + "XpNeeded"] = 2000 - xp;
        box[charId + "Level"] += 1;
    
    } else if (currLevel < 20) {

        box[charId + "Hp"] += Math.round(15 * hpMod);
        box[charId + "Spd"] += Math.round(15 * spdMod);
        box[charId + "Pwr"] += Math.round(15 * pwrMod);
        box[charId + "XpNeeded"] = 5000 - xp;
        box[charId + "Level"] += 1;

    } else if (currLevel < 30) {

        box[charId + "Hp"] += Math.round(25 * hpMod);
        box[charId + "Spd"] += Math.round(25 * spdMod);
        box[charId + "Pwr"] += Math.round(25 * pwrMod);
        box[charId + "XpNeeded"] = 10000 - xp;
        box[charId + "Level"] += 1;
    } else if (currLevel < 40) {

        box[charId + "Hp"] += Math.round(50 * hpMod);
        box[charId + "Spd"] += Math.round(50 * spdMod);
        box[charId + "Pwr"] += Math.round(50 * pwrMod);
        box[charId + "XpNeeded"] = 25000 - xp;
        box[charId + "Level"] += 1;
    } else if (currLevel < 49) {

        box[charId + "Hp"] += Math.round(100 * hpMod);
        box[charId + "Spd"] += Math.round(100 * spdMod);
        box[charId + "Pwr"] += Math.round(100 * pwrMod);
        box[charId + "XpNeeded"] = 50000 - xp;
        box[charId + "Level"] += 1;
    }else if(currLevel === 49){

        box[charId + "Hp"] += Math.round(100 * hpMod);
        box[charId + "Spd"] += Math.round(100 * spdMod);
        box[charId + "Pwr"] += Math.round(100 * pwrMod);
        box[charId + "XpNeeded"] = 0;
        box[charId + "Level"] += 1;
    };

    await box.save();
};

module.exports = levelUp;
