// requires file system
const fs = require('node:fs');
//requires path for file system
const path = require('node:path');

// require the intents
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');


// requirew env
require('dotenv').config();
// process the token
const token = process.env.BOT_TOKEN;

//create client object
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

//create collection for the commands
client.commands = new Collection();

// create a path to the commands folder
const foldersPath = path.join(__dirname, 'commands');
// create a list of the folders in the commands folder
const commandFolders = fs.readdirSync(foldersPath);

// for each folder in the command folder
for (const folder of commandFolders) {
	// create a path to inside the folder
	const commandsPath = path.join(foldersPath, folder);
	// create a list of js files
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	// for each file in the folder
	for (const file of commandFiles) {
		// create a path to the file
		const filePath = path.join(commandsPath, file);
		// import the command file
		const command = require(filePath);
		// if the command file has a data property and an execute 
		if ('data' in command && 'execute' in command) {
			// not 100% sure but seems to set the clients commands to have a property name: command i think
			client.commands.set(command.data.name, command);
		} else {
			// log error
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// listener for / command interactions if it is in the commands collection executes it
// if an interaction is heard
client.on(Events.InteractionCreate, async interaction => {
	// if the interaction is not a command just return
	if (!interaction.isChatInputCommand()) return;

	// command is the command with that name in the client
	const command = interaction.client.commands.get(interaction.commandName);

	// if there is no command with that name
	if (!command) {
		// log error
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}
	// try to execute the command
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

// on ready
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// login
client.login(token);

