 function createElement(tagName, options, ...children) {
  const { classNames = [], attrs = {}, onClick = () => {} } = options;

  const element = document.createElement(tagName);
  
  element.classList.add(...classNames);

  const attributesTuples = Object.entries(attrs);

  for (const attribute of attributesTuples) {
    const [key, value] = attribute;
    element.setAttribute( key , value);
  }

  element.onclick = onClick;

  element.append(...children);

  return element;
}