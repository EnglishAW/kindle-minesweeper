
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

function makeCell(id) {
    return h("div", {class: "cell", id:id, disable: "false"}, []);
}
function makeCellArray() {
    var cellArray = [];
    var numCol = 10;
    for(var i = 0; i < 100; i++){
        var rowCol = (i/numCol).toString().split('.');
        var id = "cell-" + rowCol[0] + "-" + rowCol[1];
        cellArray.push(makeCell(id));
    }
    return cellArray;
}

//   var textP = h("p", {}, ["I'm a paragragh!"])
//   var textP2 = h("p", {}, ["I'm a paragragh Too!"])
var cellArray = makeCellArray();
// console.log(cellArray)
var boardEl = h("div", {class: "board"}, cellArray);
// var newDiv = h("div", {class: "largePrint"}, ["Hello World"]);

// add the newly created element and its content into the DOM
const app = document.getElementById("app");
app.appendChild(boardEl, app);