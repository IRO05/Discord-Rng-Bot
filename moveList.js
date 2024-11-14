

const moveList = {

    pnch: {
        name: "Punch",
        use: usePnch,
    },
    kck: {
        name: "Kick",
        use: useKck,
    },
    ovrdrv: {
        name: "Overdrive",
    },
    zmpnch: {
        name: "Zoom punch",

    },
    plck: {
        name: "Pluck",
    },
    snltyllwod: {
        name: "Sunlight Yellow Overdrive",
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