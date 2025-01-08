const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Box = require("../../models/Box");
const Character = require("../../models/Character");
const moveList = require("../../moveList");
const Ability = require("../../models/Ability");

/* Desc:
    displays the moves of a character the player owns
*/

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
        //get the name of the character inputted
        const charName = interaction.options.getString("charname");
        //find the character entry with the same name
        const char = await Character.findOne({where: {name: charName}});
        //check if the character exists
        if(char !== null){

            //find or create all boxes where player id is user id
            const boxs = await Box.findOrCreate({where: {id: interaction.user.id}});
            //get the first box
            const box = boxs[0];
            //check if the player owns the character
            if(box[char.id] == true){

                //get the level of the players character
                const level = box[char.id + "Level"];
                //get what ability the character has equipped
                const abilityId = box[char.id + "Ability"];
                //find the ability entry
                const ability = await Ability.findOne({where: {id: abilityId}});
                //initialize array of moves known starting with the default move
                const movesKnown = [char.move1];
                //initialize array for moves from an ability
                const abilitiesKnown = [];

                /*
                    for each level milestone push the appropriate move to the corresponding array
                */
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
                
                //get which function the player wants to do (either view or equip)
                const choice = interaction.options.getString("function");
                //initialize our embed with a title of the characters name
                const embed = new EmbedBuilder()
                    .setTitle(char.name)
                
                //check if the function is view
                if(choice === "view"){

                    //set the footer of the embed to viewing
                    embed.setFooter({text: "viewing moves"})
                    //initialize an array of moves the character has equipped in the players box
                    const equipped = [box[char.id + "move1"]];
                    //check if the character has a second move equipped
                    if(box[char.id + "move2"] !== ""){

                        //push second move to equipped
                        equipped.push(box[char.id + "move2"]);
                    };
                    //check if character has a third 
                    if(box[char.id + "move3"] !== ""){

                        //push third move to equipped
                        equipped.push(box[char.id + "move3"]);
                    };

                    //loop through for how many movesknown
                    for(let i = 0; i < movesKnown.length; i++){

                        //get the move
                        let move = movesKnown[i]
                        //get the move name
                        let mname = moveList[move].name;
                        //check if move is equipped
                        if(equipped.includes(move)){

                            //add equipped tag to move name
                            mname += " (equipped)";
                        };
                        //check if the move is an ability move
                        if(abilitiesKnown.includes(move)){

                            //add ability tag to name
                            mname = "*(A)* " + mname;
                        };

                        //add the moves name and description to the embed
                        embed.addFields({name: mname, value: "description"});
                    }

                    //reply with embed
                    await interaction.editReply({embeds: [embed]});

                //else check if the function is equip
                }else if(choice === "equip"){

                    //get the move name
                    const moveName = interaction.options.getString("movename");
                    //get the slot number
                    const slot = interaction.options.getInteger("slot");
                    
                    //check if move name and slot number was inputted
                    if(moveName && slot){

                        //take movesknown and map it to the corresponding name
                        const moveNames = movesKnown.map(moveid => moveList[moveid].name);
                        //check if the movename given is in the list of movenames known
                        if(moveNames.includes(moveName)){
                            
                            //get list of moves equipped
                            const movesEquipped = [box[char.id + "move1"], box[char.id + "move2"], box[char.id + "move3"]];
                            //filter out the moveid's that dont have the right name
                            const moveid = movesKnown.filter(moveid => moveList[moveid].name === moveName)
                            //check if the move is not equipped
                            if(!movesEquipped.includes(moveid[0])){
                                //check if the slot given is a valid slot number
                                if(slot > 0 && slot < 4){

                                    //set the characters move to the new move
                                    box[char.id + "move" + slot] = moveid[0];
                                    //save the table
                                    await box.save();
                                    //add success message to embed
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

                //edit reply to be the embed
                await interaction.editReply({embeds: [embed]});
            }else{

                await interaction.editReply("You dont have this character");
            }


        }else{

            await interaction.editReply("this character does not exist or is not formatted correctly")
        }
        
	},
};