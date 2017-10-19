//Process Constructor

module.exports = function(name, procNum, avgTime, workCenter) {
    let thisProc = this;
    this.name = name;
    this.procNum = procNum;
    //Average Time per 100 boards (or something similar)
    this.avgTime = avgTime;
    //Define what Work Center this Process belongs to
    this.workCenter = workCenter;
    this.lots = [];
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
};
