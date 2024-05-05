var db = require('./db.js');

const wspeed=1.6
const targetVillage={
    Quartier_generale: 20,
    Caserma: 25,
    Stalla: 20,
    Officina: 10,
    Accademia: 3,
    Fabbro: 20,
    Mercato: 10,
    Taglialegna: 30,
    Pozzo_di_argilla: 30,
    Miniera_di_ferro: 30,
    Fattoria: 30,
    Magazzino: 30,
    Nascondiglio: 5,
    Mura: 20,
    Statua: 1,
}

const gain={
    lc_value_over_time:21*24,   //QUANTO TEMPO USO UNA LC? IN GIORNI*ORE
    spear_value_over_time:21*24, //QUANTO TEMPO USO UNA LANCIA? IN GIORNI*ORE
    spear:3.7,
    lc: 10.7,
}
var village



exports.startSim = async function () {

    await db.dbConnection()

    //init village
    village={
        Quartier_generale: 1,
        Caserma: 0,
        Stalla: 0,
        Officina: 0,
        Accademia: 0,
        Fabbro: 0,
        Mercato: 0,
        Taglialegna: 0,
        Pozzo_di_argilla: 0,
        Miniera_di_ferro: 0,
        Fattoria: 1,
        Magazzino: 1,
        Nascondiglio: 1,
        Mura: 0,
        Statua: 0,
        timber: 900,
        clay: 900,
        iron: 900,
        pop: 7,
        pop_max:240,
        space:1000,
        spear:0,
        sword:0,
        axe:0,
        scout:0,
        lc:0,
        hc:0,
        ram:0,
        cata:0,
        noble:0
    }


    // simEnd=false
    // while(simEnd){

    //     //WAITING OR ASKING FOR RESOURCE

    //     //BUILDING        
    //     addBuilding(con)
    //     //CHECK IF ALL THE BUILDINGS ARE COMPLETED
    //     simEnd=true
    //     for (key in targetVillage){
    //         if(!evalSim(key,village,targetVillage))
    //              simEnd=false
    //      }
    //      if(simEnd)
    //         console.log("sim is over, exiting")
        
    // }

    addBuilding()

}

function addBuilding() {
    console.log(barracksValue())
}

//GIVING RESOURCES AND PRIORITY, RETURN THE BEST BUILDING TO BUILD
function evalBuilding(){

}

//CHECK IF ONE BUILDING THE VILLAGE IS COMPLETED
function evalSim(key,village,targetVillage){
    if(village[key]==targetVillage[key])
        return true
    else
        return false
}

//GETS VALUE OF BUILDING BARRACK
 async function barracksValue (){
    level=village.Caserma
    var binfo =  await db.getBuilding(level,"Caserma")
    var binfoLow =  await db.getBuilding(level-1,"Caserma")
    var tinfo = await db.getTroop("Lanciere")

    
    var spearRec_time=parseFloat(binfo.factor.replace(",","."))*parseInt(tinfo.Base_recruiting_time)/wspeed
    var nSpear =3600/spearRec_time -3600/(parseFloat(binfoLow.factor.replace(",","."))*parseInt(tinfo.Base_recruiting_time)/wspeed)
    var spearCost = (tinfo.Wood+tinfo.Clay+tinfo.Iron)*nSpear
    var buildingCost = binfo.Wood+binfo.Clay+binfo.Iron
    var totalCost =spearCost+buildingCost
    var spearGain = gain.spear*nSpear
    
    var value= spearGain/totalCost

    //dato il tempo di valore di una lancia, sommo il gain per ogni ora e divido per costo totale
    var value= (gain.spear_value_over_time/2)*(1+gain.spear_value_over_time)*spearGain/totalCost

    console.log("costo caserma: "+totalCost+" guadagno orario: "+spearGain)
    console.log("value: "+value)
    return value
}

//GETS VALUE OF BUILDING STABLE
async function stableValue (){
    level=village.Stalla
    var binfo =  await db.getBuilding(level,"Stalla")
    var binfoLow =  await db.getBuilding(level-1,"Stalla")
    var tinfo = await db.getTroop("Cavalleria_leggera")

    
    var lcRec_time=parseFloat(binfo.factor.replace(",","."))*parseInt(tinfo.Base_recruiting_time)/wspeed
    var nLc =3600/lcRec_time -3600/(parseFloat(binfoLow.factor.replace(",","."))*parseInt(tinfo.Base_recruiting_time)/wspeed)
    var lcCost = (tinfo.Wood+tinfo.Clay+tinfo.Iron)*nLc
    var buildingCost = binfo.Wood+binfo.Clay+binfo.Iron
    var totalCost =lc+buildingCost
    var lcGain = gain.lc*nLc
    
    var value= lcGain/totalCost

    //dato il tempo di valore di una lancia, sommo il gain per ogni ora e divido per costo totale
    var value= (gain.lc_value_over_time/2)*(1+gain.lc_value_over_time)*lcGain/totalCost

    console.log("costo caserma: "+totalCost+" guadagno orario: "+lcGain)
    console.log("value: "+value)
    return value
}





//RETURN BUILD TIME IN SECONDS
function getBuildTime(level){

    if(level<5){
        return 10*60
    }
    else if(level<10){
        return 30*60
    }
    else if(level<10){
        return 60*60
    }
    else if(level<15){
        return 120*60
    }
    else if(level<20){
        return 180*60
    }
    else if(level<25){
        return 240*60
    }
    else if(level<30){
        return 300*60
    }
}


//get approximate return of investment rate
async function getYield(level){
    var binfo =  await db.getBuilding(level,"Taglialegna")
    var buildingCost = binfo.Wood+binfo.Clay+binfo.Iron

    return binfo.factor/buildingCost
}