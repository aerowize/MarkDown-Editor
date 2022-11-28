const editorText = document.getElementById("editor-text"); // textarea for raw markdown

// Creates the HTML file for the iframe.
const makeDoc = (md) => {
  // assign the iframe to a var
  let previewFrame = document.getElementById("preview-frame");

  // Create the HTML document
  let doc = document.implementation.createHTMLDocument("");
  // Create the CSS <link /> element
  let style = doc.createElement("link");
  // Set the rel attribute
  style.setAttribute("rel", "stylesheet");
  // Set the href attribute for the iframes css file
  style.setAttribute("href", "./css/preview.css");
  // Append the CSS link to the HTML doc
  doc.head.appendChild(style);

  // Create the main element
  let main = doc.createElement("main");
  // add the parsed markdown from markedjs
  main.innerHTML = md;
  // Append the <main /> to the HTML
  doc.body.appendChild(main);

  // Copy and paste from mozilla, that finishes the iframe
  // and html process
  let destDocument = previewFrame.contentDocument;
  let srcNode = doc.documentElement;
  let newNode = destDocument.importNode(srcNode, true);

  destDocument.replaceChild(newNode, destDocument.documentElement);
};

// Take <input /> text to parse and add to iframe
const render = (textState) => {
  // Parse the raw markdown with markedjs
  let parsed = marked.parse(textState);
  // Iframe and html content gets created for the preview.
  makeDoc(parsed);
};

// Editor <textarea /> input listener
editorText.addEventListener("input", (e) => {
  // Get the value
  let text = editorText.value;

  if (e) {
    // if it exists render it to the preview iframe
    render(text);
  }
});

const deleteMd = () => {
  makeDoc("");
  editorText.value = "";
};

// Selects the <header />
const click = document.querySelector("header");

// Listens for clicks on any of the headers buttons
click.addEventListener("click", (e) => {
  let bb = e.target.closest(".clicker");
  if (bb) {
    if (bb.value === "new") console.log(bb.value);
    if (bb.value === "del") deleteMd();
    if (bb.value === "sav") console.log(bb.value);
  } else {
    return;
  }
});
