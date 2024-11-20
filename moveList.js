

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
        use: useOvrdrvbrrg,
    },
    zmpnch: {
        name: "Zoom Punch",
        use: useZmpnch,

    },
    plck: {
        name: "Pluck",
        use: usePlck,
    },
    snltyllwod: {
        name: "Sunlight Yellow Overdrive",
        use: useSnltyllwod,
    },
    ovrdrv: {
        name: "Overdrive",
        use: useOvrdrv,
    },
    scrltod: {
        name: "Scarlet Overdrive",
        use: useScrltod,
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

function useOvrdrvbrrg(pwr){

};

function useZmpnch(pwr){

};

function usePlck(pwr){

};

function useSnltyllwod(pwr){

};

function useOvrdrv(pwr){

};

function useScrltod(pwr){

};

function useDrtybx(pwr){

};

function useDrn(pwr){

};

function useSngnslsh(pwr){

};

function useSpcrpr(pwr){

};

function useFlshbd(pwr){

};

function useVprfrz(pwr){

};

module.exports = moveList;