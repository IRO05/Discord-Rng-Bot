const { SlashCommandBuilder } = require('discord.js');
const Character = require("../../models/Character");
const Box = require("../../models/Box");

/* Desc:
    allows an admin to swap the ability of a character in their box with another characters ability
*/

module.exports = {
	data: new SlashCommandBuilder()
		.setName('swap')
		.setDescription('dev tool that swaps a char in your box\'s ability with another characters')
        .addStringOption(option => 
            option.setName("charid")
            .setDescription("id of the character you wish to swap ability")
            .setRequired(true)
        ).addStringOption(option =>
            option.setName('charid2')
            .setDescription("id of character whose ability you want")
            .setRequired(true),
        )
        ,
	async execute(interaction) {
        await interaction.deferReply();
        //get first character id inputted
        const charid1 = interaction.options.getString("charid");
        //get second character id inputted
        const charid2 = interaction.options.getString("charid2");
        //find the character in the character table that has the first id
        const char = await Character.findOne({where: {id: charid1}});
        //check if user is admin
        if(interaction.member.permissions.has("ADMINISTRATOR")){
            //check if there is a chracter with the first id
            if(char){

                //find or create all boxes where the player id is the user id
                const boxs = await Box.findOrCreate({where: {id: interaction.user.id}});
                //get the first box
                const box = boxs[0];
                //check if the player has the first character
                if(box[char.id] == true){

                    //find the character from the character table where the id is the second inputted id
                    const char2 = await Character.findOne({where: {id: charid2}});
                    //check if the character exists
                    if(char2){

                        //change the players character ability to the ability of the second character
                        box[charid1 + "Ability"] = char2.ability;
                        //save changes
                        await box.save();
                        await interaction.editReply("successfully swapped ability")

                    }else{

                        await interaction.editReply("the second character does not exist or is not formatted correctly");
                    };

                }else{

                    await interaction.editReply("you do not own this character")
                }
            }else{

                await interaction.editReply("This character does not exist or is not formatted correctly");
            };
        }else {

            await interaction.editReply("You dont have perms");
        }
	},
};