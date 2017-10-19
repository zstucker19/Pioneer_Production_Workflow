//Require constructors
const Lot = require('./Constructors/lots_constructor');
const Process = require('./Constructors/process_constructor');
const WorkCenter = require('./Constructors/workcenter_constructor');
const Department = require('./Constructors/departments_constructor');

//Lots Array and Sub-Arrays based on Qualities
let totalTimeInnerLayers = 0;
let allLots = [];
let allProcesses = [];
let allWorkCenters = [];
let allDepartments = [];





//Use Lots Constructor to Generate 10000 Dummy Data Lots
let generateLots = function() {
    for(let i = 1; i <= 10000; i++) {
        allLots.push(new Lot(i));
    }
}();

//Use Process Constructor to Create New Processes
let etchInspect = new Process('Etch Inspect', 103, 200, 'Inner Layers Etch');
let innerLayersChemClean = new Process('Inner Layers Chem Clean', 104, 30, 'Inner Layers Photo');
let innerLayersDrill = new Process('Inner Layers Drill', 111, 300, 'Inner Layers Etch');
let innerLayersCobraBond = new Process('Inner Layers Cobra Bond', 116, 100, 'Inner Layers Photo');

//Use Work Center Constructor to Create New Work Centers
let innerLayersPhoto = new WorkCenter('Inner Layers Photo', 50, 'Inner Layers');
let innerLayersEtch = new WorkCenter('Inner Layers Etch', 60, 'Inner Layers');

//Use Department Constructor to Create New Departments
let innerLayers = new Department('Inner Layers');
let sub = new Department('Sub');




//Move Lots Objects that need Etch Inspect into Queue Array
let etchInspectLots = function() {
    for(let i = 0; i < allLots.length; i++) {
        if(allLots[i].etchInspect.doesEtchInspect) {
            etchInspect.lots.push(allLots[i]);
        }
    }
}();

//Move Lot Objects that need Chem Clean into Lots Queue Array
let innerLayersChemCleanLots = function() {
    for(let i = 0; i < allLots.length; i++) {
        if(allLots[i].innerLayersChemClean.doesInnerLayersChemClean) {
            innerLayersChemClean.lots.push(allLots[i]);
        }
    }
}();

//Move Lot Objects that need Inner Layers Drilling into Lots Queue Array
let innerLayersDrillLots = function() {
    for(let i = 0; i < allLots.length; i++) {
        if(allLots[i].innerLayersDrill.doesInnerLayersDrill) {
            innerLayersDrill.lots.push(allLots[i]);
        }
    }
}();

//Move Lot Objects that need Cobra Bond into Lots Queue Array
let innerLayersCobraBondLots = function() {
    for(let i = 0; i < allLots.length; i++) {
        if(allLots[i].innerLayersCobraBond.doesInnerLayersCobraBond) {
            innerLayersCobraBond.lots.push(allLots[i]);
        }
    }
}();



//Hard Coded to push into Process Array
allProcesses.push(etchInspect, innerLayersChemClean, innerLayersDrill, innerLayersCobraBond);


//Move Process Objects that are part of Inner Layers Work Centers into their respective Processes Arrays (if multiple)
let innerLayersProcs = function() {
    for(let i = 0; i < allProcesses.length; i++) {
        if(allProcesses[i].workCenter == 'Inner Layers Photo') {
            innerLayersPhoto.processes.push(allProcesses[i]);
        } else if(allProcesses[i].workCenter == 'Inner Layers Etch') {
            innerLayersEtch.processes.push(allProcesses[i]);
        }
    }
}();



//Hard Coded to push into Work Center Array
allWorkCenters.push(innerLayersPhoto, innerLayersEtch);

//Move Work Centers into their respective departments
let innerLayersWorkCenters = function() {
    for(let i = 0; i < allWorkCenters.length; i++) {
        if(allWorkCenters[i].department == 'Inner Layers') {
            innerLayers.workCenters.push(allWorkCenters[i]);
        } else if(allWorkCenters[i].department == 'Sub') {
            sub.workCenters.push(allWorkCenters[i]);
        }
    }
}();


//Push Departments into an Array of All Departments
allDepartments.push(innerLayers, sub);


//Console log to check lot ID from highest available level of production
let lotCheckID = function(lotID) {
    for(let i = 0; i < allDepartments.length; i++) {
        for(let j = 0; j < allDepartments[i].workCenters.length; j++) {
            for(let k = 0; k < allDepartments[i].workCenters[j].processes.length; k++) {
                for(let l = 0; l < allDepartments[i].workCenters[j].processes[k].lots.length; l++) {
                    if(lotID == allDepartments[i].workCenters[j].processes[k].lots[l].lotNum) {
                        return allDepartments[i].workCenters[j].processes[k].lots[l];
                    }
                }
            }
        }
    }
};

let addLots = function() {
    let lots = '';
    allLots.forEach(function(element) {
        lots += element.toString();
    }, this);
    let div = document.getElementById("lotInfo");
    div.innerHTML(lots);
}();