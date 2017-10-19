//Lots Constructor

module.exports = function(lotNum) {
    //declare thisLot variable for scope purposes
    let thisLot = this;
    //Helper Coin-Flip Function
    let isTrue = function() {
        if(Math.floor(Math.random() * 2) == 1) {
            return true;
        } else {
            return false;
        }
    };

    //General Information
    this.type = 'Lot';
    this.lotNum = lotNum;

    //Randomize qualities about lots for dummy data
    this.quantity = Math.ceil(Math.random() * 30);
    this.boardDollarValue = Math.ceil(Math.random() * 10000);
    this.boardDockDateDays = Math.ceil(Math.random() * 500);

    //Random qualities about what processes are neccesary on lot
    //Must change to false after completed
    this.innerLayersDrill = {
        name: 'Inner Layers Drill',
        doesInnerLayersDrill: isTrue(),
        innerLayersDrillTime: function() {
            if(this.doesInnerLayersDrill) {
                //Need accurate times later
                return (thisLot.quantity * 400);
            } else {
                return 0;
            }
        }
    };
    //Second Process Option
    this.etchInspect = {
        name: 'Etch Inspect',
        doesEtchInspect: isTrue(),
        etchInspectTime: function() {
            if(this.doesEtchInspect) {
                return (thisLot.quantity * 260);
            } else {
                return 0;
            }
        }
    };

    //Third Process Option
    this.innerLayersChemClean = {
        name: 'Inner Layers Chem Clean',
        doesInnerLayersChemClean: isTrue(),
        innerLayersChemCleanTime: function() {
            if(this.doesInnerLayersChemClean) {
                return (thisLot.quantity * 1000);
            } else {
                return 0;
            }
        }

    };

    //Fourth Process Option
    this.innerLayersCobraBond = {
        name: 'Inner Layers Cobra Bond',
        doesInnerLayersCobraBond: isTrue(),
        innerLayersCobraBondTime: function() {
            if(this.doesInnerLayersCobraBond) {
                return (thisLot.quantity * 300);
            } else {
                return 0;
            }
        }
    };

    //Calculates the Total Time Left
    this.innerLayersTime = (this.innerLayersDrill.innerLayersDrillTime() + this.etchInspect.etchInspectTime() + 
    this.innerLayersChemClean.innerLayersChemCleanTime() + this.innerLayersCobraBond.innerLayersCobraBondTime());
};