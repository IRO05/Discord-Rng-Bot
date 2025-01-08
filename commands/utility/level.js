const { SlashCommandBuilder } = require('discord.js');
const Box = require("../../models/Box");
const Character = require("../../models/Character");
const levelUp = require("../../levelUp");
const { start } = require('repl');

/* Desc:
    allows an admin to level up a character in their box 
*/

module.exports = {
	data: new SlashCommandBuilder()
		.setName('level')
		.setDescription('dev tool for leveling characters in your box')
        .addStringOption(option => 
            option.setName("charid")
            .setDescription("id of character you wish to level")
            .setRequired(true)
        ).addIntegerOption(option =>
            option.setName("level")
            .setDescription("amount you wish to level by")
        )
        ,
	async execute(interaction) {
        await interaction.deferReply();

        //check if user is admin
        if(interaction.member.permissions.has("ADMINISTRATOR")){
            
            //get the inputted chracter id
            const charId = interaction.options.getString("charid");
            //get the level inputted if inputted
            let level = interaction.options.getInteger("level");
            //find or create all boxes with the users id
            const boxs = await Box.findOrCreate({where: {id: interaction.user.id}});
            //take the first box
            const box = boxs[0];
        

            //check if the player has the chracter 
            if(box[charId] == true){
                //find the chracter in the character table
                const char = await Character.findOne({where: {id: charId}});
                //get the level of the plagers cbaracter
                const startingLevel = box[charId + "Level"];

                //check if the user inputted a level
                if(level == null){

                    //if no level set it to 1
                    level = 1;
                }
                //loop level many times
                for(let i = 0; i < level; i++){
                
                    //call level up using the box and the chracter id
                    await levelUp(box, charId);

                };

                //get the current level of the chracter
                const newLevel = box[charId + "Level"];

                //output the ammount of times leveled keeping in mind the max level
                await interaction.editReply(`leveled up ${newLevel - startingLevel} times`);
            }else {
                await interaction.editReply({content: "you dont have this character"});

            }
        }else {

            interaction.editReply("you dont have perms");
        };
        
        
	},
};