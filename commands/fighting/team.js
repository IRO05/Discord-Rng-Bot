const { SlashCommandBuilder } = require('discord.js');
const Character = require("../../models/Character");
const Team = require("../../models/Team");
const Box = require("../../models/Box");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('team')
		.setDescription('sets your team')
        .addStringOption(option =>
            option.setName("slot1")
            .setDescription("name of character (case sensitive)")
            .setRequired(true)
        ).addStringOption(option =>
            option.setName("slot2")
            .setDescription("name of character (case sensitive)")
            .setRequired(false)
        ).addStringOption(option =>
            option.setName("slot3")
            .setDescription("name of character (case sensitive)")
            .setRequired(false)
        )
        ,
	async execute(interaction) {
        await interaction.deferReply();
        const slot1 = interaction.options.getString("slot1");
        const character1 = await Character.findOne({where: {name: slot1}});
        const boxs = await Box.findOrCreate({where: {id: interaction.user.id}});
        const box = boxs[0];

        if(character1 && box[character1.id] == true){
            const teams = await Team.findOrCreate({where: {id: interaction.user.id, slot1: character1.id}});
            const team = teams[0];
            let reply = await interaction.editReply("added slot 1 successfully");

            const slot2 = interaction.options.getString("slot2");
            if(slot2){

                const character2 = await Character.findOne({where: {name: slot2}});

                if(character2 && box[character2.id] && character1.id !== character2.id){

                    team.slot2 = character2.id;
                    reply = await interaction.editReply({content: reply.content + "\nadded slot 2 successfully"});
                }else{

                    reply = await interaction.editReply({content: reply.content + "\nyour second slot either does not exist or isnt formatted right"});
                };
            };
            
            const slot3 = interaction.options.getString("slot3");
            if(slot3){

                const character3 = await Character.findOne({where: {name: slot3}});
                console.log(character3);
                if(character3 && box[character3.id] && character1.id !== character3.id){

                    team.slot3 = character3.id;
                    reply = await interaction.editReply({content: reply.content + "\nadded slot 3 sucessfully"});
                }else{

                    reply = await interaction.editReply({content: reply.content + "\nyour third slot either does not exist or isnt formatted right"});
                };
            };
            
            await team.save();


        }else{

            interaction.editReply("your first slot either does not exist or isnt formatted right");
        }
        
	},
};