const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

/* Desc:
	replies pong
*/

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		//output pong
		await interaction.reply({content: 'Pong!'});
	},
};