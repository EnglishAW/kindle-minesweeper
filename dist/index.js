
function h(tag, attrs, children) {
    var newTag = document.createElement(tag);
    children.forEach(function (child) {
        if(typeof child === "string"){
            var newContent = document.createTextNode(child);
            newTag.appendChild(newContent);
        } else {
            newTag.appendChild(child)
        }
    })



    if(!!attrs){
        if(!!attrs.class){
            newTag.className = attrs.class
        }   
    }

    return newTag;
}

function makeCell() {
    return h("div", {class: "cell"}, []);
}
function makeCellArray() {
    var cellArray = [];
    for(var i = 0; i < 100; i++){
        cellArray.push(makeCell());
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