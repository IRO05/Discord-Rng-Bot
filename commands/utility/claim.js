const { SlashCommandBuilder } = require('discord.js');
const Box = require("../../models/Box");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('claim')
		.setDescription('dev tool to add char to box')
        .addStringOption(option => 
            option.setName("charid")
            .setDescription("id of the character you wish to claim")
            .setRequired(true)
        )
        ,
	async execute(interaction) {
        await interaction.deferReply();
		
        //check if player is admin in server (admin only command)
        if(interaction.member.permissions.has("ADMINISTRATOR")){
            // get the character id inputted into the command
            const charId = interaction.options.getString("charid")
            //find or create all boxes where the player id is the command users id
            const users = await Box.findOrCreate({where: {id: interaction.user.id}});
            //take the first box from the list
            const user = users[0];

            //check if character id exists
            if(user[charId] !== null){

                //check if the player does not have the chracter
                if(user[charId] !== true){

                    //set the character id to be true in the players box
                    user[charId] = true;
                    // save the table
                    await user.save();
                    
                    await interaction.editReply("done!")
                }else{

                    await interaction.editReply("you already have this character")
                }
            }else {

                await interaction.editReply("this character is not in the db")
            }

        }else{

            await interaction.editReply("You dont have perms");
        }


	},
};