  
  function h(tag, attrs, children) {
    var newTag = document.createElement(tag);
    children.forEach((child) => {
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

  var textP = h("p", {}, ["I'm a paragragh!"])
  var textP2 = h("p", {}, ["I'm a paragragh Too!"])
  var newDiv = h("div", {class: "largePrint"}, [textP, textP2]);

  // add the newly created element and its content into the DOM
  const app = document.getElementById("app");
  app.appendChild(newDiv, app);