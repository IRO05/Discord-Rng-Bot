const { SlashCommandBuilder } = require('discord.js');
const Character = require("../../models/Character");
const Team = require("../../models/Team");
const Box = require("../../models/Box");

/* Desc:
    allows a player to assign characters to their team
*/

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
        //get the character name inputted first 
        const slot1 = interaction.options.getString("slot1");
        //find the characters entry in the table
        const character1 = await Character.findOne({where: {name: slot1}});
        //find or create all boxes with player id equal to user id
        const boxs = await Box.findOrCreate({where: {id: interaction.user.id}});
        //get the first box from the list
        const box = boxs[0];

        //check if the character exists and that the player owns that character
        if(character1 && box[character1.id] == true){
            //find or create all teams where player id is user id
            const teams = await Team.findOrCreate({where: {id: interaction.user.id, slot1: character1.id}});
            //get the first team
            const team = teams[0];
            //set slot 1 of the players team
            team.slot1 = character1.id;
            let reply = await interaction.editReply("added slot 1 successfully");

            //get the second character name
            const slot2 = interaction.options.getString("slot2");
            //check if a second character name was provided
            if(slot2){

                //find the character in the table
                const character2 = await Character.findOne({where: {name: slot2}});

                /*
                check if character exists
                check if player has that character
                check if the character is not the same as slot1
                */
                if(character2 && box[character2.id] && character1.id !== character2.id){

                    //set slot2 of the players team
                    team.slot2 = character2.id;
                    reply = await interaction.editReply({content: reply.content + "\nadded slot 2 successfully"});
                }else{

                    reply = await interaction.editReply({content: reply.content + "\nyour second slot either does not exist or isnt formatted right"});
                };
            };
            
            //get 3rd character name inputted
            const slot3 = interaction.options.getString("slot3");
            //check if a 3rd name was inputted
            if(slot3){

                //find the character in the table
                const character3 = await Character.findOne({where: {name: slot3}});
                /*
                check if the 3rd character exists
                check if the player owns the character
                check if the character is not the same as the first one
                */
                if(character3 && box[character3.id] && character1.id !== character3.id){
                    /*
                    NEEDS FIXING CHAR 3 AND CHAR 2 COULD BE THE SAME????
                    */

                    //set slot3 of the players team
                    team.slot3 = character3.id;
                    reply = await interaction.editReply({content: reply.content + "\nadded slot 3 sucessfully"});
                }else{

                    reply = await interaction.editReply({content: reply.content + "\nyour third slot either does not exist or isnt formatted right"});
                };
            };
            
            //save the database
            await team.save();


        }else{

            interaction.editReply("your first slot either does not exist or isnt formatted right");
        }
        
	},
};