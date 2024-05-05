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

var template=[
    "quartier_generale",
    "taglialegna",
    "pozzo_di_argilla",
    "magazzino",
    "fattoria",
    "quartier_generale",
    "caserma"
]

var h

exports.startSim = async function () {

    await db.dbConnection()

    //init village
    village={
        quartier_generale: 1,
        caserma: 0,
        stalla: 0,
        officina: 0,
        accademia: 0,
        fabbro: 0,
        mercato: 0,
        taglialegna: 0,
        pozzo_di_argilla: 0,
        miniera_di_ferro: 0,
        fattoria: 1,
        magazzino: 1,
        nascondiglio: 1,
        mura: 0,
        statua: 0,
        legno: 900,
        argilla: 900,
        ferro: 900,
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
        noble:0,
        slot: 0
    }

    var time=0

    while(time<(60*24*3)){
        //PRODUCTION
        
        console.log("before")
        console.log(village)
        production(village)
        console.log("after")
        console.log(village)


        
        //checkBuilding(village)
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

    

}


function production(village){
    console.log("HERE-----------------------")
    console.log(village)
    village.legno += getResource(village.taglialegna,village.spear,village.lc,village.slot)

    return village

    function getResource(level,spear,lc,slot){
        var res_mine
        if(level>0){
            res_mine = wspeed*30*(1,163118)**(level-1)
        }
        else {
            res_mine = 25
        }
                    
        console.log("miniere producono "+res_mine)
        var res_spear
        iRatio1=0.10
        iRatio2=0.10
        iRatio3=0.10
        iRatio4=0.80
        df= wspeed**(-0.55) 
        switch(slot) {
            case 0:
                res_spear=0
            // code block
              break;
            case 1:
                iCap=40*spear
                res_spear = iCap * iRatio / ((Math.pow(Math.pow(iCap, 2) * 100 * Math.pow(iRatio, 2), 0.45) + 1800) * df)
                // code block
              break;
            case 2:
                iCap1= 40*(10/14)*spear
                iCap2= 40*(4/14)*spear
                res_spear = iCap1 * iRatio1 / ((Math.pow(Math.pow(iCap1, 2) * 100 * Math.pow(iRatio1, 2), 0.45) + 1800) * df)
                res_spear += iCap2 * iRatio2 / ((Math.pow(Math.pow(iCap2, 2) * 100 * Math.pow(iRatio2, 2), 0.45) + 1800) * df)
            // code block
                break;
            case 3:
                iCap1= 40*(4/14)*spear
                iCap2= 40*(4/14)*spear
                iCap3= 40*(4/14)*spear
                res_spear = iCap1 * iRatio1 / ((Math.pow(Math.pow(iCap1, 2) * 100 * Math.pow(iRatio1, 2), 0.45) + 1800) * df)
                res_spear += iCap2 * iRatio2 / ((Math.pow(Math.pow(iCap2, 2) * 100 * Math.pow(iRatio2, 2), 0.45) + 1800) * df)
                res_spear += iCap3 * iRatio3 / ((Math.pow(Math.pow(iCap3, 2) * 100 * Math.pow(iRatio3, 2), 0.45) + 1800) * df)
            // code block
                 break;
            case 4:
                iCap1= 40*(4/14)*spear
                iCap2= 40*(4/14)*spear
                iCap3= 40*(4/14)*spear
                res_spear = iCap1 * iRatio1 / ((Math.pow(Math.pow(iCap1, 2) * 100 * Math.pow(iRatio1, 2), 0.45) + 1800) * df)
                res_spear += iCap2 * iRatio2 / ((Math.pow(Math.pow(iCap2, 2) * 100 * Math.pow(iRatio2, 2), 0.45) + 1800) * df)
                res_spear += iCap3 * iRatio3 / ((Math.pow(Math.pow(iCap3, 2) * 100 * Math.pow(iRatio3, 2), 0.45) + 1800) * df)
                res_spear += iCap4 * iRatio4 / ((Math.pow(Math.pow(iCap4, 2) * 100 * Math.pow(iRatio4, 2), 0.45) + 1800) * df)
                // code block
                break;

          }
        console.log("rov produce: "+res_spear)
        var resTot = (res_mine+res_spear )/60
        return resTot
    }

}

function addBuilding() {
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
    //number of new spear with the level of barracks
    var nSpear =3600/spearRec_time -3600/(parseFloat(binfoLow.factor.replace(",","."))*parseInt(tinfo.Base_recruiting_time)/wspeed)

    var spearCost = (tinfo.Wood+tinfo.Clay+tinfo.Iron)
    var buildingCost = binfo.Wood+binfo.Clay+binfo.Iron
    //building cost + 
    var totalCost =spearCost*nSpear*(gain.spear_value_over_time+buildingCost)
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