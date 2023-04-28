  
  function h(tag, attrs, children) {
    var newTag = document.createElement(tag);
    var newContent = document.createTextNode(children);
    newTag.appendChild(newContent);
    
    return newTag;
  }


  var newDiv = h("div", null, "Hello Kindle");

  // add the newly created element and its content into the DOM
  const app = document.getElementById("app");
  app.appendChild(newDiv, app);