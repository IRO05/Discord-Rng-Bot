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

                    await confirmation.update({components: []});
                    const winner = await battle.botBattle(interaction, [slot1, "", ""], [char.id, "", ""]);

                    if(winner === "plyr"){
                        interaction.editReply("win")
                    }else if(winner === "bot"){
                        interaction.editReply("lose");
                    };


                }else{

                    confirmation.update({content: "You dont have a team"});
                };

            };
        
        } catch (e) {
			console.log(e);
			await interaction.editReply({ content: 'You ran out of time to confirm. ', components: [] });
		}
	},
};