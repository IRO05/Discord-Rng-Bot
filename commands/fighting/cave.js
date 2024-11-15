const { SlashCommandBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const Character = require("../../models/Character");
const Team = require("../../models/Team");
const Box = require("../../models/Box");
const moveList = require("../../moveList");
const levelBot = require("../../levelBot");
const botMoves = require("../../botMoves");
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
			let confirmation = await confirm.awaitMessageComponent({ filter: collectorFilter, time: 10_000 });
        
            if(confirmation.customId === "confirm"){

                const team = await Team.findOne({where: {id: interaction.user.id}});
                if(team !== null){
                    const box = await Box.findOne({where: {id: interaction.user.id}});
                    const slot1 = team.slot1;
                    const botLevel = Math.round(box[slot1 + "Level"] * 0.85);

                    const stats = levelBot(char.baseHp, char.baseSpd, char.basePwr, botLevel);
                    const botHp = stats.Hp;
                    const botSpd = stats.Spd;
                    const botPwr = stats.Pwr;
                    const slot1Hp = box[slot1 + "Hp"];
                    const slot1Spd = box[slot1 + "Spd"];
                    const slot1Pwr = box[slot1 + "Pwr"];

                    const slot1move1 = box[slot1 + "move1"];
                    if(box[slot1 + "move2"] !== ""){

                        const slot1move2 = box[slot1 + "move2"];
                    };
                    if(box[slot1 + "move3"] !== ""){

                        const slot1move3 = box[slot1 + "move3"];
                    };

                    let first = "bot";
                    if(slot1Spd > botSpd){

                        first = "plyr";
                    }
                    
                    await confirmation.update({content: `You begin battling the level ${botLevel} ${char.name}`, components: []});
                    let won = false;
                    while(!won){

                        if(first === "plyr"){

                            await interaction.editReply("You go first what do you do?");
                            won = true;
                        }else{

                            await interaction.editReply("")
                            won = true;
                        }

                    }


                }else{

                    interaction.editReply("You dont have a team");
                }

            };
        
        } catch (e) {
			console.log(e);
			await interaction.editReply({ content: 'You ran out of time to confirm. ', components: [] });
		}
	},
};