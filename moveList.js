

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
    return 5 * pwrMod;

};

function useKck(pwr){

    const pwrMod = Math.round(pwr / 12);
    return 8 * pwrMod;

};


module.exports = moveList;