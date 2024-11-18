const Box = require("./models/Box");
const levelBot = require("./levelBot");
const botMoves = require("./botMoves");
const Character = require("./models/Character");
const {SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder } = require("discord.js");
const moveList = require("./moveList");

module.exports = {

    botBattle: async function(interaction, playerTeam, botTeam){
        const slot1 = playerTeam[0];
        const box = await Box.findOne({where: {id: interaction.user.id}});
        const playChar1 = await Character.findOne({where: {id: box[slot1]}});
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
        const s1move1Button = new ButtonBuilder()
            .setCustomId("move1")
            .setLabel(moveList[box[slot1 + "move1"]].name)
            .setStyle(ButtonStyle.Primary);
        const s1moveRow = new ActionRowBuilder()
            .addComponents(s1move1Button);
        if(box[slot1 + "move2"] !== ""){

            playerChars.slot1move2 = box[slot1 + "move2"];
            const s1move2Button = new ButtonBuilder()
                .setCustomId("move2")
                .setLabel(moveList[box[slot1 + "move2"]].name)
                .setStyle(ButtonStyle.Primary);
            s1moveRow.addComponents(s1move2Button);
        };
        if(box[slot1 + "move3"] !== ""){

            playerChars.slot1move3 = box[slot1 + "move3"];
            const s1move3Button = new ButtonBuilder()
                .setCustomId("move3")
                .setLabel(moveList[box[slot1 + "move3"]].name)
                .setStyle(ButtonStyle.Primary);
            s1moveRow.addComponents(s1move3Button);
        };

        if(playerTeam[1] !== "" || playerTeam[2] !== ""){

            const swapButton = new ButtonBuilder()
                .setCustomId("swap")
                .setLabel("Swap")
                .setStyle(ButtonStyle.Secondary);
            moveRow.addComponents(swapButton);
        };
        if(playerTeam[1] !== ""){

            const playChar2 = await Character.findOne({where: {id: box[slot2]}});
            playerChars.slot2 = true;
            playerChars.slot2Hp = box[slot2 + "Hp"];
            playerChars.slot2Max = box[slot2 + "Hp"];
            playerChars.slot2Spd = box[slot2 +  "Spd"];
            playerChars.slot2Pwr = box[slot2 + "Pwr"];
            playerChars.slot2move1 = box[slot2 + "move1"];
            const s2move1Button = new ButtonBuilder()
                .setCustomId("move1")
                .setLabel(moveList[box[slot2 + "move1"]].name)
                .setStyle(ButtonStyle.Primary);
            const s2moveRow = new ActionRowBuilder()
                .addComponents(s2move1Button);
            if(box[slot2 + "move2"] !== ""){
                playerChars.slot2move2 = box[slot2 + "move2"];
                const s2move2Button = new ButtonBuilder()
                    .setCustomId("move2")
                    .setLabel(moveList[playerChars.slot2move2].name)
                    .setStyle(ButtonStyle.Primary);
                s2moveRow.addComponents(s2move2Button);
            };
            if(box[slot2 + "move3"] !== ""){
                playerChars.slot2move3 = box[slot2 + "move3"];
                const s2move3Button = new ButtonBuilder()
                    .setCustomId("move3")
                    .setLabel(moveList[playerChars.slot2move3].name)
                    .setStyle(ButtonStyle.Primary);
                s2moveRow.addComponents(s2move3Button)
            };
        };
        if(playerTeam[2] !== ""){

            const playChar3 = await Character.findOne({where: {id: box[slot3]}});
            playerChars.slot3 = true;
            playerChars.slot3Hp = box[slot3 + "Hp"];
            playerChars.slot3Max = box[slot3 + "Hp"];
            playerChars.slot3Spd = box[slot3 +  "Spd"];
            playerChars.slot3Pwr = box[slot3 + "Pwr"];
            playerChars.slot3move1 = box[slot3 + "move1"];
            const s3move1Button = new ButtonBuilder()
                .setCustomId("move1")
                .setLabel(moveList[playerChars.slot3move1].name)
                .setStyle(ButtonStyle.Primary);
            const s3moveRow = new ActionRowBuilder()
                .addComponents(s3move1Button);
            if(box[slot3 + "move2"] !== ""){
                playerChars.slot3move2 = box[slot3 + "move2"];
                const s3move2Button = new ButtonBuilder()
                    .setCustomId("move2")
                    .setLabel(moveList[playerChars.slot3move2].name)
                    .setStyle(ButtonStyle.Primary);
                s3moveRow.addComponents(s3move2Button);
            };
            if(box[slot3 + "move3"] !== ""){
                playerChars.slot3move3 = box[slot3 + "move2"];
                const s3move3Button = new ButtonBuilder()
                    .setCustomId("move3")
                    .setLabel(moveList[playerChars.slot3move3])
                    .setStyle(ButtonStyle.Primary);
                s3moveRow.addComponents(s3move3Button);
            };
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
            slot1BotMoves: botMoves(botChar1.id, botLevel),
        };
        if(botTeam[1] !== ""){
            const botChar2 = await Character.findOne({where: {id: botTeam[1]}});
            botChars.slot2 = true;
            botChars.slot2Hp = botStats2.Hp;
            botChars.slot2Max = botStats2.Hp;
            botChars.slot2Spd = botStats2.Spd;
            botChars.slot2Pwr = botStats2.Pwr;
            botChars.slot2BotMoves = botMoves(botChar2.id, botLevel);
        };
        if(botTeam[2] !== ""){
            const botChar3 = await Character.findOne({where: {id: botTeam[2]}});
            botChars.slot3 = true;
            botChars.slot3Hp = botStats3.Hp;
            botChars.slot3Max = botStats3.Hp;
            botChars.slot3Spd = botStats3.Spd;
            botChars.slot3Pwr = botStats3.Pwr;
            botChars.slot3BotMoves = botMoves(botChar3.id, botLevel);
        };

        const embed = new EmbedBuilder()
            .setDescription(`${playChar1.name}: `)
            .addFields({name: "Health", value: String(playerChars.slot1Hp), inline: true}, {name: "Speed", value: String(playerChars.slot1Spd), inline: true}, {name: "Power", value: String(playerChars.slot1Pwr), inline: true})
            .setFooter({text: `${botChar1.name}'s Hp: ${(botChars.slot1Hp / botChars.slot1Max).toFixed(2) * 100}%`});

        interaction.editReply({embeds: [embed]});

        let turn = (playerChars.slot1Spd > botChars.slot1Spd)? "plyr": "bot";
        const collectorFilter = i => i.user.id === interaction.user.id;
        console.log({turn, playerChars, botChars});
        let won = false;
        let winner;
        let playSlot = 1;
        let currRow = s1moveRow;
        let botSlot = 1;
        interaction.editReply({embeds: [embed]});
        while(!won){

            if(turn === "plyr"){

                const buttons = await interaction.editReply({components: [s1moveRow]});
                try{
                    const buttonPressed = await buttons.awaitMessageComponent({filter: collectorFilter, time: 20_000});
                    if(buttonPressed.customId === "move1"){

                        if(playSlot === 1){

                            const moveUse = moveList[playerChars.slot1move1].use;
                            const moveUsed = moveUse(playerChars.slot1Pwr);
                            let damage = 0;
                            if(moveUsed.dmg){
                                damage = moveUsed.dmg;
                            };
                            
                            if(botSlot === 1){

                                botChars.slot1Hp -= damage;

                                const botHealth = (botChars.slot1Hp / botChars.slot1Max).toFixed(2);

                            }else if(botSlot === 2){

                            }else if(botSlot === 3){

                            };

                            embed.setTitle(`Your ${playChar1.name} used ${moveList[slot1move1].name} for ${damage} damage`);
                            embed.setFooter({text: `${playChar1.name}'s Hp: ${botHealth}%`});
                            await buttonPressed.update({embeds: [embed], components: []});
                            turn = "bot";
                            
                        }else if(playSlot === 2){

                        }else if(playSlot == 3){

                        };
                    }else if(buttonPressed.customId === "move2"){

                    }else if(buttonPressed.customId === "move3"){

                    }else if(buttonPressed.customId === "swap"){

                    };

                } catch (e) {

                    console.log(e);
                    interaction.editReply({content: "You ran out of itme", components: []});
                };
            }else if(turn === "bot"){

                if(botSlot === 1){

                    const roll = moveList[botChars.slot1BotMoves[Math.floor(Math.random() * botChars.slot1BotMoves.length)]];
                    const rolluse = roll.use;

                    const moveused = rolluse(botChars.slot1Pwr);
                    const damage = (moveused.dmg)? moveused.dmg: 0;

                    botChars.slot1Hp -= damage;

                    embed.data.fields = [];
                    embed.addFields({name: "Health", value: String(slot1Hp), inline: true}, {name: "Speed", value: String(slot1Spd), inline: true}, {name: "Power", value: String(slot1Pwr), inline: true});
                    await interaction.editReply({content: `The ${botChar1.name} uses ${roll.name} for ${damage} damage`, embeds: [embed], components: [currRow]});
                    turn = "plyr";



                }else if(botSlot === 2){

                }else if(botSlot === 3){

                };
            };
        };


        
        

    },
    playerBattle: null,
};