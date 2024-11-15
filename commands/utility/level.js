const { SlashCommandBuilder } = require('discord.js');
const Box = require("../../models/Box");
const Character = require("../../models/Character");
const levelUp = require("../../levelUp");
const { start } = require('repl');

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
        if(interaction.member.permissions.has("ADMINISTRATOR")){
            
            const charId = interaction.options.getString("charid");
            let level = interaction.options.getInteger("level");
            const boxs = await Box.findOrCreate({where: {id: interaction.user.id}});
            const box = boxs[0];
        

            if(box[charId] == true){
                const char = await Character.findOne({where: {id: charId}});
                const startingLevel = box[charId + "Level"];

                if(level == null){

                    level = 1;
                }
                for(let i = 0; i < level; i++){
                
                    await levelUp(box, charId);

                };

                const newLevel = box[charId + "Level"];

                await interaction.editReply(`leveled up ${newLevel - startingLevel} times`);
            }else {
                await interaction.editReply({content: "you dont have this character"});

            }
        }else {

            interaction.editReply("you dont have perms");
        };
        
        
	},
};