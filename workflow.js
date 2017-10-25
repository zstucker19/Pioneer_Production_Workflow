//Testing Variables
let count = 0;

//Lots, Processes, Work Centers, and Departments Arrays 
let allLots = [];
let allProcesses = [];
let allWorkCenters = [];
let allDepartments = [];

//Lots Constructor

let Lot = function(lotNum) {
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

    this.processesNeeded = [];
    this.processesCompleted = [];

    this.hasProcess = function() {
        for(let i = 0; i < 100; i++) {
            let chance = Math.ceil(Math.random() * 1000);
            if(!thisLot.processesNeeded.includes(chance)) {
                thisLot.processesNeeded.push(chance);
            }
        }
    }();

};


//Process Constructor

let Process = function(name, processID, avgTime, workCenterID) {
    //Defined for Scope
    let thisProc = this;
    this.name = name;
    this.processID = processID;
    //Average Time per 100 boards (or something similar)
    this.avgTime = avgTime;
    //Define what Work Center this Process belongs to
    this.workCenterID = workCenterID;
    this.lots = [];
    this.findLots = function() {
        for(let i = 0; i < allLots.length; i++) {
            for(let j = 0; j < allLots[i].processesNeeded.length; j++) {
                count++;
                if(thisProc.processID == allLots[i].processesNeeded[j]) {
                    if(!thisProc.lots.includes(allLots[i].processesNeeded[j])) {
                        thisProc.lots.push(allLots[i]);
                    }
                }
            }
        }
    }();
    //Goes through the lots and checks how many boards are in each lot
    //Then multiplies that by the average time it takes each board to go through process
    this.currentWait = function() {
        let boardsInLot = 0;
        if(this.lots.length > 0) {
            for(let i = 0; i < this.lots.length; i++) {
                boardsInLot += this.lots[i].quantity;
            }
        } else {
            return 0;
        }
        return boardsInLot * this.avgTime;
    };
    //Push all processes on creation
    allProcesses.push(this);
};

//Work Center Constructor

let WorkCenter = function(name, workCenterID, departmentID) {
    //Defined for scope
    let thisWorkCenter = this;
    this.type = 'Work Center';
    this.name = name;
    this.workCenterID = workCenterID;
    //Show what Department this is a part of
    this.departmentID = departmentID;
    //Place all Processes 
    this.processes = [];
    this.findProcesses = function() {
        for(let i = 0; i < allProcesses.length; i++) {
            if(thisWorkCenter.workCenterID == allProcesses[i].workCenterID) {
                if(!thisWorkCenter.processes.includes(allProcesses[i])) {
                    thisWorkCenter.processes.push(allProcesses[i]);
                }
            }
        }
    }();
    //Push all WorkCenters into Array on Creation
    allWorkCenters.push(this);
};


//Department Constructor
let Department = function(name, departmentID) {
    //Defined for scope
    let thisDepartment = this;
    this.type = 'Department';
    this.name = name;
    this.departmentID = departmentID;
    //Place all Work Centers
    this.workCenters = [];
    this.findWorkCenters = function() {
        for(let i = 0; i < allWorkCenters.length; i++) {
            if(thisDepartment.departmentID == allWorkCenters[i].departmentID) {
                if(!thisDepartment.workCenters.includes(allWorkCenters[i])) {
                    thisDepartment.workCenters.push(allWorkCenters[i]);
                }
            }
        }
    }();
    //Push all Departments into Array on Creation
    allDepartments.push(this);
};


//Use Lots Constructor to Generate 10000 Dummy Data Lots
let generateLots = function() {
    for(let i = 1; i <= 1000; i++) {
        allLots.push(new Lot(i));
    }
}();






//Use Process Constructor to Create New Processes
let engrBacklog = new Process('Engineering Backlog', 1, 0, 010);
let prodBacklog = new Process('Production Backlog', 2, 0, 020);
let waitingForPackSlip = new Process('Waiting For Pack Slip', 997, 0, 997);
let waitingForSub = new Process('Waiting for Sub', 998, 0, 074);
let complete = new Process('Complete', 999, 0, 997);
let travelerNotCompleted = new Process('Traveler Not Completed', 996, 0, 010);
let combinedOrderProc = new Process('Combined Order', 10, 199);
let waitingForMATL = new Process('Waiting For Material', 11, 0, 030);
let assyBacklog = new Process('Assembly Backlog', 12, 0, 801);
let issueLaminate = new Process('Issue Laminate', 20, 0, 030);
let issueAcrylicAdhesive = new Process('Issue Acrylic Adhesive', 22, 0, 074);
let issueBondPly = new Process('Issue Bond-Ply', 24, 0, 074);
let issueCopperFoil = new Process('Issue Copper Foil', 26, 0, 030);
let issueCoverCoat = new Process('Issue Covercoat', 28, 0, 074);
let issueHeatSink = new Process('Issue Heat Sink', 30, 0, 074);
let issueMiscMaterials = new Process('Issue Misc Materials', 32, 0, 030);
let issuePrePreg = new Process('Issue Pre-Preg', 34, 0, 074);
let issuePSA = new Process('Issue PSA', 36, 0, 074);
let issueStiffiner = new Process('Issue Stiffiner', 38, 0, 074);
let iLChemClean1 = new Process('I/L Chem Clean 1', 50, 0, 050);
let iLResistCoat1 = new Process('I/L Resist Coat 1', 52, 0, 050);
let iLImageFA = new Process('I/L Image F/A', 54, 0, 050);
let iLImage = new Process('I/L Image', 56, 0, 050);
let iLDevelop1 = new Process('I/L Develop 1', 58, 0, 050);
let iLTouchUp1 = new Process('I/L Touch-Up 1', 60, 0, 050);
let iLEtchFA1 = new Process('I/L Etch F/A 1', 62, 0, 060);
let iLEtch2 = new Process('I/L Etch 2', 100, 0, 060);
let iLStripResist3 = new Process('I/L Strip Resist 3', 102, 0, 060);
let iLEtchInspect2 = new Process('I/L Etch Inspect 2', 104, 0, 060);
let iLLaserCutSkiveOutside = new Process('I/L Laser Cut/ Skive (Outside)', 106, 0, 055);
let iLPlasmaClean = new Process('I/L Plasma Clean', 108, 0, 082);
let iLSpartanicPunch = new Process('I/L Spartanic Punch', 112, 0, 068);
let iLAOIInspection = new Process('I/L AOI Inspection', 110, 0, 062);
let iLInspection2 = new Process('I/L Inspection 2', 114, 0, 050);
let iLSourceInspect = new Process('I/L Source Inspect', 116, 0, 050);
let iLCobraBond = new Process('I/L Cobra Bond', 118, 0, 069);
let iLIssueBondPlyTraveler = new Process('I/L Issue Bond-Ply Traveler', 120, 0, 074);
let iLAlignAndHeatTack1 = new Process('I/L Align and Heat Tack 1', 122, 0, 072);
let iLBondPlyLam = new Process('I/L Bond Lam', 124, 0, 072);
let iLBondPlyInspect = new Process('I/L Bond-Ply Inspect', 126, 0, 072);
let iLScreenSilverInk = new Process('I/L Screen Silver Ink', 128, 0, 110);
let iLSilverInkInspect = new Process('I/L Silver Ink Inspect', 130, 0, 110);
let iLIssueCCoatTraveler = new Process('I/L Issue C/Coat Traveler', 132, 0, 074);
let iLAlignAndHeatTack = new Process('I/L Align and Heat Tack', 134, 0, 072);
let iLCoverCoatLaminatino = new Process('I/L Covercoat Lamination', 136, 0, 072);
let iLCoverCoatInspect1 = new Process('I/L Covercoat Inspect 1', 138, 0, 072);
let packageForDrill = new Process('Package for Drill', 140, 0, 074);
let drillCoverCoat = new Process('Drill - Covercoat', 142, 0, 071);
let cadDesign = new Process('CAD Design', 13, 0, 001);
let qAReview = new Process('Q.A. Review', 14, 0, 120);
let prodReview = new Process('Production Review', 15, 0, 120);
let engPlanning = new Process('Engineering Planning', 16, 0, 010);
let iLEtch1 = new Process('I/L Etch 1', 64, 0, 060);
let iLStripResist1 = new Process('I/L Strip Resist 1', 66, 0, 060);
let iLEtchInspect1 = new Process('I/L Etch Inspect 1', 68, 0, 060);
let iLChemClean2 = new Process('I/L Chem Clean 2', 070, 0, 050);
let iLResistCoat2 = new Process('I/L Resist Coat 2', 72, 0, 050);
let iLImageFA2 = new Process('I/L Image F/A 2', 74, 0, 050);
let iLImageNiGold = new Process('I/L Image - Ni/Gold', 76, 0, 050);
let iLDevelop2 = new Process('I/L Develop 2', 78, 0, 050);
let iLTouchUp2 = new Process('I/L Touch-Up 2', 80, 0, 050);
let iLNickelPlateOutside = new Process('I/L Nickel Plate (Outside)', 82, 0, 055);
let iLGoldPlateOutside = new Process('I/L Gold Plate (Outside)', 84, 0, 055);
let iLXRayFlouresence = new Process('I/L X-Ray Flourensence', 86, 0, 060);
let iLInspection = new Process('I/L Inspection', 87, 0, 060);
let iLStripResist2 = new Process('I/L Strip Resist 2', 88, 0, 060);
let iLChemClean3 = new Process('I/L Chem Clean 3', 90, 0, 050);
let iLResistCoat3 = new Process('I/L Resist Coat 3', 92, 0, 050);
let iLImage3 = new Process('I/L Image 3', 94, 0, 050);
let iLDevelop3 = new Process('I/L Develop 3', 96, 0, 050);
let iLTouchUp3 = new Process('I/L Touch-Up 3', 98, 0, 050);
let drillBondPly = new Process('Drill- Bond-Ply', 144, 0, 071);
let drillStiffener = new Process('Drill - Stiffener', 146, 0, 071);
let drillTooling = new Process('Drill - Tooling', 148, 0, 071);
let routStiffener = new Process('Rout - Stiffener', 150, 0, 071);
let routRigidOuter = new Process('Rout - Rigid Outer', 152, 0, 071);
let iLDieCut = new Process('I/L Die Cut', 154, 0, 073);
let iLReturnToKitting = new Process('I/L Return to Kitting', 156, 0, 074);
let subIssueKittedSets = new Process('Sub Issued Kitting Sets', 200, 0, 064);
let subLaminationFa = new Process('Sub Lamination F/A', 202, 0, 065);
let subLaminationProc = new Process('Sub Lamination', 204, 0, 065);
let subXSectionLam = new Process('Sub X-Section - Lamination', 208, 0, 065);
let subLamPostBake = new Process('Sub Lam Post Bake', 206, 0, 065);
let subStampAWNumOnPanel = new Process('Sub Stamp A/W on Panel', 210, 0, 065);
let subTape1 = new Process('Sub Tape 1', 212, 0, 083);
let subDrill = new Process('Sub Drill', 214, 0, 081);
let subSandDeburrDrill = new Process('Sub Sand/Deburr - Drill', 216, 0, 081);
let subBakePrePlasma = new Process('Sub Bake - Pre-Plasma', 218, 0, 081);
let subPlasmaEtchBack1 = new Process('Sub Plasma Etch Back 1', 220, 0, 082);
let subXSectionPlasma = new Process('Sub X-Section Plasma', 222, 0, 081);
let subHighPressureH20 = new Process('Sub High Pressue H20', 224, 0, 081);
let subElectrolessCU1 = new Process('Sub Electroless CU 1', 226, 0, 084);
let subFlashCUPlate1 = new Process('Sub Flash CU Plate 1', 228, 0, 092);
let subFlashPlateInsp1 = new Process('Sub Flash Plate Inspect 1', 230, 0, 090);
let subCUPlatePanel = new Process('Sub CU Plate - Plate', 232, 0, 090);
let subPumiceScrub1 = new Process('Sub Pumice Scrub 1', 234, 0, 085);
let subResistCoat1 = new Process('Sub Resist Coat 1', 236, 0, 085);
let subImageFA1 = new Process('Sub Image F/A 1', 238, 0, 085);
let subImageButtonPlate = new Process('Sub Image - Button Plate', 246, 0, 085);
let subDevelop1 = new Process('Sub Develop 1', 242, 0, 085);
let subTouchUp1 = new Process('Sub Touch-Up 1', 244, 0, 066);
let subCUPlateButton = new Process('Sub CU Plate - Button', 246, 0, 092);
let subXSectionCUPlate1 = new Process('Sub X-Section CU Plate 1', 248, 0, 090);
let subStripResist1 = new Process('Sub Strip Resist 1', 250, 0, 090);
let subPumiceScrub2 = new Process('Sub Pumice Scrub 2', 252, 0, 085);
let subResistCoat2 = new Process('Sub Resist Coat 2', 254, 0, 085);
let subImageFA2 = new Process('Sub Image F/A 2', 256, 0, 085);
let subImage2 = new Process('Sub Image 2', 258, 0, 085);
let subDevelop2 = new Process('Sub Develop 2', 260, 0, 085);
let subTouchUp2 = new Process('Sub Touch-Up 2', 262, 0, 066);
let subCUPlatePattern = new Process('Sub CU Plate - Pattern', 264, 0, 090);
let subXSection2 = new Process('Sub X-Section 2', 266, 0, 090);
let subSolderPlate1 = new Process('Sub Solder Plate 1', 268, 0, 090);
let subStripResist2 = new Process('Sub Strip Resist 2', 270, 0, 092);
let subTouchUp3 = new Process('Sub Touch-Up 3', 272, 0, 090);
let subTapePreEtch = new Process('Sub Tape - Pre-Etch', 274, 0, 083);
let subEtchFA = new Process('Sub Etch F/A', 276, 0, 090);
let subEtch = new Process('Sub Etch', 278, 0, 093);
let subEtchInsp = new Process('Sub Etch in SP', 280, 0, 063);
let subSolderStrip = new Process('Sub Solder Strip', 282, 0, 092);
let subPumiceScrub3 = new Process('Sub Pumice Scrub 3', 284, 0, 085);
let subResistCoat3 = new Process('Sub Resist Coat 3', 286, 0, 085);
let subImageFA3 = new Process('Sub Image F/A 3', 288, 0, 085);
let subImageNiAu = new Process('Sub Image - Ni/Au', 290, 0, 085);
let subImageHoleFill = new Process('Sub Image - Hole Fill', 292, 0, 085);
let subDevelop3 = new Process('Sub Develop 3', 294, 0, 085);
let subTouchUp4 = new Process('Sub Touch-Up 4', 296, 0, 066);
let subSeleSolderStrip = new Process('Sub Sele/Solder Strip', 298, 0, 090);
let subNickelPlateOutside = new Process('Sub Nickel Plate (Outside)', 300, 0, 065);
let subGoldPlateOutside = new Process('Sub Gold Plate (Outside)', 302, 0, 065);
let subXRayFloursence = new Process('Sub X-Ray Floursence', 304, 0, 090);
let subHoleFill = new Process('Sub Hole Fill', 306, 0, 080);
let subSand = new Process('Sub Sand', 308, 0, 090);
let subStripResist3 = new Process('Sub Strip Resist 3', 310, 0, 092);
let subInspect1 = new Process('Sub Inspect', 312, 0, 110);
let subIssueBondPlyTravr = new Process('Sub Issue Bond-Ply Traveler', 314, 0, 065);
let subAlignAndHeatTack1 = new Process('Sub Align & Heat Tack 1', 316, 0, 065);
let subBondPlyLam = new Process('Sub Bond-Ply Lam', 318, 0, 065);
let subBondPlyLamInSP = new Process('Sub Bond-Ply Lam in SP', 320, 0, 065);
let subScreenSilverInk1 = new Process('Sub Screen Silver Ink 1', 322, 0, 110);
let subInSPSilverInk = new Process('Sub in SP Silver Ink', 324, 0, 110);
let subIssueCVRCoatTravlr = new Process("Sub Issue C'VR Coat Traveler", 326, 0, 072);
let subAlignAndHeatTack2 = new Process('Sub Align & Heat Tack 2', 328, 0, 065);
let subCoverCoatLam = new Process('Sub Covercoat Lamination', 330, 0, 072);
let subCoverCoatInsp = new Process('Sub Covercoat Inspection', 332, 0, 065);
let subDrill2ndStage = new Process('Sub Drill 2nd Stage', 334, 0, 081);
let subLaserCutSkiveOutside = new Process('Sub Laser Cut/Skive (Outisde)', 336, 0, 065);
let subPlasmaClean = new Process('Sub Plasma Clean', 338, 0, 081);
let subLegend = new Process('Sub Legend', 340, 0, 100);
let subIssueStiffenerTraveler = new Process('Sub Issue Stiffener Traveler', 342, 0, 074);
let subETestImpedance = new Process('Sub E-Test - Impedance', 344, 0, 125);
let subETestNetList = new Process('Sub E-Test - Net List', 346, 0, 125);
let subETestResistance = new Process('Sub E-Test - Resistance', 348, 0, 125);
let subDieCut = new Process('Sub Die Cut', 350, 0, 073);
let subRout = new Process('Sub Rout', 352, 0, 123);
let subSourceInsp = new Process('Sub Source Inspection', 356, 0, 065);
let subCobraBond = new Process('Sub Cobra Bond', 358, 0, 069);
let subReturnToKitting = new Process('Sub Return to Kitting', 360, 0, 065);
let issueKittedSets = new Process('Issue Kitted Sets', 400, 0, 074);
let laminationFA = new Process('Lamination F/A', 402, 0, 077);
let lamination = new Process('Lamination', 404, 0, 076);
let laminationPostBake = new Process('Lamination Post Bake', 0, 070);
let xSectionLamination = new Process('X-Section - Lamination', 408, 0, 074);
let stampAWNumOnPanel = new Process('Stamp A/W # on Panel', 410, 0, 077);
let tapeFlexAreas = new Process('Tape - Flex Areas', 412, 0, 083);
let drill1stStage = new Process('Drill - 1st Stage', 414, 0, 081);
let sandDeburrDrill = new Process('Sand/Deburr - Drill', 420, 0, 081);
let highPressureH201 = new Process('High Pressue H20 1', 422, 0, 081);
let bakePrePlasma = new Process('Bake - Pre-Plasma', 424, 0, 082);
let plasmaEtchBack1 = new Process('Plasma Etch Back 1', 426, 0, 082);
let xSectionPlasma = new Process('X-Section - Plasma', 428, 0, 082);
let highPressureH202 = new Process('High Pressue H20 2', 430, 0, 081);
let electrolessCopper1 = new Process('Electroless Copper 1', 432, 0, 084);
let shadowProcess = new Process('Shadow Process', 434, 0, 090);
let flashPlateCopper1 = new Process('Flash Plate Copper 1', 436, 0, 090);
let flashPlateInsp1 = new Process('Flash Plate Inspect 1', 438, 0, 090);
let cUPlatePanel = new Process('CU Plate - Panel', 440, 0, 092);
let xSectionCUPlate1 = new Process('X-Section - CU Plate 1', 442, 0, 090);
let pumiceScrub1 = new Process('Pumice Scrub 1', 444, 0, 085);
let resistCoat1 = new Process('Resist Coat 1', 446, 0, 085);
let oLImageFA1 = new Process('O/L Image F/A 1', 448, 0, 085);
let oLImage1 = new Process('O/L Image 1', 450, 0, 085);
let olDevelop1 = new Process('O/L Develop 1', 454, 0, 085);
let touchUp1 = new Process('Touch-Up 1', 454, 0, 078);
let cUPlateButton = new Process('CU Plate - Button', 456, 0, 092);
let xSectionCUPlate2 = new Process('X-Section - CU Plate 2', 458, 0, 090);
let stripResist1 = new Process('Strip Resist 1', 460, 0, 090);
let pumiceScrub2 = new Process('Pumice Scrub 2', 462, 0, 085);
let resistCoat2 = new Process('Resist Coat 2', 464, 0, 085);
let oLImageFA2 = new Process('O/L Image F/A 2', 466, 0, 085);
let oLImage2 = new Process('O/L Image 2', 468, 0, 085);
let olDevelop2 = new Process('O/L Develop 2', 470, 0, 085);
let touchUp2 = new Process('Touch-Up 2', 472, 0, 078);
let peelableMask = new Process('Peelable Mask', 474, 0, 110);
let cUPlatePattern = new Process('CU Plate - Pattern', 476, 0, 092);
let xSectionCUPlate3 = new Process('X-Section - CU Plate 3', 478, 0, 090);
let solderPlate1 = new Process('Solder Plate 1', 480, 0, 092);
let stripResist2 = new Process('Strip Resist 2', 482, 0, 090);
let pumiceScrub3 = new Process('Pumice Scrub 3', 484, 0, 085);
let resistCoat3 = new Process('Resist Coat 3', 486, 0, 085);
let oLImageFA3 = new Process('O/L Image F/A 3', 488, 0, 085);
let oLImage3 = new Process('O/L Image 3', 490, 0, 085);
let oLDevelop3 = new Process('O/L Develop 3', 492, 0, 085);
let touchUp3 = new Process('Touch-Up 3', 494, 0, 086);
let selectiveSolderStrip1 = new Process('Selective Solder Strip 1', 496, 0, 093);
let nickelPlate1Outside = new Process('Nickel Plate 1 (Outside)', 498, 0, 088);
let goldPlate1Outside = new Process('Gold Plate 1 (Ouside)', 500, 0, 088);
let nickelGoldPlate1Outside = new Process('Nickel/Gold Plate 1 (Outside)', 502, 0, 088);
let xRayFlourescenceAndTapeTest = new Process('X-Ray Flourescence & Tape - Test', 504, 0, 090);
let inspectionNiAu1 = new Process('Inspection - Ni/Au 1', 505, 0, 090);
let stripResist3 = new Process('Strip Resist 3', 506, 0, 090);
let drill2ndStage = new Process('Drill 2nd Stage', 508, 0, 081);
let touchUp4 = new Process('Touch-Up 4', 510, 0, 078);
let tape2 = new Process('Tape 2', 512, 0, 083);
let etchFA1 = new Process('Etch F/A 1', 514, 0, 093);
let solderStrip = new Process('Solder Strip', 518, 0, 090);
let solderBrite = new Process('Solder Brite', 520, 0, 090);
let inspectionEtch = new Process('Inspection - Etch', 522, 0, 093);
let drill3rdStage = new Process('Drill 3rd Stage', 524, 0, 081);
let resistCoat4 = new Process('Resist Coat 4', 528, 0, 085);
let pumiceScrub4 = new Process('Pumice Scrub 4', 526, 0, 085);
let oLImageFA4 = new Process('O/L Image F/A 4', 530, 0, 085);
let oLImage = new Process('O/L Image', 532, 0, 085);
let oLDevelop4 = new Process('O/L Develop 4', 534, 0, 085);
let touchUp5 = new Process('Touch-Up 5', 536, 0, 085);
let selectiveSStrip2 = new Process('Selective S/Strip 2', 538, 0, 090);
let nickelGoldPlate2Outside = new Process('Nickel/Gold Plate 2 (Outside)', 540, 0, 088);
let xRayFlourescence2 = new Process('X-Ray Flourescence 2', 542, 0, 090);
let inspectionNiAu2 = new Process('Inspection Ni/Au 2', 544, 0, 090);
let stripResist5 = new Process('Strip Resist 5', 546, 0, 092);
let pumiceScrub5 = new Process('Pumice Scrub 5', 548, 0, 085);
let resistCoat5 = new Process('Resist Coat 5', 550, 0, 085);
let oLImage5 = new Process('O/L Image 5', 554, 0, 085);
let oLImage6 = new Process('O/L Image 6', 554, 0, 085);
let oLDevelop5 = new Process('O/L Develop 5', 558, 0, 085);
let touchUp6 = new Process('Touch-Up 6', 554, 0, 085);
let etchFA2 = new Process('Etch F/A 2', 562, 0, 093);
let etch2 = new Process('Etch 2', 564, 0, 093);
let holeFill1 = new Process('Hole Fill 1', 566, 0, 080);
let sandHoleFill = new Process('Sand - Hole Fill', 568, 0, 080);
let stripResist6 = new Process('Strip Resist 6', 570, 0, 090);
let inspectionHoleFill = new Process('Inspection - Hole Fill', 572, 0, 080);
let solderStrip1 = new Process('Solder Strip 1', 574, 0, 090);
let iPCustomerSourceInspect = new Process('I/P Customer Source Inspect', 576, 0, 094);
let issueBondPlyTraveler = new Process('Issue Bond-Ply Traveler', 578, 0, 074);
let alignAndHeatTack1 = new Process('Align & Heat Tack 1', 580, 0, 072);
let bondPlyLamination = new Process('Bond-Ply Lamination', 582, 0, 072);
let inspectionBondPly = new Process('Inspection - Bond-Ply', 584, 0, 072);
let screenSilverInk1 = new Process('Screen Silver Ink 1', 586, 0, 110);
let xSectionSilverInk = new Process('X-Section - Silver Ink', 588, 0, 110);
let inspectionSilverInk = new Process('Inspection - Silver Ink', 590, 0, 110);
let issueCoverCoatTraveler = new Process('Issue Covercoat Traveler', 592, 0, 074);
let alignAndHeatTack2 = new Process('Align & Heat Tack 2', 594, 0, 097);
let coverCoatLamination = new Process('Covercoat Lamination', 596, 0, 076);
let inspectionCoverCoat = new Process('Inspection - Covercoat', 598, 0, 072);
let laserCutSkive1Outside = new Process('Laser Cut/Skive (Outside)', 600, 0, 088);
let plasmaClean = new Process('Plasma Clean', 602, 0, 082);
let ionicCleanTest1 = new Process('Ionic Clean Test 1', 604, 0, 110);
let sMaskLiquid = new Process('S/Mask - Liquid', 606, 0, 094);
let sMaskLPI = new Process('S/Mask - LPI', 608, 0, 094);
let sMaskDryFilm = new Process('S/Mask - Dry Film', 610, 0, 094);
let sMaskAdhesionTest = new Process('S/Mask - Adhesion Test', 612, 0, 094);
let electrolessNickelOutside = new Process('Electroless Nickel (Outside)', 614, 0, 088);
let immersionGold = new Process('Immersion Gold (Outside)', 616, 0, 088);
let eleNickelImmGoldOutside = new Process('Ele. Nickel/Imm. Gold (Outside)', 618, 0, 088);
let bakePreHaslFuse = new Process('Bake - Pre-Hasl/Fuse', 620, 0, 095);
let haslFA = new Process('Hasl F/A', 622, 0, 095);
let hasl = new Process('Hasl', 624, 0, 095);
let fuseFA = new Process('Fuse F/A', 626, 0, 095);
let fuse = new Process('Fuse', 628, 0, 095);
let inspHaslFuse = new Process('Inspect - Hasl/Fuse', 630, 0, 095);
let legend = new Process('Legend', 632, 0, 100);
let iDBoardsAndCoupons = new Process('I.D. Boards & Coupons', 634, 0, 100);
let eTestNetList = new Process('E-Test - Net List', 636, 0, 125);
let alignHeatTack3 = new Process('Align/Heat Tack 3', 638, 0, 072);
let routFinal = new Process('Rout - Final', 640, 0, 123);
let counterBore = new Process('Counter Bore', 642, 0, 123);
let counterSink = new Process('Counter Sink', 644, 0, 123);
let vScoreOutside = new Process('V-Score (Outside)', 646, 0, 125);
let dieCutFinal = new Process('Die Cut - Final', 648, 0, 073);
let laserCutSkive2Outside = new Process('Laser Cut/Skive 2 (Outside)', 650, 0, 088);
let xSectionFinal = new Process('X-Section - Final', 652, 0, 129);
let groupBTestingOutside = new Process('Group B Testing (Outside)', 654, 0, 088);
let bondHeatSink = new Process('Bond Heatsink', 656, 0, 130);
let eTestImpedance = new Process('E-Test - Impedance', 658, 0, 125);
let eTestResistance = new Process('E-Test - Resistance', 660, 0, 125);
let foldTest = new Process('Fold Test', 662, 0, 130);
let inspectionPreFinal = new Process('Inspection - Pre-Final', 664, 0, 105);
let applyFillet = new Process('Appy Fillet', 666, 0, 128);
let whiteTinOutside = new Process('White Tin (Outside)', 668, 0, 088);
let finalCleanProc = new Process('Final Clean', 670, 0, 129);
let formBendCable = new Process('Form (Bend) Cable', 672, 0, 130);
let iPSourcePreAssembly = new Process('I/P Source - Pre-Assembly', 674, 0, 110);
let returnToAssyKitt = new Process('Return to Assembly Kitting', 676, 0, 700);
let issueAssemblyKit = new Process('Issue Assembly Kit', 800, 0, 810);
let subInspect2 = new Process('Sub Inspect 2', 354, 0, 050);
let inspectionFinal = new Process('Inspection - Final', 980, 0, 130);







//Use Work Center Constructor to Create New Work Centers
let engineeringBacklog = new WorkCenter('Engineering Backlog', 010, 010);
let productionBacklog = new WorkCenter('Production Backlog', 020, 010);
let shipping = new WorkCenter('Shipping', 997, 130);
let laminationKitting = new WorkCenter('Lamination Kitting', 074, 070);
let combinedOrder = new WorkCenter('Combined Order', 199, 130);
let material = new WorkCenter('Material', 030, 050);
let assemblyBacklog= new WorkCenter('Assembly Backlog', 801, 800);
let iLPhoto = new WorkCenter('I/L Photo', 050, 050);
let iLEtch = new WorkCenter('I/L Etch', 060, 050);
let iLOutside = new WorkCenter('I/L Outside', 055, 050);
let plasma = new WorkCenter('Plasma', 082, 100);
let laminationSpartanic = new WorkCenter('Lamination Spartanic', 068, 070);
let iLAOI = new WorkCenter('I/L AOI', 062, 050);
let laminationCobraBond = new WorkCenter('Lamination Cobra Bond', 069, 070);
let laminationCoverCoat = new WorkCenter('Lamination Covercoat', 072, 070);
let screening = new WorkCenter('Screening', 110, 100);
let laminationDrilling = new WorkCenter('Lamination Drilling', 071, 070);
let designCenter = new WorkCenter('Design', 001, 001);
let qA = new WorkCenter('Q.A.', 120, 130);
let laminationDieCut = new WorkCenter('Lamination Die Cut', 073, 070);
let subKitting = new WorkCenter('Sub Kitting', 064, 065);
let subLamination = new WorkCenter('Sub Lamination', 065, 065);
let taping = new WorkCenter('Taping', 083, 065);
let drill = new WorkCenter('Drill', 083, 065);
let electroless = new WorkCenter('Electroless', 084, 065);
let copperPlate = new WorkCenter('Copper Plate', 092, 065);
let wetProcess = new WorkCenter('Wet Process', 090, 065);
let oLPhoto = new WorkCenter('O/L Photo', 085, 065);
let inProcInspSub = new WorkCenter('In Process Inspection Sub', 066, 065);
let preFinalLamInspection = new WorkCenter('In Process Pre Final Lam Inspection', 063, 065);
let holeFill = new WorkCenter('Hole Fill', 80, 065);
let legendID = new WorkCenter('Legend / ID', 100, 065);
let test = new WorkCenter('Test', 125, 065);
let rout = new WorkCenter('Rout', 123, 065);
let laminationBreakDown = new WorkCenter('Lamination Break Down', 077, 070);
let laminationPressAutoClave = new WorkCenter('Lamination Press-AutoClave', 076, 070);
let touchUp = new WorkCenter('Touch-Up', 078, 100);
let inProcInspPhoto = new WorkCenter('In Process Inspection Photo', 086, 100);
let oLEtch = new WorkCenter('O/L Etch', 093, 100);
let outsideService = new WorkCenter('Outside Service', 088, 100);
let soldermask = new WorkCenter('Soldermask', 094, 100);
let finalCoverCoat = new WorkCenter('Final Covercoat', 076, 070);
let solderLevelFuse = new WorkCenter('Solder Level/ Fuse', 095, 100);
let xSection = new WorkCenter('X-Section', 129, 130);
let inspection = new WorkCenter('Inspection', 105, 130);
let filletFinal = new WorkCenter('Fillet-Final', 128, 130);
let finalClean = new WorkCenter('Cleaning Final', 129, 130);
let assemblyBBFinishedGoods = new WorkCenter('Assembly Bareboards Finished Goods', 700, 800);
let assemblyKitting = new WorkCenter('Assembly Kitting', 810, 800);
let finalProcess = new WorkCenter('Final Process', 130, 130);
let source = new WorkCenter('Source', 140, 130);
let laminationStiffeners = new WorkCenter('Lamination Stiffeners', 115, 070);
let assemblyOutsideServices = new WorkCenter('Assembly Outside Service', 825, 800);
let assemblySolder = new WorkCenter('Assembly Solder', 820, 800);
let assemblyPotting = new WorkCenter('Assembly Potting', 830, 800);
let assemblyInspection = new WorkCenter('Assembly Inspection', 835, 800);
let assemblyTesting = new WorkCenter('Assembly Testing', 827, 800);
let assemblySource = new WorkCenter('Assembly Source', 850, 800);
let smt = new WorkCenter('SMT', 822, 800);





//Use Department Constructor to Create New Departments
let innerLayers = new Department('Inner Layers', 050);
let sub = new Department('Sub', 065);
let outerLayers = new Department('Outer Layers', 100);
let finalLam = new Department('Final Lam', 070);
let final = new Department('Final', 130);
let engineering = new Department('Engineering', 10);
let consignment = new Department('Consignment', 135);
let assembly = new Department('Assembly', 800);
let design = new Department('Design', 001)




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

console.log(lotCheckID(4));