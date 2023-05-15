
function h(tag, attrs, children) {
    var newTag = document.createElement(tag);
    children.forEach(function (child) {
        
        if(typeof child === "string"){
            var newContent = document.createTextNode(child);
            newTag.appendChild(newContent);
        } else {
            newTag.appendChild(child);
        }
    })


    var settableAttrs = Object.keys(attrs);
    // var settableAttrs = Object.keys(attrs).filter(function (attr){
    //     var nonSettables = ['class'];
    //     return !nonSettables.includes(attr);
    // });

    settableAttrs.forEach(function (attr){
        newTag.setAttribute(attr, attrs[attr]);
    })

    if(!!attrs){
        if(!!attrs.class){
            newTag.className = attrs.class;
        }   
    }

    return newTag;
}

function includes(arr, item) {
    var isIncluded = false;
    arr.every(function (curr){
        if(curr === item) {
            isIncluded = true;
            return false;
        }
        return true;
    })
    // for(var curr of arr){
    //     if(curr === item) {
    //         isIncluded = true;
    //         break;
    //     }
    // }

    return isIncluded;
}

var ROW_LENGTH = 10;
var COL_LENGTH = 10;
var MODE = "DIG"; // DIG || FLAG

function getNeighborIndexes(index, rowLength) {
    var neighbors = [
        // top
        index - rowLength,
        // bottom
        index + rowLength,
    ];

    // var left = index - 1;
    // var rigth = index + 1;
    // var top = index - rowLength;
    // var bottom = index + rowLength;
    // var top_left = (index - rowLength) - 1;
    // var top_right = (index - rowLength) + 1;
    // var bottom_left = (index + rowLength) - 1;
    // var bottom_right = (index + rowLength) + 1;

    
    if(index%rowLength !== 0){
        // left
        neighbors.push(index - 1)

        // top left
        neighbors.push((index - rowLength) - 1);

        // bottom left
        neighbors.push((index + rowLength) - 1);
    }

    if(index%rowLength !== (rowLength-1)){
        // right
        neighbors.push(index + 1)

        // top right
        neighbors.push((index - rowLength) + 1);
        
        // bottom right
        neighbors.push((index + rowLength) + 1);
    }

    return neighbors;
}

function getMineCount(mineLocations, position) {
    var mineCount = 0;

    function checkMine(index) {
        return includes(mineLocations, index);
    }

    var neighbors = getNeighborIndexes(position, ROW_LENGTH);
    neighbors.forEach(function (pos){
        if(checkMine(pos)){
            mineCount += 1;
        }
    })

    return mineCount
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function getUniqueRandInt(min, max, exclude) {
    var randNum = getRandomInt(0, 100);
    // Check that the location is unique
    while(includes(exclude, randNum)){
        randNum = getRandomInt(0, 100);
    }

    return randNum 
}


function getMineLocations(numOfMines, numOfLocations) {
    var mineLocationList = [];
    for(var i = 0; i < numOfMines; i++){
        var randCell = getUniqueRandInt(0, numOfLocations, mineLocationList);
        mineLocationList.push(randCell);
    }
    return mineLocationList;
}

function makeCellData(value) {
    return {
        isChecked: false,
        isFlag: false,
        value: value,
    }
}

function makeCell(id, cellData) {
    var cellContentChildren;
    if(cellData.value === 9){
        cellContentChildren = ["@"];
    } else if(cellData.value > 0){
        cellContentChildren = [cellData.value.toString()];
    } else {
        cellContentChildren = [];
    }
    var cellClasses = "cell";
    var cellContent = [];
    if(cellData.isChecked){
        cellClasses += " checked";
        var cellContentEl = h("div", {class: "cell-content"}, cellContentChildren);
        cellContent = [cellContentEl];
    }
    
    return h("div", {class: cellClasses, id:id, disable: "false"}, cellContent);
}

// function revealCellValue(cellEl, board) {
//     var cellIdSplit = cellEl.id.split("-");
//     var cellIndex = parseInt(cellIdSplit[1] * ROW_LENGTH) + parseInt(cellIdSplit[2]);
//     console.log(board[cellIndex])
//     var cellValue = board[cellIndex].value;
    

//     var children;
//     if(cellValue === 9){
//         children = ["@"];
//     } else if(cellValue > 0){
//         children = [cellValue.toString()];
//     } else {
//         children = [];
//     }
//     var cellContentEl = h("div", {class: "cell-content"}, children);
//     cellEl.appendChild(cellContentEl);
// }

function checkCell(board, index) {
    if(index >= 0 && index < board.length && board[index].isChecked === false){
        board[index].isChecked = true;
        // console.log("VAL: " + board[index].value.toString())
        if(board[index].value === 0){
            var neighbors = getNeighborIndexes(index, ROW_LENGTH);
            // console.log(neighbors)
            neighbors.forEach(function(v) {
                checkCell(board, v);
            })
        }

    }
}

function makeBoardArray() {
    var cellArray = [];
    var numCol = 10;
    var mineLocations = getMineLocations(10, 100);
    for(var i = 0; i < 100; i++){
        var rowCol = (i/numCol).toString().split('.');
        var id = "cell-" + rowCol[0] + "-" + (rowCol[1] || 0);
        if(includes(mineLocations, i)){
            cellArray.push(makeCellData(9));
        } else {
            var numMine = getMineCount(mineLocations, i);
            
            cellArray.push(makeCellData(numMine));
        }
    }
    return cellArray;
}

function makeCellArray(board) {
    var numCol = 10;
    return board.map(function (cellData, i) {
        var rowCol = (i/numCol).toString().split('.');
        var id = "cell-" + rowCol[0] + "-" + (rowCol[1] || 0);

        return makeCell(id, cellData)
    })
}

var BOARD_ARRAY = makeBoardArray();
// console.log(BOARD_ARRAY)
var cellArray = makeCellArray(BOARD_ARRAY);
// console.log(cellArray)
var boardEl = h("div", {class: "board", id:"board"}, cellArray);
// var newDiv = h("div", {class: "largePrint"}, ["Hello World"]);

function redrawBoard(board) {
    const boardSectionEl = document.getElementById("board-section");
    const boardEl = document.getElementById("board");
    boardSectionEl.removeChild(boardEl);
    // console.log(board)
    var cellArray = makeCellArray(board);
    var newBoardEl = h("div", {class: "board", id:"board"}, cellArray);
    boardSectionEl.appendChild(newBoardEl);
}


window.addEventListener("click", function (e) {
    var classList = e.target.className.split(" ");
    // console.log(e);
    // console.log(classList);
    var cellIdSplit = e.target.id.split("-");
    var cellIndex = parseInt(cellIdSplit[1] * ROW_LENGTH) + parseInt(cellIdSplit[2]);
    checkCell(BOARD_ARRAY, cellIndex);
    
    redrawBoard(BOARD_ARRAY)
    // if(includes(classList, 'cell')){
    //     var cellEl = e.target//.parentNode;
        
    //     if(!includes(classList, 'active')){
    //         cellEl.className += " active";
    //         // revealCellValue(cellEl, BOARD_ARRAY);
    //     } else {
    //         // var filteredClassList = classList.filter(function (item) {
    //         //     if(item !== 'active'){
    //         //         return true;
    //         //     }
    //         // })

    //         // cellEl.className = filteredClassList.join(" ");
    //     }
    // }
});
// add the newly created element and its content into the DOM
const board = document.getElementById("board-section");
// console.log(board)
board.appendChild(boardEl);