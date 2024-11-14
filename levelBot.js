module.exports = function levelBot(Hp, Spd, Pwr, level){
    const hpMod = Hp / 10;
    const spdMod = Spd / 10;
    const pwrMod = Pwr / 10;

    for(let currLevel = 1; currLevel < level; currLevel++){

        if (currLevel < 5) {

            Hp += Math.round(5 * hpMod);
            Spd += Math.round(5 * spdMod);
            Pwr += Math.round(5 * pwrMod);
    
        } else if (currLevel < 10) {
    
            Hp += Math.round(10 * hpMod);
            Spd += Math.round(10 * spdMod);
            Pwr += Math.round(10 * pwrMod);

        } else if (currLevel < 20) {
    
            Hp += Math.round(15 * hpMod);
            Spd += Math.round(15 * spdMod);
            Pwr += Math.round(15 * pwrMod);
    
        } else if (currLevel < 30) {
    
            Hp += Math.round(25 * hpMod);
            Spd += Math.round(25 * spdMod);
            Pwr += Math.round(25 * pwrMod);
        } else if (currLevel < 40) {
    
            Hp += Math.round(50 * hpMod);
            Spd += Math.round(50 * spdMod);
            Pwr += Math.round(50 * pwrMod);
        } else if (currLevel < 50) {
    
            Hp += Math.round(100 * hpMod);
            Spd += Math.round(100 * spdMod);
            Pwr += Math.round(100 * pwrMod);
        };
    };

    return{Hp, Spd, Pwr};

};