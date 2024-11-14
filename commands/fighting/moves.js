const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Box = require("../../models/Box");
const Character = require("../../models/Character");
const moveList = require("../../moveList");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('moves')
		.setDescription('lets you view what moves your character has')
        .addStringOption(option => 
            option.setName("function")
            .setDescription("do you wish to view or equip?")
            .setRequired(true)
            .addChoices({name: "view", value: "view"}, {name: "equip", value: "equip"})
        ).addStringOption(option =>
            option.setName("charname")
            .setDescription("name of character (case sensitive)")
            .setRequired(true)
        )
        ,
	async execute(interaction) {
        await interaction.deferReply();
        const charName = interaction.options.getString("charname");
        const char = await Character.findOne({where: {name: charName}});
        if(char !== null){

            const boxs = await Box.findOrCreate({where: {id: interaction.user.id}});
            const box = boxs[0];
            if(box[char.id] == true){

                const level = box[char.id + "Level"];
                const movesKnown = [char.move1];
                if(level > 9){

                    movesKnown.push(char.move2);
                };
                if(level > 19){

                    movesKnown.push(char.move3);
                };
                if(level > 29){

                    movesKnown.push(char.move4);
                };
                if(level > 49){

                    movesKnown.push(char.move5);
                };
                //add ability moves here too
                const choice = interaction.options.getString("function");
                const embed = new EmbedBuilder()
                    .setTitle(char.name)
                
                if(choice === "view"){

                    embed.setFooter({text: "viewing moves"})
                    for(let i = 0; i < movesKnown.length; i++){

                        let move = movesKnown[i]
                        embed.addFields({name: moveList[move].name, value: "description"});
                    }

                    await interaction.editReply({embeds: [embed]});

                }else if(choice === "equip"){

                    await interaction.editReply("equipping");
                }else{

                    await interaction.editReply("Wrong function");
                }

                await interaction.editReply({embeds: [embed]});
            }else{

                await interaction.editReply("You dont have this character");
            }


        }else{

            await interaction.editReply("this character does not exist or is not formatted correctly")
        }
        
	},
};