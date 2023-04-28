  
  function h(tag, attrs, children) {
    var newTag = document.createElement(tag);
    var newContent = document.createTextNode(children);
    newTag.appendChild(newContent);

    if(!!attrs){
        if(!!attrs.class){
            newTag.className = attrs.class
        }   
    }

    return newTag;
  }


  var newDiv = h("div", {class: "largePrint"}, "Hello Kindle");

  // add the newly created element and its content into the DOM
  const app = document.getElementById("app");
  app.appendChild(newDiv, app);