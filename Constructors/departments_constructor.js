//Department Constructor

module.exports = function(name) {
    //Defined for scope
    let thisDepartment = this;
    this.type = 'Department';
    this.name = name;
    //Place all Work Centers
    this.workCenters = [];
};