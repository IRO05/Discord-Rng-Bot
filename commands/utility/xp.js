const { SlashCommandBuilder } = require('discord.js');
const Box = require("../../models/Box");
const defeat = require("../../defeat");

/* Desc:
    allows an admin to give xp to a chracter in their box by simulating battles won 
*/

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
        //get the inputted character id
        const charId = interaction.options.getString("charid");
        //get the number of battles they wish to put the charactee through
        const battles = interaction.options.getInteger("battles");

        //check if user is admin
        if(interaction.member.permissions.has("ADMINISTRATOR")){

            //find a box where player id is user id
            const box = await Box.findOne({where: {id: interaction.user.id}});
            //check if the box exists
            if(box){

                //check if the player has the character
                if(box[charId] == true){

                    //set level to a default of 1
                    let level = 1;
                    //check if player inputted a level
                    if(interaction.options.getInteger("level")){

                        //set level to inputted level
                        level = interaction.options.getInteger("level");
                    };
                    
                    //loop for how many battles the player inputted
                    for(let i = 0; i < battles; i++){
                        //call defeat using the players box, character id inputted, and level of bot
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