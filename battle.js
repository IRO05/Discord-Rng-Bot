const Box = require("./models/Box");
const levelBot = require("./levelBot");
const botMoves = require("./botMoves");
const Character = require("./models/Character");
const {SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder } = require("discord.js");
const moveList = require("./moveList");
const defeat = require("./defeat");

module.exports = {

    botBattle: async function(interaction, playerTeam, botTeam){
        const slot1 = playerTeam[0];
        const box = await Box.findOne({where: {id: interaction.user.id}});
        const playChar1 = await Character.findOne({where: {id: slot1}});
        const playerChars = {
            slot1: true,
            slot1Hp: box[slot1 + "Hp"],
            slot1Max: box[slot1 + "Hp"],
            slot1Spd: box[slot1 +  "Spd"],
            slot1Pwr: box[slot1 + "Pwr"],
            slot2: false,
            slot3: false,
            living: 1,
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

            const playChar2 = await Character.findOne({where: {id: slot2}});
            playerChars.slot2 = true;
            playerChars.slot2Hp = box[slot2 + "Hp"];
            playerChars.slot2Max = box[slot2 + "Hp"];
            playerChars.slot2Spd = box[slot2 +  "Spd"];
            playerChars.slot2Pwr = box[slot2 + "Pwr"];
            playerChars.slot2move1 = box[slot2 + "move1"];
            playerChars.living += 1;
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

            const playChar3 = await Character.findOne({where: {id: slot3}});
            playerChars.slot3 = true;
            playerChars.slot3Hp = box[slot3 + "Hp"];
            playerChars.slot3Max = box[slot3 + "Hp"];
            playerChars.slot3Spd = box[slot3 +  "Spd"];
            playerChars.slot3Pwr = box[slot3 + "Pwr"];
            playerChars.slot3move1 = box[slot3 + "move1"];
            playerChars.living += 1;
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
            slot1Pwr: botStats1.Pwr,
            slot2: false,
            slot3: false,
            living: 1,
            slot1BotMoves: await botMoves(botChar1.id, botLevel),
        };
        if(botTeam[1] !== ""){
            const botChar2 = await Character.findOne({where: {id: botTeam[1]}});
            botChars.slot2 = true;
            botChars.slot2Hp = botStats2.Hp;
            botChars.slot2Max = botStats2.Hp;
            botChars.slot2Spd = botStats2.Spd;
            botChars.slot2Pwr = botStats2.Pwr;
            botChars.living += 1;
            botChars.slot2BotMoves = botMoves(botChar2.id, botLevel);
        };
        if(botTeam[2] !== ""){
            const botChar3 = await Character.findOne({where: {id: botTeam[2]}});
            botChars.slot3 = true;
            botChars.slot3Hp = botStats3.Hp;
            botChars.slot3Max = botStats3.Hp;
            botChars.slot3Spd = botStats3.Spd;
            botChars.slot3Pwr = botStats3.Pwr;
            botChars.living += 1;
            botChars.slot3BotMoves = botMoves(botChar3.id, botLevel);
        };

        const embed = new EmbedBuilder()
            .setDescription(`${playChar1.name}: `)
            .addFields({name: "Health", value: String(playerChars.slot1Hp), inline: true}, {name: "Speed", value: String(playerChars.slot1Spd), inline: true}, {name: "Power", value: String(playerChars.slot1Pwr), inline: true})
            .setFooter({text: `${botChar1.name}'s Hp: ${(botChars.slot1Hp / botChars.slot1Max).toFixed(2) * 100}%`});

        interaction.editReply({embeds: [embed]});

        let turn = (playerChars.slot1Spd > botChars.slot1Spd)? "plyr": "bot";
        const collectorFilter = i => i.user.id === interaction.user.id;
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
                            
                            let botHealth;
                            if(botSlot === 1){

                                botChars.slot1Hp -= damage;

                                botHealth = (botChars.slot1Hp / botChars.slot1Max).toFixed(2);

                                if(botChars.slot1Hp <= 0){

                                    botChars.living -= 1;
                                    botHealth = 0;
                                    await defeat(box, box[slot1], botLevel);
                                };

                            }else if(botSlot === 2){

                                botChars.slot2Hp -= damage;

                                botHealth = (botChars.slot2Hp / botChars.slot2Max).toFixed(2);

                                if(botChars.slot2Hp <= 0){

                                    botChars.living -= 1;
                                    botHealth = 0;
                                    await defeat(box, box[slot1], botLevel);
                                };
                            }else if(botSlot === 3){

                                botChars.slot3Hp -= damage;

                                botHealth = (botChars.slot3Hp / botChars.slot3Max).toFixed(2);

                                if(botChars.slot3Hp <= 0){

                                    botChars.living -= 1;
                                    botHealth = 0;
                                    await defeat(box, box[slot1], botLevel);
                                };
                            };

                            embed.setTitle(`Your ${playChar1.name} used ${moveList[playerChars.slot1move1].name} for ${damage} damage`);
                            embed.setFooter({text: `${botChar1.name}'s Hp: ${botHealth}%`});
                            await buttonPressed.update({embeds: [embed], components: []});
                            turn = "bot";
                            
                        }else if(playSlot === 2){

                            const moveUse = moveList[playerChars.slot2move1].use;
                            const moveUsed = moveUse(playerChars.slot2Pwr);
                            let damage = 0;
                            if(moveUsed.dmg){
                                damage = moveUsed.dmg;
                            };
                            
                            let botHealth;
                            if(botSlot === 1){

                                botChars.slot1Hp -= damage;

                                botHealth = (botChars.slot1Hp / botChars.slot1Max).toFixed(2);

                                if(botChars.slot1Hp <= 0){

                                    botChars.living -= 1;
                                    botHealth = 0;
                                };

                            }else if(botSlot === 2){

                                botChars.slot2Hp -= damage;

                                botHealth = (botChars.slot2Hp / botChars.slot2Max).toFixed(2);

                                if(botChars.slot2Hp <= 0){

                                    botChars.living -= 1;
                                    botHealth = 0;
                                };
                            }else if(botSlot === 3){

                                botChars.slot3Hp -= damage;

                                botHealth = (botChars.slot3Hp / botChars.slot3Max).toFixed(2);

                                if(botChars.slot3Hp <= 0){

                                    botChars.living -= 1;
                                    botHealth = 0;
                                };
                            };

                            embed.setTitle(`Your ${playChar1.name} used ${moveList[playerChars.slot1move1].name} for ${damage} damage`);
                            embed.setFooter({text: `${botChar1.name}'s Hp: ${botHealth}%`});
                            await buttonPressed.update({embeds: [embed], components: []});
                            turn = "bot";

                        }else if(playSlot == 3){

                            const moveUse = moveList[playerChars.slot3move1].use;
                            const moveUsed = moveUse(playerChars.slot3Pwr);
                            let damage = 0;
                            if(moveUsed.dmg){
                                damage = moveUsed.dmg;
                            };
                            
                            let botHealth;
                            if(botSlot === 1){

                                botChars.slot1Hp -= damage;

                                botHealth = (botChars.slot1Hp / botChars.slot1Max).toFixed(2);

                                if(botChars.slot1Hp <= 0){

                                    botChars.living -= 1;
                                    botHealth = 0;
                                };

                            }else if(botSlot === 2){

                                botChars.slot2Hp -= damage;

                                botHealth = (botChars.slot2Hp / botChars.slot2Max).toFixed(2);

                                if(botChars.slot2Hp <= 0){

                                    botChars.living -= 1;
                                    botHealth = 0;
                                };
                            }else if(botSlot === 3){

                                botChars.slot3Hp -= damage;

                                botHealth = (botChars.slot3Hp / botChars.slot3Max).toFixed(2);

                                if(botChars.slot3Hp <= 0){

                                    botChars.living -= 1;
                                    botHealth = 0;
                                };
                            };

                            embed.setTitle(`Your ${playChar1.name} used ${moveList[playerChars.slot1move1].name} for ${damage} damage`);
                            embed.setFooter({text: `${botChar1.name}'s Hp: ${botHealth}%`});
                            await buttonPressed.update({embeds: [embed], components: []});
                            turn = "bot";

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
                    let currHealth;
                    if(playSlot === 1){
                        playerChars.slot1Hp -= damage;
                        
                        currHealth = playerChars.slot1Hp;
                        if(playerChars.slot1Hp < 1){
                            playerChars.living -= 1;
                            currHealth = 0;
                        };
                    }else if(playSlot === 2){
                        playerChars.slot2Hp -= damage;
                        
                        currHealth = playerChars.slot2Hp;
                        if(playerChars.slot2Hp < 1){
                            playerChars.living -= 1;
                            currHealth = 0;
                        };
                    }else if(playSlot === 3){
                        playerChars.slot3Hp -= damage;
                        
                        currHealth = playerChars.slot3Hp;
                        if(playerChars.slot3Hp < 1){
                            playerChars.living -= 1;
                            currHealth = 0;
                        };
                    };

                    embed.data.fields[0].value = currHealth;
                    await interaction.editReply({content: `The ${botChar1.name} uses ${roll.name} for ${damage} damage`, embeds: [embed], components: [currRow]});
                    turn = "plyr";



                }else if(botSlot === 2){

                }else if(botSlot === 3){

                };
            };


            if(playerChars.living < 1 || botChars.living < 1){

                won = true;
                if (botChars.living < 1){

                    winner = "plyr";
                }else if (playerChars.living < 1){

                    winner = "bot";
                
                };

                return winner;
            };

        };


        
        

    },
    playerBattle: null,
};