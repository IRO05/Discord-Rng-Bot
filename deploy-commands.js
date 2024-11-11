const { REST, Routes } = require('discord.js');
require('dotenv').config();
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;
const token = process.env.BOT_TOKEN;
const fs = require('node:fs');
const path = require('node:path');

// create a folder to hold the commands
const commands = [];

// create a foldersPath that which points into the commands directory
const foldersPath = path.join(__dirname, 'commands');

// creates a list of the directories inside the commands folder
const commandFolders = fs.readdirSync(foldersPath);

// for each folder in the command folder
for (const folder of commandFolders) {

	// create a path to that folder
	const commandsPath = path.join(foldersPath, folder);
	// create a list of files in that folder that end in .js
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	
	// for each js file in the folder
	for (const file of commandFiles) {
		// create a path to that file
		const filePath = path.join(commandsPath, file);
		// import the command from the path
		const command = require(filePath);
		// if there is both a data property and an execute command
		if ('data' in command && 'execute' in command) {
			//push the data properties to JSON to the command list (not 100% but this is what the command builder needs to make the command and then we handle what happens after its actually called)
			commands.push(command.data.toJSON());
		} else {
			// always log ur errors
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();