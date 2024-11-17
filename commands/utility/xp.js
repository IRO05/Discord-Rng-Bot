const { SlashCommandBuilder } = require('discord.js');
const Box = require("../../models/Box");
const defeat = require("../../defeat");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('xp')
		.setDescription('dev command for giving xp through winning battles')
        .addStringOption(option => 
            option.setName("charid")
            .setDescription("character id")
            .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName("battles")
            .setDescription("number of battles the character should win")
            .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName("level")
            .setDescription("level of bots defeated")
            .setRequired(false)
        )
        ,
	async execute(interaction) {
        await interaction.deferReply();
        const charId = interaction.options.getString("charid");
        const battles = interaction.options.getInteger("battles");

        if(interaction.member.permissions.has("ADMINISTRATOR")){

            const box = await Box.findOne({where: {id: interaction.user.id}});
            if(box){

                if(box[charId] == true){

                    
                    let level = 1;
                    if(interaction.options.getInteger("level")){

                        level = interaction.options.getInteger("level");
                    };
                    console.log(level);
                    for(let i = 0; i < battles; i++){
                        await defeat(box, charId, level);
                    }
                    await interaction.editReply("done!")

                }else{

                  await interaction.editReply("you dont have this character");
                };

            }else{

                await interaction.editReply("you dont have a box");
            }

        }else{

            await interaction.editReply("You dont have perms");
        }
		
	},
};