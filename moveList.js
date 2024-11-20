

const moveList = {

    pnch: {
        name: "Punch",
        use: usePnch,
    },
    drtybx: {
        name: "Dirty Boxing",
    },
    drn: {
        name: "Drain",
    },
    sngnslsh: {
        name: "Senguin Slash",
    },
    spcrpr: {
        name: "Space Ripper Eyes",
    },
    flshbd: {
        name: "Flesh Bud"
    },
    vprfrz: {
        name: "Vaporization Freezing Technique",
    },
    kck: {
        name: "Kick",
        use: useKck,
    },
    ovrdrvbrrg: {
        name: "Overdrive Barrage",
    },
    zmpnch: {
        name: "Zoom Punch",

    },
    plck: {
        name: "Pluck",
    },
    snltyllwod: {
        name: "Sunlight Yellow Overdrive",
    },
    ovrdrv: {
        name: "Overdrive",
    },
    scrltod: {
        name: "Scarlet Overdrive",
    },
    
};

function usePnch(pwr){

    const pwrMod = Math.round(pwr / 10);
    const damage = Math.floor((Math.random() * 2) + 1) * pwrMod;

    return {dmg: damage};

};

function useKck(pwr){

    const pwrMod = Math.round(pwr / 12);
    const damage = Math.floor((Math.random() * 4) + 1) * pwrMod;

        return {dmg: damage};

};


module.exports = moveList;