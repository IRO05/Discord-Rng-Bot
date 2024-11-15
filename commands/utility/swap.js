const { SlashCommandBuilder } = require('discord.js');
const Character = require("../../models/Character");
const Box = require("../../models/Box");

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
        const charid1 = interaction.options.getString("charid");
        const charid2 = interaction.options.getString("charid2");
        const char = await Character.findOne({where: {id: charid1}});
        if(interaction.member.permissions.has("ADMINISTRATOR")){
            if(char){

                const boxs = await Box.findOrCreate({where: {id: interaction.user.id}});
                const box = boxs[0];
                if(box[char.id] == true){

                    const char2 = await Character.findOne({where: {id: charid2}});
                    if(char2){

                        box[charid1 + "Ability"] = char2.ability;
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