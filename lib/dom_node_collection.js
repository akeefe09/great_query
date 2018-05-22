class DOMNodeCollection {
  constructor(nodes) {
    this.nodes = nodes;
  }

  html(arg) {
    if (typeof arg === "string") {
      this.nodes.forEach(node => {
        node.innerHTML = arg;
      });
    } else {
      return this.nodes[0].innerHTML;
    }
  }

  empty() {
    this.nodes.forEach((node) => {
      node.innerHTML = '';
    });
  }

  append(children) {
    if (children instanceof DOMNodeCollection) {
      this.nodes.forEach(node => {
        children.nodes.forEach((childNode) => {
          node.appendChild(child.cloneNode(true));
        });
      });
    } else if (typeof children === "string") {
      this.nodes.forEach((node) => {
        node.innerHTML += children;
      });
    } else {
      return;
    }
  }

  children() {
    let childNodes = [];
    this.nodes.forEach((node) => {
      childNodes = childNodes.concat(Array.from(node.children));
    });
    return new DOMNodeCollection(childNodes);
  }

  removeClass(classArg) {
    this.nodes.forEach((node) => {
      node.classList.remove(classArg);
    });
  }

  addClass(classArg) {
    this.nodes.forEach((node) => {
      node.classList.add(classArg);
    });
  }

  toggleClass(classArg) {
    this.nodes.forEach((node) => {
      node.classList.toggle(classArg);
    });
  };

  attr(attribute, property) {
    if (!property) {
      return this.nodes[0].getAttribute(attribute);
    } else if(typeof property === "string") {
      return this.nodes[0].setAttribute(attribute, property);
    }
  }

}

module.exports = DOMNodeCollection;
