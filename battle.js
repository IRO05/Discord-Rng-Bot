const Box = require("./models/Box");
const levelBot = require("./levelBot");
const Character = require("./models/Character");

module.exports = {

    botBattle: async function(interaction, playerTeam, botTeam){
        const slot1 = playerTeam[0];
        const box = await Box.findOne({where: {id: interaction.user.id}});
        const playerChars = {
            slot1: true,
            slot1Hp: box[slot1 + "Hp"],
            slot1Max: box[slot1 + "Hp"],
            slot1Spd: box[slot1 +  "Spd"],
            slot1Pwr: box[slot1 + "Pwr"],
            slot2: false,
            slot3: false,
        };
        playerChars.slot1move1 = box[slot1 + "move1"];
        const move1Button = new ButtonBuilder()
            .setCustomId("move1")
            .setLabel(moveList[slot1move1].name)
            .setStyle(ButtonStyle.Primary);
        const moveRow = new ActionRowBuilder()
            .addComponents(move1Button);
        if(box[slot1 + "move2"] !== ""){

            playerChars.slot1move2 = box[slot1 + "move2"];
            const move2Button = new ButtonBuilder()
                .setCustomId("move2")
                .setLabel(moveList[slot1move2].name)
                .setStyle(ButtonStyle.Primary);
            moveRow.addComponents(move2Button);
        };
        if(box[slot1 + "move3"] !== ""){

            playerChars.slot1move3 = box[slot1 + "move3"];
            const move3Button = new ButtonBuilder()
                .setCustomId("move3")
                .setLabel(moveList[slot1move3].name)
                .setStyle(ButtonStyle.Primary);
            moveRow.addComponents(move3Button);
        };


        if(playerTeam[1] !== ""){

            playerChars.slot2 = true;
            playerChars.slot2Hp = box[slot2 + "Hp"];
            playerChars.slot2Max = box[slot2 + "Hp"];
            playerChars.slot2Spd = box[slot2 +  "Spd"];
            playerChars.slot2Pwr = box[slot2 + "Pwr"];
        };
        if(playerTeam[2] !== ""){

            playerChars.slot3 = true;
            playerChars.slot3Hp = box[slot3 + "Hp"];
            playerChars.slot3Max = box[slot3 + "Hp"];
            playerChars.slot3Spd = box[slot3 +  "Spd"];
            playerChars.slot3Pwr = box[slot3 + "Pwr"];
        };

        const botLevel = Math.round(box[slot1 + "Level"] * 0.85);
        const botChar1 = await Character.findOne({where: {id: botTeam[0]}});
        const botStats1 = levelBot(botChar1.baseHp, botChar1.baseSpd, botChar1.basePwr, botLevel);
        const botChars = {
            slot1: true,
            slot1Hp: botStats1.Hp,
            slot1Max: botStats1.Hp,
            slot1Spd: botStats1.Spd,
            slot1Spd: botStats1.Pwr,
            slot2: false,
            slot3: false,
        };
        if(botTeam[1] !== ""){
            const botChar2 = await Character.findOne({where: {id: botTeam[1]}});
            botChars.slot2 = true;
            botChars.slot2Hp = botStats2.Hp;
            botChars.slot2Max = botStats2.Hp;
            botChars.slot2Spd = botStats2.Spd;
            botChars.slot2Pwr = botStats2.Pwr;
        };
        if(botTeam[2] !== ""){
            const botChar3 = await Character.findOne({where: {id: botTeam[2]}});
            botChars.slot3 = true;
            botChars.slot3Hp = botStats3.Hp;
            botChars.slot3Max = botStats3.Hp;
            botChars.slot3Spd = botStats3.Spd;
            botChars.slot3Pwr = botStats3.Pwr;
        };

        let turn = (playerChars.slot1Spd > botChars.slot1Spd)? playerTeam[0]: botTeam[0];

        
        

    },
    playerBattle: null,
};