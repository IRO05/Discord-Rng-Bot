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
		
        if(interaction.member.permissions.has("ADMINISTRATOR")){
            const charId = interaction.options.getString("charid")
            const users = await Box.findOrCreate({where: {id: interaction.user.id}});
            const user = users[0];

            if(user[charId] !== null){

                if(user[charId] !== true){

                    user[charId] = true;
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