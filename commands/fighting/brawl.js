const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
const Character = require("../../models/Character");
const Box = require("../../models/Box");
const Team = require("../../models/Team");
const Ability = require("../../models/Ability");
const Battle = require('../../battle');

/* Desc:
	for fighting 3 random bots.
*/

module.exports = {
	data: new SlashCommandBuilder()
		.setName('brawl')
		.setDescription('Battle with an AI player'),
	async execute(interaction) {
		//defer
		await interaction.deferReply();

        const Characters = await Character.findAll();

        //create new embed
        const embed = new EmbedBuilder()
            .setDescription("Brawl?")

        const confirmButton = new ButtonBuilder()
            .setCustomId("confirmBrawl")
            .setLabel("Fight?")
            .setStyle(ButtonStyle.Success);
        
        const row = new ActionRowBuilder()
            .addComponents(confirmButton);

        const roll1 = Math.floor(Math.random() * Characters.length);
        const roll2 = Math.floor(Math.random() * Characters.length);
        const roll3 = Math.floor(Math.random() * Characters.length);

        const bot1 = Characters[roll1];
        const bot2 = Characters[roll2];
        const bot3 = Characters[roll3];

        embed.addFields({name: bot1.name, value: bot1.id, inline: true}, {name: bot2.name, value: bot2.id, inline: true}, {name: bot3.name, value: bot3.id, inline: true});

        const confirm = await interaction.editReply({embeds: [embed], components: [row]});
        const collectorFilter = i => i.user.id === interaction.user.id;
        try{
            const confirmation = await confirm.awaitMessageComponent({filter: collectorFilter, time: 10_000});
            
            if(confirmation.customId === "confirmBrawl"){

                embed.setDescription("Confirmed");
                embed.data.fields = [];
                await confirmation.update({embeds: [embed]});

                const botTeam = [bot1.id, bot2.id, bot3.id];
                const team = await Team.findOne({where: {id: interaction.user.id}});
                if(box){

                    const playerTeam = [team.slot1, team.slot2, team.slot3];
                    const winner = await Battle.botBattle(interaction, playerTeam, botTeam);

                }else{

                    interaction.editReply("You don't have a team")
                }

            }
        }catch(e){
            console.error(e);
            await interaction.editReply("Error occured or confirmation timed out.")
        }
	},
};