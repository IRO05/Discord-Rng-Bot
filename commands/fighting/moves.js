const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Box = require("../../models/Box");
const Character = require("../../models/Character");
const moveList = require("../../moveList");
const Ability = require("../../models/Ability");

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
        ).addStringOption(option =>
            option.setName("movename")
            .setDescription("name of move your equipping (if applicable)")
            .setRequired(false)
        ).addIntegerOption(option =>
            option.setName("slot")
            .setDescription("slot number you wish to equip 1-3")
            .setRequired(false)
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
                const abilityId = box[char.id + "Ability"];
                const ability = await Ability.findOne({where: {id: abilityId}});
                const movesKnown = [char.move1];
                const abilitiesKnown = [];
                if(level > 5){

                    movesKnown.push(ability.move1);
                    abilitiesKnown.push(ability.move1);
                };
                if(level > 9){

                    movesKnown.push(char.move2);
                };
                if(level > 19){

                    movesKnown.push(char.move3);
                };
                if(level > 29){

                    movesKnown.push(char.move4);
                };
                if(level > 39){

                    movesKnown.push(ability.move2);
                    abilitiesKnown.push(ability.move2);
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
                    const equipped = [box[char.id + "move1"]];
                    if(box[char.id + "move2"] !== ""){

                        equipped.push(box[char.id + "move2"]);
                    };
                    if(box[char.id + "move3"] !== ""){

                        equipped.push(box[char.id + "move3"]);
                    };

                    for(let i = 0; i < movesKnown.length; i++){

                        let move = movesKnown[i]
                        let mname = moveList[move].name;
                        if(equipped.includes(move)){

                            mname += " (equipped)";
                        };
                        if(abilitiesKnown.includes(move)){

                            mname = "*(A)* " + mname;
                        };

                        embed.addFields({name: mname, value: "description"});
                    }

                    await interaction.editReply({embeds: [embed]});

                }else if(choice === "equip"){

                    const moveName = interaction.options.getString("movename");
                    const slot = interaction.options.getInteger("slot");
                    
                    if(moveName && slot){

                        const moveNames = movesKnown.map(moveid => moveList[moveid].name);
                        if(moveNames.includes(moveName)){
                            
                            const movesEquipped = [box[char.id + "move1"], box[char.id + "move2"], box[char.id + "move3"]];
                            const moveid = movesKnown.filter(moveid => moveList[moveid].name === moveName)
                            if(!movesEquipped.includes(moveid[0])){
                                if(slot > 0 && slot < 4){

                                    box[char.id + "move" + slot] = moveid[0];
                                    await box.save();
                                    embed.addFields({name: moveName, value: "Sucessfully equipped to slot " + slot});
    
                                }else{
    
                                    await interaction.editReply("please specify a slot between 1-3");
                                }

                            }else{
                                
                                await interaction.editReply("you already have this move equiped");
                            }
                            

                        }else{

                            await interaction.editReply("You dont have this move or it is formatted incorrectly");
                        }
                        

                    }else{

                        await interaction.editReply("please specify move name and/or slot number");
                    }


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