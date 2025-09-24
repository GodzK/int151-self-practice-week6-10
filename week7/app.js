// create p
const pElement = document.createElement('p');
// create id = "p5"
const idAttr = document.createAttribute('id');
idAttr.value = 'p5';
// binding id=P5 to p element
pElement.setAttributeNode(idAttr);
// create text node
const textNode = document.createTextNode('Jookroo lakron');
// bindjg text node to p element
pElement.appendChild(textNode);
// binding p id to body
const body = document.body;
body.appendChild(pElement);
