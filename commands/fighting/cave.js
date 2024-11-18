const { SlashCommandBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const Character = require("../../models/Character");
const Team = require("../../models/Team");
const Box = require("../../models/Box");
const Ability = require("../../models/Ability");
const moveList = require("../../moveList");
const levelBot = require("../../levelBot");
const botMoves = require("../../botMoves");
const defeat = require("../../defeat");
const battle = require("../../battle");
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cave')
		.setDescription('1v1 a random enemy against your party leader'),
	async execute(interaction) {
        await interaction.deferReply();
        const chars = await Character.findAll();
        const roll = Math.floor(Math.random() * chars.length);
        const char = chars[roll];

        const claimButton = new ButtonBuilder()
            .setCustomId("confirm")
            .setLabel("Fight?")
            .setStyle(ButtonStyle.Success);
        const confirmRow = new ActionRowBuilder()
            .addComponents(claimButton);
        

		const confirm = await interaction.editReply({content: `You enter a cave when suddenly **${char.name}** jumps out from the shadows`, components: [confirmRow]});
        const collectorFilter = i => i.user.id === interaction.user.id;
        
        try {
			const confirmation = await confirm.awaitMessageComponent({ filter: collectorFilter, time: 10_000 });
        
            if(confirmation.customId === "confirm"){

                const team = await Team.findOne({where: {id: interaction.user.id}});
                if(team !== null){
                    const box = await Box.findOne({where: {id: interaction.user.id}});
                    const slot1 = team.slot1;

                    const winner = await battle.botBattle(interaction, [slot1, "", ""], [char.id, "", ""]);

            //         const playchar = await Character.findOne({where: {id: slot1}})
            //         const botLevel = Math.round(box[slot1 + "Level"] * 0.85);

            //         const stats = levelBot(char.baseHp, char.baseSpd, char.basePwr, botLevel);
            //         let botHp = stats.Hp;
            //         const botMaxHp = stats.Hp;
            //         const botSpd = stats.Spd;
            //         const botPwr = stats.Pwr;
            //         let slot1Hp = box[slot1 + "Hp"];
            //         const slot1MaxHp = slot1Hp;
            //         const slot1Spd = box[slot1 + "Spd"];
            //         const slot1Pwr = box[slot1 + "Pwr"];

            //         const slot1move1 = box[slot1 + "move1"];
            //         const move1Button = new ButtonBuilder()
            //             .setCustomId("move1")
            //             .setLabel(moveList[slot1move1].name)
            //             .setStyle(ButtonStyle.Primary);
            //         const moveRow = new ActionRowBuilder()
            //             .addComponents(move1Button);
            //         if(box[slot1 + "move2"] !== ""){

            //             const slot1move2 = box[slot1 + "move2"];
            //             const move2Button = new ButtonBuilder()
            //                 .setCustomId("move2")
            //                 .setLabel(moveList[slot1move2].name)
            //                 .setStyle(ButtonStyle.Primary);
            //             moveRow.addComponents(move2Button);
            //         };
            //         if(box[slot1 + "move3"] !== ""){

            //             const slot1move3 = box[slot1 + "move3"];
            //             const move3Button = new ButtonBuilder()
            //                 .setCustomId("move3")
            //                 .setLabel(moveList[slot1move3].name)
            //                 .setStyle(ButtonStyle.Primary);
            //             moveRow.addComponents(move3Button);
            //         };
                
            //         const botMovesChosen = await botMoves(char.id, botLevel);

            //         let turn = "bot";
            //         if(slot1Spd >= botSpd){

            //             turn = "plyr";
            //         }
                    
            //         await confirmation.update({content: `You begin battling the level ${botLevel} ${char.name}`, components: []});
            //         let won = false;
            //         const embed = new EmbedBuilder()
            //             .setDescription(`${playchar.name}: `)
            //             .addFields({name: "Health", value: String(slot1Hp), inline: true}, {name: "Speed", value: String(slot1Spd), inline: true}, {name: "Power", value: String(slot1Pwr), inline: true})
            //             .setFooter({text: `${char.name}'s Hp: ${(botHp / botMaxHp).toFixed(2) * 100}%`});

            //         interaction.editReply({embeds: [embed]});
            //         let winner;
            //         while(!won){
                    
            //             if(turn === "plyr"){

            //                 embed.setTitle("Your turn what do you do?");
                            
            //                 const buttons = await interaction.editReply({embeds: [embed], components: [moveRow]});
            //                 try {
            //                     const buttonPressed = await buttons.awaitMessageComponent({filter: collectorFilter, time: 20_000});
            //                     if(buttonPressed.customId === "move1"){

                                    
            //                         const moveUse = moveList[slot1move1].use;
            //                         const attack = moveUse(slot1Pwr);
            //                         let damage = 0;
            //                         if(attack.dmg){
            //                             damage = attack.dmg;
            //                         };
            //                         botHp -= damage;
            //                         if(botHp < 0){
            //                             botHp = 0;
            //                         };
            //                         const botTotal = ((botHp / botMaxHp).toFixed(2) * 100).toFixed(2);

            //                         embed.setTitle(`Your ${playchar.name} used ${moveList[slot1move1].name} for ${damage} damage`)
            //                         embed.setFooter({text: `${char.name}'s Hp: ${botTotal}%`});
            //                         await buttonPressed.update({embeds: [embed], components: []});

            //                     }else if (buttonPressed.customId === "move2"){

            //                     }else if (buttonPressed.customId === "move3"){

            //                     };

            //                 } catch (e) {
            //                     console.log(e);
            //                     interaction.editReply("You ran out of time to choose your move");
            //                 };
            //                 turn = "bot";
                            
            //             }else if (turn === "bot"){

            //                 const botroll = botMovesChosen[Math.floor(Math.random() * botMovesChosen.length)]
            //                 const botuse = moveList[botroll].use;
                    
            //                 const attack = botuse(botPwr);
            //                 let damage = 0;
            //                 if(attack.dmg){

            //                     damage = attack.dmg;
            //                 };
                            
            //                 slot1Hp -= damage;
            //                 if(slot1Hp < 0){
            //                     slot1Hp = 0;
            //                 };
            //                 embed.data.fields = [];
            //                 embed.addFields({name: "Health", value: String(slot1Hp), inline: true}, {name: "Speed", value: String(slot1Spd), inline: true}, {name: "Power", value: String(slot1Pwr), inline: true});
            //                 await interaction.editReply({content: `The ${char.name} uses ${moveList[botroll].name} for ${damage} damage`, embeds: [embed], components: [moveRow]});
                            
            //                 turn = "plyr";
            //             }

            //             if(slot1Hp <= 0){

            //                 won = true;
            //                 winner = "bot";
            //                 interaction.components = null;
            //                 interaction.editReply({content: "Bot wins"});

            //             }else if(botHp <= 0){

            //                 won = true;
            //                 winner = "plyr";
            //                 interaction.components = null;
            //                 interaction.editReply({content: "Player wins"});
            //             };

            //         }

            //         if(winner === "plyr"){

            //             await defeat(box, slot1, botLevel);
            //         };

                    if(winner === "plyr"){
                        interaction.editReply("win")
                    }else if(winner === "bot"){
                        interaction.editReply("lose");
                    };


                }else{

                    interaction.editReply("You dont have a team");
                };

            };
        
        } catch (e) {
			console.log(e);
			await interaction.editReply({ content: 'You ran out of time to confirm. ', components: [] });
		}
	},
};