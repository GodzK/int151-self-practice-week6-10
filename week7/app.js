// create p
const pElement = document.createElement('p');
// create id = "p5"
// const idAttr = document.createAttribute('id');
// idAttr.value = 'p5';

pElement.setAttribute('id', 'p5');
// binding id=P5 to p element
// pElement.setAttributeNode(idAttr);
// create text node
// solution 1 : const textNode = document.createTextNode('Jookroo lakron');

// solution 2 : 
pElement.textContent = 'Jookroo lakron';
// bindjg text node to p element
// solution 2 not need binding  pElement.appendChild(textNode);
// binding p id to body
const body = document.body;
body.appendChild(pElement);
