const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cave')
		.setDescription('sends you to a cave to fight'),
	async execute(interaction) {
		await interaction.reply({content: 'Pong!'});
	},
};