const level = require("./commands/utility/level");
const Character = require("./models/Character");

async function levelUp(box, charId) {
    const char = await Character.findOne({where: {id: charId}});
    const hpMod = char.baseHp / 10;
    const spdMod = char.baseSpd / 10;
    const pwrMod = char.basePwr / 10;

    let currLevel = box[charId + "Level"];
    if (currLevel < 5) {

        box[charId + "Hp"] += Math.round(5 * hpMod);
        box[charId + "Spd"] += Math.round(5 * spdMod);
        box[charId + "Pwr"] += Math.round(5 * pwrMod);
        box[charId + "XpNeed"] = 1000;
        box[charId + "Level"] += 1;

    } else if (currLevel < 10) {

        box[charId + "Hp"] += Math.round(10 * hpMod);
        box[charId + "Spd"] += Math.round(10 * spdMod);
        box[charId + "Pwr"] += Math.round(10 * pwrMod);
        box[charId + "XpNeed"] = 2000;
        box[charId + "Level"] += 1;
    
    } else if (currLevel < 20) {

        box[charId + "Hp"] += Math.round(15 * hpMod);
        box[charId + "Spd"] += Math.round(15 * spdMod);
        box[charId + "Pwr"] += Math.round(15 * pwrMod);
        box[charId + "XpNeed"] = 5000;
        box[charId + "Level"] += 1;

    } else if (currLevel < 30) {

        box[charId + "Hp"] += Math.round(25 * hpMod);
        box[charId + "Spd"] += Math.round(25 * spdMod);
        box[charId + "Pwr"] += Math.round(25 * pwrMod);
        box[charId + "XpNeed"] = 10000;
        box[charId + "Level"] += 1;
    } else if (currLevel < 40) {

        box[charId + "Hp"] += Math.round(50 * hpMod);
        box[charId + "Spd"] += Math.round(50 * spdMod);
        box[charId + "Pwr"] += Math.round(50 * pwrMod);
        box[charId + "XpNeed"] = 25000;
        box[charId + "Level"] += 1;
    } else if (currLevel < 50) {

        box[charId + "Hp"] += Math.round(100 * hpMod);
        box[charId + "Spd"] += Math.round(100 * spdMod);
        box[charId + "Pwr"] += Math.round(100 * pwrMod);
        box[charId + "XpNeed"] = 50000;
        box[charId + "Level"] += 1;
    };

    await box.save();
};

module.exports = levelUp;
