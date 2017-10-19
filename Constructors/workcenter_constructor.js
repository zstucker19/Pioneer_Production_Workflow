//Work Center Constructor

module.exports = function(name, workCenterNum, department) {
    //Defined for scope
    let thisWorkCenter = this;
    this.type = 'Work Center';
    this.name = name;
    this.workCenterNum = workCenterNum;
    //Show what Department this is a part of
    this.department = department;
    //Place all Processes 
    this.processes = [];
};