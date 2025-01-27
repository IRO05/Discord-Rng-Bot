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
        //find all characters
        const chars = await Character.findAll();
        //roll a random index for hte list
        const roll = Math.floor(Math.random() * chars.length);
        //get the character rolled
        const char = chars[roll];

        //initialize a button for confirming cave battle
        const claimButton = new ButtonBuilder()
            .setCustomId("confirm")
            .setLabel("Fight?")
            .setStyle(ButtonStyle.Success);
        //initialize an action row for the button
        const confirmRow = new ActionRowBuilder()
            .`add`Components(claimButton);
        
        //create confirmation message
		const confirm = await interaction.editReply({content: `You enter a cave when suddenly **${char.name}** jumps out from the shadows`, components: [confirmRow]});
        //create a filter that filters out interactions that dont belong to the command user
        const collectorFilter = i => i.user.id === interaction.user.id;
        
        //try waiting for a component to be interacted with from the command user
        try {
			const confirmation = await confirm.awaitMessageComponent({ filter: collectorFilter, time: 10_000 });
        
            //check if the button pressed is the confirm button
            if(confirmation.customId === "confirm"){

                //get the players team
                const team = await Team.findOne({where: {id: interaction.user.id}});
                //check if the player has a team
                if(team !== null){
                    //get the players box
                    const box = await Box.findOne({where: {id: interaction.user.id}});
                    //get the players team lead ~id 
                    const slot1 = team.slot1;

                    //update the confirmation button
                    await confirmation.update({components: []});
                    //call bot battle using a team with just the players leader and the random char as the enemy
                    const winner = await battle.botBattle(interaction, [slot1, "", ""], [char.id, "", ""]);

                    //check who won
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