const { SlashCommandBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const Character = require("../../models/Character");
const Team = require("../../models/Team");
const Box = require("../../models/Box");
const moveList = require("../../moveList");
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

                let reply = await confirmation.update({content: "confirmed", components: []});

                let won = false;
                while(!won){
                    
                    const team = await Team.findOne({where: {id: interaction.user.id}});
                    if(team){
                        const charId = team.slot1;
                        const box = await Box.findOne({where: {id: interaction.user.id}});
                        const move1 = box[charId + "move1"];
                        const moveName = moveList[move1].name;
                        const move1Button = new ButtonBuilder()
                            .setCustomId("move1")
                            .setLabel(moveName)
                            .setStyle(ButtonStyle.Primary);
                        const moveRow = new ActionRowBuilder()
                            .addComponents(move1Button);
                        
                        if(box[charId + "move2" !== ""]){

                            console.log("2nd")
                        };
                        if(box[charId + "move3" !== ""]){

                            console.log("3rd")
                        };

                        reply = await interaction.editReply({content: "moves loaded", components: [moveRow]});
                        won = true;

                    }else{

                        reply.update({content: "you dont have a team"});
                        won = true;
                    }
                    


                };
            };
        
        } catch (e) {
			console.log(e);
			await interaction.editReply({ content: 'You ran out of time to confirm. ', components: [] });
		}
	},
};