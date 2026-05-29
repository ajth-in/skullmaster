export function stripToShim(node: Node, depth = 0): Node | null {
  // 1. Text node transformation: replace characters with '#'
  if (node.nodeType === 3) {
    // TEXT_NODE
    const text = node.textContent;
    if (text) {
      node.textContent = text.replace(/\S/g, "#");
    }
    return node;
  }

  // If it's not an element node, ignore or return null
  if (node.nodeType !== 1) {
    // ELEMENT_NODE
    return null;
  }

  const element = node as HTMLElement;
  const tagName = element.tagName.toLowerCase();

  // 2. Remove script and style tags completely
  if (tagName === "script" || tagName === "style") {
    element.remove();
    return null;
  }

  // 3. Convert interactive elements and img tags to div
  const interactiveTags = ["a", "button", "input", "select", "textarea", "option", "label", "img"];
  let targetElement = element;
  if (interactiveTags.includes(tagName)) {
    const document = element.ownerDocument;
    const div = document.createElement("div");

    // Move all children to the new div
    while (element.firstChild) {
      div.appendChild(element.firstChild);
    }

    // Copy all attributes
    for (const attr of Array.from(element.attributes)) {
      div.setAttribute(attr.name, attr.value);
    }

    // Replace the element in the DOM tree
    if (element.parentNode) {
      element.parentNode.replaceChild(div, element);
    }

    targetElement = div;
  }

  // 4. Remove all attributes except class, style, width, height
  const allowedAttrs = ["class", "style", "width", "height"];
  for (const attr of Array.from(targetElement.attributes)) {
    if (!allowedAttrs.includes(attr.name.toLowerCase())) {
      targetElement.removeAttribute(attr.name);
    }
  }

  // 5. Append empty-set__skeleton class
  const currentClass = targetElement.getAttribute("class") || "";
  const classes = currentClass.split(/\s+/).filter(Boolean);
  if (!classes.includes("empty-set__skeleton")) {
    classes.push("empty-set__skeleton");
    targetElement.setAttribute("class", classes.join(" "));
  }

  // 5.5 Apply progressively darker shade of gray based on depth
  const lightness = Math.max(30, 94 - depth * 8);
  const grayColor = `hsl(0, 0%, ${lightness}%)`;
  const currentStyle = targetElement.getAttribute("style") || "";
  const separator = currentStyle && !currentStyle.endsWith(";") ? ";" : "";
  targetElement.setAttribute("style", `${currentStyle}${separator}background-color: ${grayColor} !important;`);

  // 6. Recursively process all child nodes
  const children = Array.from(targetElement.childNodes);
  for (const child of children) {
    stripToShim(child, depth + 1);
  }

  return targetElement;
}
